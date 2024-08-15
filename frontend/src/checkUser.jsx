import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Landing from './pages/Landing.jsx'
import { useStore } from './store/store.js'
import AvatarSelect from './pages/avatarSelect.jsx'


const UserCheck = () => {
    const {user} = useStore();   // value needs to come from backend to check if user is logged in or not
  return (
    <div>
        {user ? ((user.avatar || !user.avatarSelectionRequired) ? <Home /> : <AvatarSelect />) : <Landing />}

    </div>
  )
}

export default UserCheck;