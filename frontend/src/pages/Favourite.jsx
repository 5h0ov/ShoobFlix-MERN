import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ORIGINAL_IMG_URL } from "../utils/constant.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { Tooltip } from 'react-tooltip'

const Favourite = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshCount, setRefreshCount] = useState(0); // State to track refresh count


    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/favorite/getFav');
                const favorites = res.data.favorites;
                // console.log(favorites);
                // Fetch details for each favorite item
                const detailedFavorites = await Promise.all(
                    favorites.map(async (item) => {
                        const res = await axios.get(`/api/${item.contentType}/${item.contentId}/info`);
                        // merge contentType with the response data
                        res.data.info.contentType = item.contentType;
                        // console.log("res.data: ",res.data.info);
                        
                        return res.data.info;
                    })
                );

                setResults(detailedFavorites);
                setLoading(false);
                // console.log("detailedFavorites: ",detailedFavorites);

                // console.log("results: ",results);
            } catch (error) {
                setLoading(false);
                // console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, [refreshCount]);

    const handleRefresh = () => {
        setLoading(true);
        setRefreshCount(prevCount => prevCount + 1); // Increment refresh count
    };

    return (
        <>
            <div className='bg-black min-h-screen text-white'>
                <Navbar />

                <div className='max-w-full  mx-auto '>
                <div className="flex flex-col md:flex-row items-center ml-12 mb-8">
                    <h1 className="font-bold text-4xl sm:text-5xl ">Your Favourites</h1>

                    <a className="refresh">
                        <Tooltip anchorSelect=".refresh" place="bottom" content='Refresh The List' />
                        <button className="flex py-2  md:ml-24 mt-5 sm:mt-0 px-4 rounded bg-red-600 hover:bg-red-700/80 active:bg-red-900 font-bold text-lg" 
                        onClick={handleRefresh}><IoMdRefresh className="size-6 mr-2" />{loading ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </a>

                </div>  
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                        
                    {loading && (
                        <div className='absolute flex items-center justify-center shimmer top-0 left-0 w-full h-full bg-black/60 -z-10' />
                    )}
                    {results.map((item, index) => (
                        
                            <Link to={`/watch/${item.id}`} key={index} className='group relative transform transition-all duration-300 hover:scale-105 hover:bg-slate-950/80 mb-20'>
                                <div className='bg-slate-900/40 p-4 rounded-md '>
                                    <img src={`${ORIGINAL_IMG_URL}${item.poster_path}`} alt="image" />
                                </div>  
                                <p className='mt-3 font-semibold text-3xl text-center'>{item.title || item.name}</p>
                                <p className='text-center'>{item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}</p>
                                <p className='text-center'>{item.adult ? '18+' : 'PG-13'}</p>
                                <p className='text-center'>{item.runtime ? `${item.runtime} min` : ''}</p>
                                <p className='text-center'>{item.genres.map(genre => genre.name).join(' & ')}</p>
                                {(item.contentType === 'tv') && <p className='text-center'>{item.number_of_seasons} Seasons</p>}
                                <p className='text-center text-lg text-red-500 font-bold'>{item.vote_average} / 10</p>
                                <button className='absolute top-2 right-2 transform transition-all duration-300 hover:scale-125 text-red-600' onClick={async (e) => {
                                    e.preventDefault(); // prevent the default action (navigating to watch page)
                                    try {
                                        await axios.delete(`/api/favorite/delFav/${item.id}`);
                                        toast.success('Removed from favorites');
                                        setResults(results.filter((result) => result.id !== item.id));
                                        
                                    } catch (error) {
                                        // console.error('Error removing from favorites:', error);
                                        toast.error('Error removing from favorites');
                                    }
                                }}>
                                    <FaTrashAlt className="size-12 bg-black p-2 rounded-full" />
                                </button>
                            </Link>
                        ))}
                    </div>  
                </div>
            </div>
        </>
    );
};

export default Favourite;