import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { useStore } from '../store/store.js'
import { useHomeContent } from '../store/homeContent.js'
import { useEffect, useState, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import Navbar from '../components/Navbar.jsx'
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { ORIGINAL_IMG_URL, MOVIE_CATEGORY, TV_CATEGORY, SMALL_IMG_URL} from '../utils/constant.js'

const PlayPage = () => {
    const {id} = useParams(); // get the id from the url
    const[trailer, setTrailer] = useState([]);
    const [currentTrailer, setCurrentTrailer] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [seasons, setSeasons] = useState(3); // default 3 seasons
    const [Loading, setLoading] = useState(true);
    const {content} = useHomeContent();
    const [media, setMedia] = useState([]);
    const [similar, setSimilar] = useState([]);  
    const [info, setInfo] = useState([]);
    const [Arrow, setArrow] = useState(false);  // for arrow navigation
    const [isFavorited, setIsFavorited] = useState(false); // state to track if the content is favorited
    const [removeFromFav, setRemoveFromFav] = useState(false); // state to track if the content is removed from favorites

    const seasonsSetRef = useRef(false); // Ref to track if seasons have been set
    useEffect(() => {
        if (!seasonsSetRef.current) {
            // set a random number of seasons when the component mounts or when the id changes
            let randomSeasons = Math.floor(Math.random() * 6) + 1; // random number between 1 and 5

            // for between 3 and 5 seasons
            if (randomSeasons < 3) {
                randomSeasons = 3;
            }

            setSeasons(randomSeasons);
            seasonsSetRef.current = true; // Mark seasons as set
        }
    }, [content, id]);
    

    const trailerDistributionRef = useRef([]);

    const distributeTrailers = (totalTrailers, seasons) => { 
      if(totalTrailers==0) return []; // return empty array if there are no trailers

      let distribution = Array(seasons).fill(1); // To ensure each season gets at least one trailer
      let remainingTrailers = totalTrailers - seasons;
  
      for (let i = 0; i < remainingTrailers; i++) {
          const randomSeason = Math.floor(Math.random() * seasons);
          distribution[randomSeason]++;
      }
  
      return distribution;
  };

  useEffect(() => {
    // Fetch user's favorites to check if the current content is favorited
    const fetchFavorites = async () => {
          try {
              const res = await axios.get('/api/favorite/getFav');
              const favorites = res.data.favorites;
              const isFav = favorites.filter((item) => item.contentId === id); 
              // console.log("isFav: ",isFav);
              if(isFav.length > 0) setIsFavorited(true);
              else setIsFavorited(false);
          } catch (error) {
              // console.error('Error fetching favorites:', error);
          }
      };

      fetchFavorites();
    }, [id, removeFromFav]);

    const handleRemoveFromFavorites = async () => {
      try {
          await axios.delete(`/api/favorite/delFav/${id}`);
          toast.success('Removed from favorites');
          setIsFavorited(false);
          setRemoveFromFav(true);
      } catch (error) {
          toast.error("Error removing from favorites:", error);
      }
  };


    const handleAddToFavorites = async () => {
      try {
          await axios.post('/api/favorite/addFav', { contentId: id, contentType: content });
          // console.log({ contentId: id, contentType: content });
          toast.success('Added to favorites');
          setIsFavorited(true);
      } catch (error) {
          toast.error("Error adding to favorites:", error);
      }
  };

    useEffect(() => {
        trailerDistributionRef.current = distributeTrailers(trailer.length, seasons);
    }, [trailer.length, seasons, content, id]);
    
    // const trailerDistribution = distributeTrailers(trailer.length, seasons);
 

    const handleSeasonChange = (event) => {
        setSelectedSeason(Number(event.target.value));
        setCurrentTrailer(0); // Reset to the first trailer of the selected season
      };

      
    
      const getFilteredTrailers = () => {
        let start = 0;
        for (let i = 0; i < selectedSeason - 1; i++) {
            start += trailerDistributionRef.current[i];
        }
        const end = start + trailerDistributionRef.current[selectedSeason - 1];
        return trailer.slice(start, end);
    };


    const filteredTrailers = getFilteredTrailers();
    // console.log('Selected Season:', selectedSeason);
    // console.log('Filtered Trailers:', filteredTrailers);
      
    // console.log(id)

    useEffect(() => {
        const getTrailer = async () => {
            try {
                const res = await axios.get(`/api/${content}/${id}/trailer`);
                setTrailer(res.data.trailer);
                // console.log("trailer:",res.data.trailer);
                setLoading(false);
            } catch (error) {
              setLoading(false);
                // console.log(error);
                setTrailer([]);
            }
        }
        getTrailer()
    }
    , [content, id])

    useEffect(() => {   
        const getSimilar = async () => {
            try {
                const res = await axios.get(`/api/${content}/${id}/similar`);
                setSimilar(res.data.similar);
                // console.log("similar:",res.data.similar);
                setLoading(false);
            } catch (error) {
                // console.log(error);
                setLoading(false);
                setSimilar([]);
            }
        }
        getSimilar()
    }
    , [content, id])

    useEffect(() => {   
        const getInfo = async () => {
            try {
                const res = await axios.get(`/api/${content}/${id}/info`);
                setInfo(res.data.info);
                // console.log("info:",res.data.info);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                // console.log(error);
                setInfo([]);
            }
        }
        getInfo()
    }
    , [content, id])

    const formattedReleaseDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatRuntime = (minutes) => {
        if (!minutes) return '';
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs}hr ${mins}min`;
    }

    const scrollRef = useRef(null);

    // const LeftScroll = () => {
    //   if (scrollRef.current) {
    //     scrollRef.current.scrollTo({
    //       left: scrollRef.current.scrollLeft - 1000,
    //       behavior: 'smooth'
    //     });
    //   }
    // }
    
    // const RightScroll = () => {
    //   if (scrollRef.current) {
    //     scrollRef.current.scrollTo({
    //       left: scrollRef.current.scrollLeft + 1000,
    //       behavior: 'smooth'
    //     });
    //   }
    // }

    const LeftScroll = () => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollLeft === 0) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        } else {
          scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: "smooth" });
        }
      }
    };
  
    const RightScroll = () => {
      if (scrollRef.current) {
          const buffer = 5; // Small buffer to account for rounding issues
        if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 1) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: "smooth" });
        }
      }
    };

    
  if(Loading) return (
    // <div className='h-screen text-white relative'>
    //   < Navbar />
    //   <div className='absolute flex items-center justify-center shimmer top-0 left-0 w-full h-full bg-black/60   -z-10 ' /> {/* popular shimmer effect */}
    // </div>
    <div className='animate-pulse bg-black '>
          <Navbar />
			<div className='bg-gray-700 rounded-md w-40 h-6 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-full h-96 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-3/4 h-6 mb-2 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-1/2 h-6 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-full h-24 shimmer'></div>
		</div>
  )


  if(!info.title){ 
    if(Loading) return (    // only show after loading done
    <div className='h-screen text-white bg-black relative'>
      < Navbar />
      <div className='text-9xl font-bold text-red-600 mt-52 text-center '>
         CONTENT NOT FOUND 🤡
      </div> {/* popular shimmer effect */}
    </div>
    )
  }

  return (
    <>
        <div className='min-h-screen bg-black text-white'>
            <div className='mx-auto px-4 py-8 h-full max-h-full'>
                <Navbar />

                {trailer?.length == 0 && !Loading &&  filteredTrailers?.length == 0 && (   // only show after loading done
                  <div className='flex justify-center items-center h-96 '>
                    <h1 className='text-6xl text-red-500  shimmer p-10'>No trailers available for {" "}
                      <span className='font-bold'>{info?.title || info?.name}</span> {" :("} </h1>
                </div>)}
              
                <div className={`aspect-video p-2 sm:px-10 md:px-32 ${trailer.length === 0 ? 'hidden' : ''}` }>
                  
                    {trailer?.length > 0 && (
                        // Using ReactPlayer to play the video by taking the id from the video array
                        // console.log("trailer id:",trailer[currentTrailer].key),
                        <ReactPlayer url={`https:www.youtube.com/watch?v=${filteredTrailers[currentTrailer]?.key}`} controls width='100%' height='80%' className="overflow-hidden mx-auto rounded-md"/>
                        
                    )}
                    
                </div>

                {/* Display the info of the media */}
                <div className="flex flex-col items-center ml-0 md:ml-8 text-white justify-center gap-20 max-w-6xl mx-auto md:flex-row">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-5xl font-bold text-balance">{info?.title || info?.name}</h1> 
                    <p className="text-lg mb-10 mt-2">
                      {formattedReleaseDate(info?.release_date || info?.first_air_date)} | {info?.adult ? (<span className='text-red-400 font-semibold text-xl'>18+</span>) : (<span className='text-green-300 font-semibold text-xl'>PG-13</span>)}{" "} | {formatRuntime(info?.runtime)} | {info?.genres?.map(genre => genre.name).join(' & ')} | {<span className='mt-4 p-2  text-red-600 font-bold text-center text-2xl bg-slate-700/40 rounded-full'>Rating: {info?.vote_average} / 10</span>}
                    </p>
                    <p className="text-lg mb-10">{info?.overview}</p>
                  </div>
                  <img src={ORIGINAL_IMG_URL + info.poster_path} className="max-h-[420px] rounded-md md:ml-10" alt="img" />
                  {isFavorited ? (
                    <button onClick={handleRemoveFromFavorites} className='flex flex-col gap-2 items-center text-white py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md active:bg-red-950'>
                        <FaTrashAlt className='size-12  items-center' /> <span className='font-bold'>Remove from Favorites</span>
                    </button>
                  ) : (
                    <button onClick={handleAddToFavorites} className='flex flex-col gap-2 items-center text-white py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md active:bg-red-950'>
                        <FaHeart className='size-12 items-center' /> <span className='font-bold'>Add to Favorites</span>
                    </button>
                  )}
                </div>

                {/* Display the input for the Seasons of the content */}
                <div className='mt-4 ml-8'>
                  <label htmlFor="season-select" className='font-semibold text-xl mb-3'>
                    Select Season:
                  </label>
                  <select
                    id="season-select"
                    value={selectedSeason}
                    onChange={handleSeasonChange}
                    className='ml-2 p-2 border rounded-md bg-black'
                  >
                    {Array.from({ length: seasons }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        Season {index + 1}
                      </option>
                    ))}
                  </select>
              </div>



        {/* Display the trailers as a season-wise fashion*/}
      {filteredTrailers?.length > 0 && (
        <div className='flex flex-col md:flex-row ml-4 items-center mb-4 mt-4 w-full mx-auto'>
          <div className='flex flex-col md:flex-row  justify-center space-x-2 space-y-2 mb-4'>
            {filteredTrailers.map((_, index) => (
              <button
                key={index}
                className={`text-white py-2 px-4 bg-slate-600/60 hover:bg-slate-700/70 rounded-md active:bg-slate-900/90 ${currentTrailer === index ? 'bg-slate-900 text-xl' : ''}`}
                onClick={() => {
                    window.scrollTo(0, 0);
                  setCurrentTrailer(index)
                }}
              >
                Trailer {selectedSeason} - {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Display the similar content */}

          {similar?.length > 0 && (
            <div className='relative mt-12 max-w-6xl mx-auto flex flex-col' onMouseEnter={()=> setArrow(true)} onMouseLeave={()=> setArrow(false)}>
              <h2 className='text-5xl font-bold mb-4'>
                Similar {content === 'movie' ? 'Movies' : 'TV Shows'}
              </h2>

              <div className='flex gap-4 overflow-x-scroll no-scrollbar ' ref={scrollRef}> 
            {similar.map((similar, index) => {
              if (!similar.poster_path) return null; // return null if the media doesn't have a poster

              return (
                <Link to={`/watch/${similar.id}`} className='min-w-[260px] group relative' key={index} >
                    <div className="overflow-hidden rounded-md transition-transform duration-300 ease-in-out group-hover:scale-125 ">
                      <img src={SMALL_IMG_URL + similar.poster_path} alt="content image"   className='' />  {/* used poster here cuz some dont have small image AND POSTER JUST LOOKS BETTER*/}
                    </div>
                    <p className='mt-12 mb-4 font-semibold text-xl text-center'>{similar.title || similar.name}</p>
                </Link>
              )})}
            </div> 


            {Arrow && (
           <>
            <button className='flex items-center justify-center p-2 md:left-4 rounded-md bg-slate-900/20 absolute top-1/2 -translate-y-1/6 text-white z-10 hover:bg-slate-900/80 transition-all duration-200 ease-in-out active:bg-slate-950' onClick={()=>LeftScroll()}>
              <FaAnglesLeft  className='size-14' />
            </button>
            <button className='flex items-center justify-center p-2 md:right-4  rounded-md bg-slate-900/20 absolute top-1/2 -translate-y-1/6 text-white z-10 hover:bg-slate-900/60 transition-all duration-200 ease-in-out active:bg-slate-950' onClick={()=>RightScroll()}>
              <FaAnglesRight  className='size-14' />
            </button>
           </>
          )}

            </div>
          )}
      </div>
    </div>
    </>
  )
}

export default PlayPage