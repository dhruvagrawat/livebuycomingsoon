import React, { useState, useEffect } from 'react';

const LivebuyCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState(1344 * 3600 + 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="bg-black text-white p-8 flex flex-col ">
      <div className='flex justify-start items-start text-start'>
        <div className='flex text-red-600 text-start'> Live</div>
      </div>
      <div className='bg-black text-white p-8 flex flex-col  items-center'>
        <div className="flex items-center">
          <span className="text-8xl font-bold mr-4">{hours}:{minutes}:</span>
          <span className="text-8xl font-bold text-orange-500">{seconds}</span>
        </div>
        <p className="text-xl mt-4">people have signed up</p>
        <div className="flex items-center mt-6">
          <input
            type="email"
            placeholder="email"
            className="bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded-l-md"
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md">
            Notify me
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          you will be notified when our services are back! easy renting!
        </p>
        <p className="text-sm text-gray-400 mt-2">
          hurry up! we're at capacity and offering early access to only 2 million people. sign up now to join the list! we're working tirelessly to restore our services and are overwhelmed by the response.
        </p>
      </div>
      <div className='h-[10vh] bg-white m-20 p-20 rounded-3xl border border-black w-[90%]'>
        extra div
      </div>
      <div className='bg-black text-white p-8 flex flex-col  items-center'>
        <footer className="mt-8 items-center text-gray-500 text-sm">
          © copyrights livebuy • all rights reserved • about us
        </footer>
      </div>
    </div>
  );
};

export default LivebuyCountdown;