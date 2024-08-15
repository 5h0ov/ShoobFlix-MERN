import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (        // taken from offical netflix 404 page
		<div
			className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white '
			style={{ backgroundImage: `url('/404.png')` }}
		>
			<header className='absolute top-0 left-0 p-4 bg-black w-full '>
				<Link to={"/"}>
					<img src='/logo.png' alt='Netflix' className='h-8' />
				</Link>
			</header>
			<main className='text-center error-page--content z-10'>
				<h1 className='text-6xl font-semibold mb-8'>Lost your way?</h1>
				<p className='mb-12 text-xl'>
					Sorry, we can't find that page. 
                    You'll find lots to explore on the home page.
				</p>
				<Link to={"/"} className='bg-white text-black text-lg py-4 px-4 rounded hover:opacity-80 active:bg-slate-300 font-semibold'>
					Back To Home
				</Link>

			</main>
                            
            <span className='border-l-2 border-red-600 text-2.4em font-thin tracking-wide leading-9 py-0 px-[1vw] mt-6 z-20 text-2xl'>
                Error Code <span className='font-bold'>404</span>
            </span>
		</div>
	);
}

export default Page404