import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import UserCheck from './checkUser.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Footer from './components/Footer.jsx'
import PlayPage from './pages/PlayPage.jsx'
import { useStore } from './store/store.js'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css'
import Favourite from './pages/Favourite.jsx'
import SearchResults from './pages/SearchResults.jsx'
import AvatarSelect from './pages/avatarSelect.jsx'
import UserEdit from './pages/userEdit.jsx'
import Page404 from './pages/Page404.jsx'

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);  // to scroll to the top of the page when the location or when route changes // BASICALLY SCROLL USER TO TOP IF THE USER IS AT BOTTOM OF THE HOME CAROUSEL OR ELSE IT FEELS WEIRD

  const {user, checkingAuth, getAuth} = useStore();  // checkingAuthi acts as a loading state to make an illusion of a loading effect when the user is being checked
  // console.log("The authenticated user: ",user);

  useEffect(() => {
    getAuth();  // runs only once when the component mounts
  },[getAuth])  // runs when checkingAuth changes;

  if(checkingAuth) {
    return (
       <div className="flex justify-center items-center bg-black h-screen">
        <h1 className="text-4xl text-red-600">Loading...</h1>  {/* put a better Loading spinner later!!!*/}
      </div>
    )
  }
  

  
  return (
    <>
      < ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce
        />
        <Routes>
          <Route path='/' element={<UserCheck/>}/>
          <Route path='/login' element={!user? <Login/> : < Navigate to={"/"} /> }/>
          <Route path='/signup' element={!user? <SignUp/> : < Navigate to={"/"} />}/>
          <Route path='/updateAvatar' element={(user && !user.avatar) ? <AvatarSelect/> : < Navigate to={"/login"} />}/>
          <Route path='/watch/:id' element={user? <PlayPage/> : < Navigate to={"/login"} />}/>
          <Route path='/favourite' element={user ? <Favourite /> : <Navigate to={"/login"} />} />
          <Route path='/search' element={user ? <SearchResults /> : <Navigate to={"/login"} />} />
          <Route path='/editUser' element={user ? <UserEdit /> : <Navigate to={"/login"} />} />
          <Route path='/*' element={<Page404/>} />
        </Routes>
        <Footer />

    </>
  )
}

export default App;
