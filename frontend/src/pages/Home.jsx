import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import  getTrending  from '../utils/getTrending.jsx'
// import {useStore} from '../store/store.js'
import {useHomeContent } from '../store/homeContent.js'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { FaPlay } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { MOVIE_CATEGORY, TV_CATEGORY, ORIGINAL_IMG_URL, SMALL_IMG_URL } from '../utils/constant.js';
import Carousel from '../components/Carousel.jsx'


const Home = () => {
  const {trending, detailsTrending} = getTrending();
  const {content} = useHomeContent();
  const [LoadingImg, setLoadingImg] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  // const {logout} = useStore();
  // // console.log(trending)
  const formatRuntime = (minutes) => {
    if (!minutes) return '';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    // // console.log(hrs, mins)
    return `${hrs}hr ${mins}min`;
  };


  // if(!trending) return (
  //   <div className="flex justify-center items-center bg-black h-screen">
  //    <h1 className="text-4xl text-red-600">Loading<span className="loading-dots"></span>
  //    </h1>  {/* put a better Loading spinner later!!!*/}
  //  </div>
  // )

  if (!trending)
		return (
			<div className='h-screen text-white relative'>
				<Navbar  />
				<div className='absolute flex items-center justify-center shimmer top-0 left-0 w-full h-full bg-black/60   -z-10 ' /> {/* popular shimmer effect */}
			</div>
		);

  return (
    
    <>
    <div className="h-screen text-white relative">
       <Navbar  />
          {LoadingImg && (
              <div className='absolute flex items-center justify-center shimmer top-0 left-0 w-full h-full bg-black/60 -z-10' />
          )}
          
          <img src={ORIGINAL_IMG_URL + trending?.backdrop_path} alt="trending image"  className='absolute mt-10 md:mt-0 top-0 right-0  h-full w-full object-cover -z-20' 
          onLoad={()=>{setLoadingImg(false)}}/>

          <div className='absolute top-0 right-0 bg-black/60  h-full w-full -z-20 hover:bg-black/20 transition-all duration-200 ease-in-out' />
          {/* <div className="absolute top-0 right-0 bg-gradient-to-r from-black via-black to-transparent  h-full w-full -z-20" /> */}

          <div className="absolute flex flex-col justify-center top-0 left-0 h-full w-full px-7 md:px-14 lg:px-28">
            <div className="absolute top-0 right-0 bg-gradient-to-b from-black/85 via-transparent to-transparent  h-full w-full -z-10" />

            <div className='max-w-3xl mt-20 md:mt-10'>
              <h1 className='font-bold text-6xl text-balance mt-4 top-3 '>
                {trending?.title || trending?.name || trending?.original_name} {/* if trending.title is undefined, then check for trending.name and if thats also undefined we check for original name(even though it will be pretty rare)*/}
              </h1>
              <p className='mt-3'>
              {trending?.release_date?.split('-')[0]  ||  trending?.first_air_date?.split('-')[0]} | {trending?.adult ? (<span className='text-red-400 font-semibold text-xl'>18+</span>) : (<span className='text-green-300 font-semibold text-xl'>PG-13</span>)} | {formatRuntime(detailsTrending?.runtime)} | {detailsTrending?.genres.map(genre => genre.name).join(' & ')} {detailsTrending?.isNumberOne ? '| #1 in the U.S. Today' : ''} | <span className='text-xl font-bold text-red-500 bg-slate-700/50 rounded-full p-2 hover:bg-slate-900/90'>Rating: {detailsTrending?.vote_average}/10 </span>
                
              </p>
              <p className='mt-4 text-lg'>
                {isExpanded || trending?.overview.length <= 200 ? 
                  trending?.overview + "  " 
                  : trending?.overview.slice(0, 200) + '...  '
                }
                {trending?.overview.length > 200 && (  // if the overview is more than 200 characters, then show the show more button
                  <span onClick={toggleExpand} className='text-white font-semibold cursor-pointer hover:underline'>
                    {isExpanded ? 'Show less' : 'Show more'}
                  </span>
                )}
            </p>
            </div>

            <div className='flex gap-2 mt-8'>
              <Link to={`/watch/${trending?.id}`} className='bg-white hover:bg-slate-300 transition duration-300 active:bg-slate-400 px-4 py-2  items-center rounded-md text-xl text-black font-bold'>
                <FaPlay className='inline-block mr-2 fill-black size-6 ' /> 
                Play
              </Link>

              <Link to={`/watch/${trending?.id}`} className='bg-neutral-600/80  hover:bg-neutral-700/90 active:bg-neutral-800/90 transition duration-300 px-4 py-2  items-center rounded-md text-slate-300'>
                <MdInfoOutline className='inline-block mr-2 fill-slate-300 size-6 ' />
                 More Info
              </Link>
            </div>
            
          </div>

       </div>
       
       <div className='flex flex-col py-12 gap-8 bg-black'>
            {content === 'movie' ? (
              MOVIE_CATEGORY.map((category, index) => <Carousel key={category} category={category} />)
            ):(
              TV_CATEGORY.map((category, index) => <Carousel key={category} category={category} />)
            )}
       </div>

    </>
  )
}

export default Home
