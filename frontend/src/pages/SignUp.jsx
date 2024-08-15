import {useState, useEffect, React } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/store.js'

const SignUp = () => {
  const windowUrl = window.location.search;  // gets the query string from the url
  const searchParams = new URLSearchParams(windowUrl);  // creates a new URLSearchParams object
  const emailValue = searchParams.get("email"); // gets the value of the email parameter from the query string
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {signup} = useStore();  // gets the signup function from the store


  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the page from refreshing
    // console.log({ username, email, password }); // Log the data
    signup({username, email, password});  // calls the signup function from the store

    
  } 

  return (
        <div className="main-bg h-screen w-full">
            <nav className='flex max-w-6xl mx-auto p-4 items-center justify-between '>
                <Link to={"/"} >
                    <img src="/logo.png" alt="logo" className="w-48" />
                </Link>
            </nav>

            <div className="form flex items-center justify-center mt-20 mx-3">
              <div className="w-full max-w-md space-y-6 p-8 bg-black/50 rounded-lg shadow-md">
                <h1 className='text-white text-center font-bold text-3xl mb-4'>
                  Sign Up
                </h1>

                <form className='space-y-5'onSubmit={handleSubmit} >
                    <div>
                      <label htmlFor="username" className='text-base text-gray-200 font-medium block'>
                        Username
                      </label>
                      <input type="username" id='username'
                       className='w-full mt-1 text-white force:outline-none focus:ring-2 border bg-transparent border-gray-600 rounded-md px-3 py-1' placeholder='JohnDoe' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="email" className='text-base text-gray-200 font-medium block'>
                        Email
                      </label>
                      <input type="email" id='email'
                       className='w-full mt-1 text-white force:outline-none focus:ring-2 border bg-transparent border-gray-600 rounded-md px-3 py-1' placeholder='JohnDoe@gmail.com' value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className='text-base text-gray-200 font-medium block'>
                        Password
                      </label>
                      <input type="password" id='password'
                       className='w-full mt-1 text-white force:outline-none focus:ring-2 border bg-transparent border-gray-600 rounded-md px-3 py-1' placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                  <button className='text-white bg-red-600 rounded-md w-full py-2 font-semibold hover:bg-red-700 active:bg-red-900'>Sign Up</button>
                </form>

                <div className="member text-center text-gray-300">
                  Already Have an Account? {/* <br/> */}
                </div>

                <Link to="/login" className='text-red-500 hover:underline flex justify-center items-center font-semibold  mt-0'> 
                    Log In
                  </Link>

              </div>
            </div>
        </div>
  )
}

export default SignUp
