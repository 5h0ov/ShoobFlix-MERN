import {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";

const Landing = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    // console.log(email);
    navigate('/signup?email=' + email);
  }

  return (
    <div className="main-bg relative">  
      <nav className='max-w-6xl mx-auto p-4 items-center justify-between flex'>
        <img src="/logo.png" alt="logo" className="w-32 md:w-48" />
              <Link to={"/login"} className='text-white text-xl font-medium bg-red-600 px-2 py-2 rounded hover:bg-red-700 active:bg-red-900'>
                Log in
              </Link>
      </nav>

      <div className="flex flex-col items-center justify-center text-center text-white max-w-6xl mx-auto py-44">
        <h1 className='text-4xl font-bold md:text-6xl mb-5'>Unlimited Movies, TV Shows, And More</h1>
        <h2 className='text-2xl md:text-4xl font-semibold mb-5'>Watch anywhere. Cancel anytime.</h2>
        <p className='text-lg md:text-2xl mb-5'>Ready to watch? Enter your email to create or restart your membership.</p>

        <form onSubmit={handleAuth} className="flex flex-col md:flex-row gap-4 w-1/2 justify-center">
          <input type="email" className='flex bg-black/50 px-8 py-4 rounded-l-md' placeholder='Email address' value= {email} onChange={(e)=> setEmail(e.target.value)}/>
          <button className='bg-red-600 text-xl items-center px-4 py-2 rounded flex justify-center font-medium hover:bg-red-700 active:bg-red-900'>Get Started <FaChevronRight className='size-7' /> </button>
        </form>
      </div>

       <div className="h-2 w-full bg-zinc-800"></div>   {/* Separator Component */}

      <div className="bg-black text-white  py-10">
        <div className="flex mx-auto items-center justify-center max-w-6xl md:flex-row flex-col px-3 md:px-2">
          {/* Left */}  {/* flex-1 means giving flex 50% to each of left and right */}
          <div className="left flex-1 text-center md:text-left">
            <h1 className='text-3xl font-bold md:text-5xl mb-5'>Enjoy on your TV.</h1>
            <h2 className='text-xl md:text-2xl mb-5'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
          </div>     

          {/* Right */}
          <div className="right flex-1 relative">
            <img src="/tv.png" alt="tv" className="mt-10 relative z-10 " />
            <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-0' playsInline autoPlay muted loop >
              <source src='/tv-vid.m4v' type='video/mp4' />
            </video>

          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-zinc-800"></div>   {/* Separator Component */}

      <div className="bg-black text-white  py-10">
          <div div className="flex md:flex-row flex-col-reverse mx-auto items-center justify-center max-w-6xl  px-3 md:px-2">
            {/* Left */} 
            <div className="left1 flex-1 relative">
              <div className='relative'>
                < img src="/stranger-things-lg.png" alt="mobile-img1" className="mt-5" />

                <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2  bg-black bottom-6 border border-slate-500 rounded-md py-3 px-3 h-24 w-3/4 lg:w-1/2">
                < img src="/stranger-things-sm.png" alt="mobile-img1" className="h-full" />
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex flex-col'>
                      <div className='text-md text-base font-bold'>Stranger Things</div>
                      <div className='text-base text-blue-500'>Downloading...</div>
                    </div>
      
                    <img src="/download-icon.gif" alt="" className='h-12' />
                  </div>
                </div>
              </div>
            </div>
            
          {/* Right */}
            <div className="right1 flex-1 md:text-left text-center">
              <h1 className='text-3xl font-bold md:text-5xl mb-5'>Download your shows to watch offline.</h1>
              <h2 className='text-xl md:text-2xl mb-5'>Save your favorites easily and always have something to watch.</h2>
              
            </div>
          </div>
      </div>

      <div className="h-2 w-full bg-zinc-800"></div>   {/* Separator Component */}

      <div className="bg-black text-white  py-10">
        <div className="flex mx-auto items-center justify-center max-w-6xl md:flex-row flex-col px-3 md:px-2">
          {/* Left */}  {/* flex-1 means giving flex 50% to each of left and right */}
          <div className="left flex-1 text-center md:text-left">
            <h1 className='text-3xl font-bold md:text-5xl mb-5'>Watch everywhere</h1>
            <h2 className='text-xl md:text-2xl mb-5'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h2>
          </div>     

          {/* Right */}
          <div className="right flex-1 relative">
            <img src="/device-pile-in.png" alt="tv" className="mt-4 relative z-10 " />
            <video className='absolute top-1/3 left-1/2 px-2   -translate-x-1/2 -translate-y-1/2 h-2/3 w-2/3 z-0' playsInline autoPlay muted loop>
              <source src='/video-devices-in.m4v' type='video/mp4'/>
            </video>

          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-zinc-800"></div>   {/* Separator Component */}

      <div className="bg-black text-white  py-10">
          <div div className="flex md:flex-row flex-col-reverse mx-auto items-center justify-center max-w-6xl  px-3 md:px-2">
            {/* Left */} 
            <div className="left1 flex-1 relative">
              <div className='relative'>
                < img src="/kids.png" alt="mobile-img1" className="mt-5" />

              </div>
            </div>
            
          {/* Right */}
            <div className="right1 flex-1 md:text-left text-center">
              <h1 className='text-3xl font-bold md:text-5xl mb-5'>Create profiles for kids</h1>
              <h2 className='text-xl md:text-2xl mb-5'>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</h2>
              
            </div>
          </div>
      </div>

      <div className="h-2 w-full bg-zinc-800"></div>   {/* Separator Component */}

    </div>
  )
}

export default Landing;