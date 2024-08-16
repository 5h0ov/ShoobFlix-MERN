import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/store.js'
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useStore();
  // const {user} = useStore();


  const handleLogin = async (e) => {
    e.preventDefault(); // prevents the page from refreshing
    const res = await login({ email, password }); // calls the login function from the store
    // console.log(res);

    // console.log("res.avatarSelectionRequired: ", res.avatarSelectionRequired);
    // console.log(res.avatar)
    
    if (!res.avatar || !res.avatarSelectionRequired) {
      navigate('/');
    }
    
    else if (res && res.avatarSelectionRequired) {
      navigate('/updateAvatar');
    } 
    else {
        navigate('/');
    }
};

  return (
    <div className="main-bg h-screen w-full">
        <nav className='max-w-6xl mx-auto p-4 items-center justify-between flex'>
            <Link to={"/"} >
                <img src="/logo.png" alt="logo" className="w-48" />
            </Link>
        </nav>

        <div className="form flex items-center justify-center mt-20 mx-3">
          <div className="w-full max-w-md space-y-6 p-8 bg-black/50 rounded-lg shadow-md">
            <h1 className='text-white text-center font-bold text-3xl mb-4'>
              Log In
            </h1>

            <form className='space-y-5' onSubmit={handleLogin} >
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

              <button className='text-white bg-red-600 rounded-md w-full py-2 font-semibold hover:bg-red-700 active:bg-red-900'>Login</button>
            </form>

            <div className="member text-center text-gray-300">
              Don't Have an Account? {/* <br/> */}
            </div>

            <Link to={`/signup?email=${email}`}  className='text-red-500 hover:underline flex justify-center items-center font-semibold  mt-0'> 
                Sign Up
              </Link>

          </div>
        </div>
    </div>
)
}

export default Login
