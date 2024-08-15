import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store.js';
import Navbar from '../components/Navbar.jsx';

const UserEdit = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useStore();
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);

  const images = [
    '/avatar1.png',
    '/avatar2.png',
    '/avatar3.png',
    '/avatar4.png',
    '/avatar5.png',
    '/avatar6.png',
  ];
  

  const handleAvatarSelect = (image) => {
    setAvatar(image);
    // console.log(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUser({ username, avatar });
    if (res.success) {
      navigate('/');
    } else {
      // console.error(res.message);
    }
  };

  return (
    <div className='bg-black min-h-screen text-white flex flex-col items-center'>
      < Navbar />
      <h1 className='text-6xl font-bold'>Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <div className='mb-4'>
          <label className='block text-xl'>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='text-black p-2 rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-xl'>Email</label>
          <input
            type='email'
            value={user.email}
            disabled
            className='text-gray-500 p-2 rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-xl'>Password</label>
          <input
            type='password'
            value='eeeeeee'
            disabled
            className='text-gray-500 p-2 rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-3xl font-bold'>Select Avatar</label>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4'>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`avatar-${index + 1}`}
                className={`w-44 h-44 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out p-4 ${image === user.avatar ? 'border-red-600 border-4' : ''}
                 ${image === avatar && image!== user.avatar ? 'border-blue-600 border-4' : ''}`}
                onClick={() => handleAvatarSelect(image)}
              />
            ))}
          </div>
        </div>
        <button type='submit' className='text-4xl font-bold bg-red-600 p-4 rounded-md hover:bg-red-700 active:bg-red-800 mb-12'>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserEdit;