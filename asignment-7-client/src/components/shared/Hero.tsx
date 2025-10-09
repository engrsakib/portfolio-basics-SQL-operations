// components/Hero.tsx
import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#0a0a23] to-[#000000] text-white min-h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="w-full px-6 md:px-16 py-6 flex justify-between items-center">
        <div className="text-2xl font-semibold tracking-wide">Neofolio</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-orange-400">Home</a>
          <a href="#" className="hover:text-orange-400">Pages</a>
          <a href="#" className="hover:text-orange-400">Works</a>
          <a href="#" className="hover:text-orange-400">Blogs</a>
          <a href="#" className="hover:text-orange-400">Contact Us</a>
        </div>
        <button className="hidden md:block bg-white text-black text-sm px-4 py-2 rounded-md hover:bg-orange-400 hover:text-white transition">
          Purchase Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24">
        {/* Left Text Content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Neofolio</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Creative Agency <br className="hidden md:block" /> Theme
          </h2>
          <button className="mt-6 bg-white text-black font-medium px-6 py-3 rounded hover:bg-orange-500 hover:text-white transition">
            Try Our Demos
          </button>
        </div>

        {/* Right Image Cards */}
        <div className="relative mt-16 md:mt-0 w-full md:w-1/2 flex justify-center md:justify-end">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-30 z-0"></div>

          {/* Card 1 */}
          <div className="relative z-10 transform rotate-[6deg] shadow-2xl bg-black text-white p-6 rounded-2xl w-60 md:w-72">
            <p className="text-sm font-medium mb-2">I’m Benjamen</p>
            <h3 className="text-xl font-bold mb-3">a Digital Designer</h3>
            <p className="text-xs opacity-70 mb-4">
              I'm a passionate graphic designer with over 12 years of experience. 
            </p>
            <p className="text-sm font-semibold">Over <span className="text-orange-400 text-xl">12</span> years</p>
          </div>

          {/* Card 2 */}
          <div className="absolute -top-10 -left-10 transform -rotate-[8deg] z-20 bg-white text-black p-4 rounded-2xl shadow-lg w-60 md:w-72">
            <img 
              src="https://via.placeholder.com/150x150?text=Avatar" 
              alt="Profile"
              className="rounded-xl mb-3"
            />
            <p className="text-xs font-medium opacity-60">
              We help business elevate value through custom software, UI/UX and strategy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
