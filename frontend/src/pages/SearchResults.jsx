import { useState, useEffect } from "react";
import { useHomeContent } from "../store/homeContent.js";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar.jsx";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { ORIGINAL_IMG_URL } from "../utils/constant.js";
import { Link, useLocation } from "react-router-dom";


const SearchResults = () => {
    const windowUrl = window.location.search;  // gets the query string from the url
    const searchParams = new URLSearchParams(windowUrl); 
    const initialQuery = searchParams.get("query"); 

    const [currentContent, setCurrentContent] = useState("movie");
    const [searchValue, setSearchValue] = useState(initialQuery); // initializing the search value with the query string
    const [searchResults, setSearchResults] = useState([]);
    const { content, setContent } = useHomeContent();
    const [LoadingImg, setLoadingImg] = useState(true);

    const handleTabClick = (tab) => {
        setCurrentContent(tab);
        tab === "movie" ? setContent("movie") : setContent("tv");
        setSearchResults([]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoadingImg(true);
        try {
            const res = await fetch(`/api/search/${content}/${searchValue}`);
            const data = await res.json(); // Parse the JSON response
            setSearchResults(data.info.results);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Nothing found");
            } else {
                toast.error("An error occurred");
            }

        }
        setLoadingImg(false);
    };

    useEffect(() => {
        if (initialQuery) {
            handleSearch({ preventDefault: () => {} });  // calling the handleSearch function with an empty object to prevent the default behavior  
        }
    }, [initialQuery]);

    return (
        <div className='bg-black min-h-screen text-white'>
            <Navbar />
            {LoadingImg && (
              <div className='absolute flex items-center justify-center shimmer top-0 left-0 w-full h-full bg-black/60 -z-10' />
            )}
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center gap-3 mb-4'>
                    <button
                        className={`py-2 px-4 rounded ${
                            content === "movie" ? "bg-red-600" : "bg-slate-900"
                        } hover:bg-red-700/80 active:bg-red-900`}
                        onClick={() => handleTabClick("movie")}
                    >
                        Movies
                    </button>
                    <button
                        className={`py-2 px-4 rounded ${
                            content === "tv" ? "bg-red-600" : "bg-slate-900"
                        } hover:bg-red-700/80 active:bg-red-900`}
                        onClick={() => handleTabClick("tv")}
                    >
                        TV Shows
                    </button>
                </div>

                <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
                    
                    <input
                        type='text'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={"Search for a " + content}
                        className='w-full p-2 rounded bg-slate-900/70 text-white'
                    />
                    <button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
                        <FaSearch className='size-6' />
                    </button>
                </form>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {searchResults.map((result) => {
                        if (!result.poster_path) return null;

                        return (
                            <div key={result.id} className='bg-slate-900/40 p-4 rounded-md transform transition-all duration-300 hover:scale-105 hover:bg-slate-950/80'>
                                <Link
                                    to={`/watch/${result?.id}`}
                                    onClick={() => {
                                        setContent(currentContent);
                                    }}
                                >
                                    <img
                                        src={ORIGINAL_IMG_URL + result.poster_path}
                                        alt={result.title || result.name}
                                        className='w-full h-auto rounded-md' 
                                    />
                                    <h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;