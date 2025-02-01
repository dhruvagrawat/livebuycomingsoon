import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../public/1.png';
import main from '../../public/2.png';
import BouncyButton from './button';
import Head from 'next/head';

const LivebuyCountdown = () => {
  const LAUNCH_DATE = new Date('2025-04-01T00:00:00Z');

  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = LAUNCH_DATE.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds });
      } else {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => String(time).padStart(2, '0');

  const handleEmailSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNotificationStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setNotificationStatus('success');
        setEmail('');
      } else {
        setNotificationStatus('error');
      }
    } catch (error) {
      setNotificationStatus('error');
    }
  };

  return (

    <main>
      <Head>
        <meta name="Livebuy: Rent flats in 10 minutes!" />
      </Head>
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Top Banner */}
        <div className="bg-white py-2 text-center text-black">
          <a
            href="https://livebuy.in"
            className="block overflow-hidden whitespace-nowrap"
          >
            <p className="text-[12px] sm:text-sm font-poppins font-thin ">
              Our kitchen is bustling right now; we'll notify you when the dish is ready! 🎉
            </p>
          </a>
        </div>
        {/* Main Content Container */}
        <div className="flex-grow flex flex-col">
          {/* Live Indicator in Top Left of Content Area */}
          <div className="flex items-center justify-between ">
            <div className='flex items-center justify-start px-12 pt-8'>
              <span className="h-3 w-3 animate-pulse rounded-full bg-red-500 mr-2"></span>
              <span className="text-white font-poppins text-lg font-thin">Live</span>
            </div>
            <div className='px-12 py-6' >
              <BouncyButton />
            </div>
          </div>
          {/* Centered Content */}
          <div className="flex-grow flex mt-[10vh] flex-col items-center justify-center text-center px-4">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <Image
                src={logo}
                alt="Livebuy Logo"
                width={29}
                height={29}
                className="mr-2"
              />
              <h1 className="text-xl font-poppins font-thin">livebuy</h1>
            </div>
            {/* Countdown Timer */}
            <div className="mb-8">
              <div className="flex items-center justify-center text-3xl sm:text-4xl md:text-7xl">
                <span className="flex flex-row font-poppins items-end justify-center font-bold">
                  {formatTime(timeRemaining.hours)}:
                  {formatTime(timeRemaining.minutes)}:
                  <span className="font-bold flex flex-row items-end text-[#FF6C3E]">
                    {formatTime(timeRemaining.seconds)} <div className='text-2xl text-[#A6A6A6] pl-5 pb-3'>hrs</div>
                  </span>
                </span>
              </div>
              <h1 className="text-base font-poppins lg:text-lg mt-6">
                to flats in 10 minutes launch
              </h1>
            </div>
            {/* Email Signup */}
            <form onSubmit={handleEmailSubmit} className="w-full pb-10 max-w-[500px] relative mt-6">
              {/* Label positioned on the border */}
              <div className="absolute -top-3 left-4 px-2 bg-black">
                <span className="text-[#f2f2f2] text-sm">email</span>
              </div>

              <div className="flex w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="smellycat69@gmail.com"
                  className="flex-grow bg-black border-white  border-t border-b border-l text-white px-4 py-4 rounded-l-[9px] focus:outline-none hover:border-[#fff0d8] placeholder:text-[#bebebe]"
                  required
                />

                <div className='border-t border-b rounded-r-[9px] border-white'>
                  <button
                    type="submit"
                    className="bg-white text-sm text-black px-10 py-5 rounded-[9px] hover:bg-[#fff0d8] hover:text-black  transition-colors duration-300 whitespace-nowrap"
                  >
                    Notify me
                  </button>
                </div>
              </div>
            </form>
            {/* Notification Status */}
            {notificationStatus === 'success' && (
              <p className="text-green-500 font-poppins text-sm mb-4">
                You will be notified when our services are back! Easy renting!
              </p>
            )}
            {notificationStatus === 'error' && (
              <p className="text-red-500 font-poppins text-sm mb-4">
                Please enter a valid email or try again later.
              </p>
            )}
            {/* Capacity Message */}
            <p className="text-xs sm:text-sm font-poppins text-[#a6a6a6] max-w-[80%] text-center">
              Get notified when we launch! We're revamping our platform to make finding flats faster than ever. <br /> With our new model, you’ll be  able to visit flats—physically or virtually—in just 10 minutes! Request pitch deck or reach out at hi@livebuy.in
            </p>
          </div>
        </div>
        {/* Hidden Sections - Appear on Scroll */}
        <div id="scroll-sections" className="hidden-on-first-view mt-[50vh]">
          {/* Background Image */}
          <div className="w-full px-4 md:px-16 lg:px-32 mt-8">
            <Image
              src={main}
              alt="Background"
              layout="responsive"
              objectFit="cover"
              className="opacity-50"
            />
          </div>
          {/* Footer */}
          <footer className="bg-black font-poppins text-center py-4 text-gray-500 text-xs mt-8">
            © Copyrights Livebuy • All Rights Reserved • About Us
          </footer>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </main>
  );
};

export default LivebuyCountdown;