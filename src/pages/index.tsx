import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../public/1.png';
import main from '../../public/2.png';

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
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Top Banner */}
        <div className="bg-white py-2 text-center text-black">
          <a
            href="https://livebuy.in"
            className="block overflow-hidden whitespace-nowrap"
          >
            <p className="text-xs sm:text-sm md:text-base font-poppins font-thin ">
              Our kitchen is bustling right now; we'll notify you when the dish is ready! 🎉
            </p>
          </a>
        </div>
        {/* Main Content Container */}
        <div className="flex-grow flex flex-col">
          {/* Live Indicator in Top Left of Content Area */}
          <div className="flex items-center justify-start px-12 pt-10">
            <span className="h-3 w-3 animate-pulse rounded-full bg-red-500 mr-2"></span>
            <span className="text-white font-poppins text-lg font-thin">Live</span>
          </div>
          {/* Centered Content */}
          <div className="flex-grow flex mt-[20vh] flex-col items-center justify-center text-center px-4">
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
              <div className="flex items-center justify-center text-3xl sm:text-4xl md:text-9xl">
                <span className="flex flex-row font-poppins items-end justify-center font-bold">
                  {formatTime(timeRemaining.hours)}:
                  {formatTime(timeRemaining.minutes)}:
                  <span className="font-bold flex flex-row items-end text-orange-500">
                    {formatTime(timeRemaining.seconds)} <div className='text-3xl text-[#A6A6A6] pl-5 pb-3'>hrs</div>
                  </span>
                </span>
              </div>
              <p className="text-sm font-poppins sm:text-base mt-4">
                people have signed up
              </p>
            </div>
            {/* Email Signup */}
            <form onSubmit={handleEmailSubmit} className="w-full max-w-md flex mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow font-poppins bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 font-poppins text-white px-2 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
              >
                Notify me
              </button>
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
            <p className="text-xs sm:text-sm font-poppins text-gray-400 max-w-[70%] text-center">
              Hurry up! We're at capacity and offering early access to only 2 million people.
              Sign up now to join the list! We're working tirelessly to restore our services
              and are overwhelmed by the response.
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