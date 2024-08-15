import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store.js';

const avatars = [
  '/avatar1.png',
  '/avatar2.png',
  '/avatar3.png',
  '/avatar4.png',
  '/avatar5.png',
  '/avatar6.png',
];

const AvatarSelect = () => {
  const navigate = useNavigate();
  const { updateAvatar } = useStore();
  const { skipped } = useStore();
  const { hasSkippped } = useStore();
  // const { user } = useStore();

  const handleAvatarSelect = async(avatar) => {
    const res = await updateAvatar({avatar});
    // console.log(res);
  };

  const handleSkip = () => {
    // localStorage.setItem('hasSkippedAvatar', 'true');
    // user.avatarSelectionRequired= false;
    // // console.log("user.avatarSelectionRequired: ", user.avatarSelectionRequired);
    const res = skipped();
    navigate('/');
  };

  return (
    <div className='bg-black min-h-screen text-white flex flex-col items-center'>
      <h1 className='text-6xl items font-bold'>Select Your Avatar Below</h1>
      <div className="max-w-full  mx-auto ">
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4'>
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`avatar-${index+1}`}
            className={`w-44 h-44 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out p-4 `}
            onClick={() => handleAvatarSelect(avatar)}
          />
        ))}
        </div>
      </div> 
      <button className='text-4xl font-bold bg-red-600 p-4 rounded-md hover:bg-red-700 active:bg-red-800' onClick={handleSkip}>SKIP</button>
    </div>
  );
};

export default AvatarSelect;