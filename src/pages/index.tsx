import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../public/1.png';
import Link from 'next/link';
import main from '../../public/2.png';

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
    <div>
      <div className="bg-white py-[0.7%] text-center text-black">
        <Link href="https://livebuy.in">
          <div className="overflow-hidden whitespace-nowrap font-semibold">
            <div className="flex h-[3vh] items-center justify-center">
              <p className="font-poppins text-[3vw] font-[400] underline sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw]">
                Get up to 50% off on your first month's rent
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="bg-black max-h-[96vh] text-white p-8 flex flex-col ">
        <div className='flex justify-start items-start text-start'>
          <div className='flex text-red-600 text-start'> Live</div>
        </div>
        <div className='bg-black text-white p-8 flex flex-col  items-center'>
          <div className='flex flex-row gap-2'>
            <Image src={logo} alt='neew' width={25} height={10}></Image>
            <p>livebuy</p>
          </div>
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
          <p className="text-sm max-w-[90vh] pt-10 text-center text-gray-400 mt-2">
            hurry up! we're at capacity and offering early access to only 2 million people. sign up now to join the list! we're working tirelessly to restore our services and are overwhelmed by the response.
          </p>
        </div>
        <Image src={main} className='px-[20vh] ' alt='neew' />

        <div className='bg-black text-white p-8 bottom-[1px] flex flex-col  items-center'>
          <footer className="mt-8 items-center  text-gray-500 text-sm">
            © copyrights livebuy • all rights reserved • about us
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LivebuyCountdown;