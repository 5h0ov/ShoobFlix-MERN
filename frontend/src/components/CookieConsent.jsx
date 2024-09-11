// frontend/src/components/CookieConsent.jsx
import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [consent, setConsent] = useState(localStorage.getItem('cookieConsent'));

  useEffect(() => {
    if (consent !== null) {
      localStorage.setItem('cookieConsent', consent);
    }
  }, [consent]);

  const handleAccept = () => {
    setConsent('accepted');
  };

  const handleDecline = () => {
    setConsent('declined');
  };

  if (consent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white flex justify-between items-center z-50">
      <p>We use cookies to improve your experience. By using our site, you agree to our use of cookies. <span className='cursor-pointer underline'>Learn more...</span></p>
      <div className='font-bold text-lg'>
        <button onClick={handleAccept} className="mr-2 p-3 mb-4 bg-green-500 rounded hover:bg-green-600 active:bg-green-800">Accept</button>
        <button onClick={handleDecline} className="p-3 bg-red-500 rounded hover:bg-red-600 active:bg-red-800">Decline</button>
      </div>
    </div>
  );
};

export default CookieConsent;