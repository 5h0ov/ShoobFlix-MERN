import React from 'react'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import { useHomeContent } from '../store/homeContent.js'
import { Link } from 'react-router-dom';
import { SMALL_IMG_URL } from '../utils/constant.js';
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const Carousel = ({category}) => {
  const {content} = useHomeContent();
  // // console.log(category);
  const [media, setMedia] = useState([]);
  const [Arrow, setArrow] = useState(false);  // for arrow navigation and default false and only activate when hovering over the carousel
  const scrollRef = useRef(null);

  const formattedCategories = category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
  const displayedContent = content === 'movie' ? 'Movies' : 'TV Shows';

  useEffect(() => {
    const getMedia = async () => {
      try {
        const res = await axios.get(`/api/${content}/${category}`);
        setMedia(res.data.category);
        // // console.log(res.data.category);
      } catch (error) {
        // console.log(error);
      }
    }
    getMedia()
  
  }, [content, category])



  // const LeftScroll = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTo({
  //       left: scrollRef.current.scrollLeft - 1000,
  //       behavior: 'smooth'
  //     });
  //   }
  // }
  // // console.log(scrollRef.current.clientWidth);
  
  // const RightScroll = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTo({
  //       left: scrollRef.current.scrollLeft + 1000,
  //       behavior: 'smooth'
  //     });
  //   }
  // }

  // const LeftScroll = () => {
	// 	if (scrollRef.current) {
	// 		scrollRef.current.scrollBy({left:-scrollRef.current.offsetWidth, behavior:"smooth"});
	// 	}
	// };
	// const RightScroll = () => {
	// 	scrollRef.current.scrollBy({left:scrollRef.current.offsetWidth, behavior:"smooth"});
	// };

  const LeftScroll = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft === 0) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        scrollRef.current.scrollBy({ left: scrollRef.current.scrollWidth - scrollRef.current.clientWidth, behavior: "smooth" });
        // scrollRef.current.scrollTo({
        //   left: scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
        //   behavior: 'smooth'    // for smoothly going to the right end
        // });
      } else {
        scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: "smooth" });
      }
    }
  };

  const RightScroll = () => {
    if (scrollRef.current) {
        const temp = 10; // temp variable for rounding issues
      if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - temp) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: "smooth" });
      }
    }
  };
  
  return (
    <div className='bg-black relative text-white px-5 md:px-22' onMouseEnter={()=> setArrow(true)} onMouseLeave={()=> setArrow(false)} >
        <h1 className='text-3xl mb-4 font-bold'>
          {formattedCategories} {displayedContent}
        </h1>

        {/* MAIN Carousel */}
        <div className='flex gap-4 overflow-x-scroll no-scrollbar' ref={scrollRef}> 
          {media.map((item, index) => (
            <Link to={`/watch/${item.id}`} className='min-w-[260px] group relative' key={index} >
                <div className="overflow-hidden rounded-md transition-transform duration-300 ease-in-out group-hover:scale-125 ">
                  <img src={SMALL_IMG_URL + item.backdrop_path} alt="media image" className='' />
                </div>
                <p className='mt-3 mb-4 font-semibold text-xl text-center'>{item.title || item.name}</p>
            </Link>

          ))}
        </div>  

        {Arrow && (
           <>
            <button className='flex items-center justify-center left-6 md:left-4 size-12 rounded-full bg-slate-900/20 absolute top-1/3 -translate-y-1/6 text-white z-10 hover:bg-slate-900/80 transition-all duration-200 ease-in-out active:bg-slate-950' onClick={()=>LeftScroll()}>
              <FaAnglesLeft  className='size-5' />
            </button>
            <button className='flex items-center justify-center right-6 md:right-4 size-12 rounded-full bg-slate-900/20 absolute top-1/3 -translate-y-1/6 text-white z-10 hover:bg-slate-900/60 transition-all duration-200 ease-in-out active:bg-slate-950' onClick={()=>RightScroll()}>
              <FaAnglesRight  className='size-5' />
            </button>
           </>
          )}
    </div>
  )
};

export default Carousel