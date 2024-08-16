import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {useState, useEffect, useRef} from 'react'
import { FaSearch } from "react-icons/fa";
import { useStore } from '../store/store.js';
import { useHomeContent } from '../store/homeContent.js';
import { LuLogOut } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { SMALL_IMG_URL } from '../utils/constant.js';
import { RxAvatar } from "react-icons/rx";
import { Tooltip } from 'react-tooltip'

const Navbar = ({ onSearch }) => {
    const [isHamburgerOpen, setisHamburgerOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const {user, logout} = useStore();
    const {content, setContent} = useHomeContent();
    const [query, setQuery] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggle = () => setisHamburgerOpen(!isHamburgerOpen);
    // console.log(content);

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setQuery(query);

        if (query.length > 2) {
            try {
                const res = await fetch(`/api/search/${content}/${query}`);
                const data = await res.json();
                setSearchResults(data.info.results);
            } catch (error) {
                // console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setSearchResults([]);
    };

    const handleSearch = async (query) => {
    // console.log(query);
    if (query.length > 2) {
        try {
        const res = await fetch(`/api/search/${content}/${query}`);
        // const res = await fetch(`/api/search/combined/${query}`);
        const data = await res.json(); // Parse the JSON response
        // console.log(data.info.results);
        setSearchResults(data.info.results);
        } catch (error) {
        // console.error("Error fetching search results:", error);
        }
    } else {
        setSearchResults([]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    
    const handleInputFocus = () => {
        if (query.length > 1 && searchResults.length > 0) {
            dropdownRef.current.style.display = 'block';
        }
    };

    // console.log(searchResults);

    const handleSearchClick = () => {
        navigate(`/search?query=${query}`);
    };

    const getLinkClass = (path) => {
        return window.location.pathname === path ? 'text-red-600 font-bold' : 'text-white hover:font-semibold ';
    }


  return (
    
    <nav className="flex flex-wrap mb-40 md:mb-20  justify-between items-center max-w-6xl mx-auto h-24  relative p-4">
        
        <div className="flex  items-center gap-10 mt-2 z-20">
            <Link to='/'>
            <a className='home'>
                <Tooltip anchorSelect=".home" place="bottom" content='Home' />
                <img src="/logo.png" alt="logo" className="rounded-full hover:scale-110 transition-all duration-200 ease-in-out w-32 sm:w-44" />
            </a>
            </Link>

             {/* for desktop */}
             <div className="hidden sm:flex gap-2 text-lg items-center " style={{ display: 'none !important' }}>  {/* hidden sm:flex was not working because of dark mode extension so have to enforce the hidden style using !important*/} 
             <Link to='/' className={`flex hover:underline transition-all duration-100 ease-in ${content === 'movie' && window.location.pathname === '/' ? `text-red-600 font-bold` : 'hover:font-semibold '}`} onClick={() => setContent("movie")}>
                Movies
            </Link>
            <Link to='/' className={`flex hover:underline transition-all duration-100 ease-in ${content === 'tv' && window.location.pathname === '/' ? `text-red-600 font-bold` : 'hover:font-semibold '}`} onClick={() => setContent("tv")}>
                TV Shows
            </Link>
            <Link to="/favourite" className={`flex hover:underline p-3 transition duration-100 ease-in ${getLinkClass('/favourite')}`} onClick={toggle}>
                Favourites
            </Link>
             </div>
        </div>
           
        <div className=' flex items-center  gap-2 z-20 '>
           
  <div className="relative flex items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className="bg-gray-800 hover:bg-gray-800/40 active:bg-gray-800/70 text-white p-2 rounded sm:w-64 w-full"
                        placeholder="Search..."
                    />
                    <Link to={`/search?query=${query}`}  className="absolute right-2 text-gray-400">
                    <a className='search'>
                        <Tooltip anchorSelect=".search" place="bottom" content='Search Results' />
                        <FaSearch />
                    </a>
                    </Link>
                </div>
        <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0">
                <a className='update-user'>
                    <Tooltip anchorSelect=".update-user" place="bottom" content='Update User' />
                    {user.avatar ? <img src={user.avatar} alt="avatar" className="h-8 flex rounded cursor-pointer hover:scale-125 transition-all duration-200 ease-in-out " onClick={() => navigate('/editUser')} /> : <RxAvatar className='flex size-10 mb-3 sm:mb-0 rounded cursor-pointer hover:scale-125 transition-all duration-200 ease-in-out ' onClick={() => navigate('/editUser')} /> }
                </a>
                <a className="log-out" >
                <Tooltip anchorSelect=".log-out" place="bottom" content='Log Out' />
                    <span className="text-white hover:underline hover:scale-125 transition duration-200 ease-in-out text-xl cursor-pointer ml-4 sm:ml-0" onClick={logout}>
                        <LuLogOut className='size-8 sm:ml-3' />
                    </span>
                </a>
                <div className="sm:hidden flex-col md:flex-row mt-4 sm:mt-0">
                    <GiHamburgerMenu className="text-white text-4xl cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out active:scale-125" onClick={toggle} />
                </div>
            </div>

        </div>
        {searchResults.length > 0 && (
    <div
        ref={dropdownRef}
        className="absolute top-24 left-0 w-full bg-black/90 rounded-md  text-white p-4 flex flex-col gap-4 z-20"
        style={{ maxHeight: '400px', overflowY: 'auto' }} // Add these styles
    >
        {searchResults.map((result, index) => (
            <Link to={`/watch/${result.id}`} key={result.id} onClick={clearSearch} className="hover:underline flex items-center gap-4 p-2">
                <img src={`${SMALL_IMG_URL}${result.poster_path}`} alt={result.title || result.name} className="w-12 h-18 object-cover" />
                <div>
                    <h3 className="text-white font-bold">{result.title || result.name}</h3>
                    <p className="text-gray-400 text-sm">
                        {result.release_date?.split('-')[0] || result.first_air_date?.split('-')[0]} | 
                        {result.adult ? "18+" : "PG-13"} | 
                        {result.runtime ? `${result.runtime} min` : ''} | 
                        {content === 'movie' ? 'Movie' : 'TV Show'}
                    </p>
                </div>
            </Link>
                ))}
            </div>
        )}
        {/* Hamburger Design */}
        {isHamburgerOpen && (
            <div className="sm:hidden  items-center gap-2 bg-black border  border-slate-800  top-16 right-0 w-36 rounded-lg shadow-md py-3 z-20" style={{ display: 'block !important' }}>
                <Link to={'/'} className=' hover:underline active:font-semibold p-3 transition duration-200 ease-in'
                onClick={toggle}>
                    Movies
                </Link>
                <Link to={'/'} className='  hover:underline active:font-semibold p-3 transition duration-200 ease-in'
                onClick={toggle}>
                    TV Shows
                </Link>
                <Link to={'/favourite'} className=' hover:underline active:font-semibold p-3 transition duration-200 ease-in'
                onClick={toggle}>
                    Favourites
                </Link>
                

            </div>
        )}
    </nav>
  )
}

export default Navbar