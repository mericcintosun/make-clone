import React from 'react';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#220041] to-[#41007F] text-white px-4 py-16 pt-32">
      {/* Main Heading */}
      <h1 className="text-2xl font-bold text-center mb-8 max-w-4xl leading-tight">
        Automation you can see, flex, and scale
      </h1>
      
      {/* Paragraph */}
      <p className="text-xl font-semibold text-center mb-8 max-w-3xl leading-relaxed opacity-90">
        Realize your business's full potential with Make's intuitive no code development platform and harness the full power of AI.
      </p>
      
      {/* Get Started Button */}
      <button 
        className="bg-[#ff009a] hover:bg-[#e6008a] text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-200 mb-8"
      >
        Get started free →
      </button>
      
      {/* Checkmark Items */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 text-center">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-white font-medium">No credit card required</span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-white font-medium">No time limit on Free plan</span>
        </div>
      </div>
      
      {/* Video */}
      <div className="w-full max-w-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        >
          <source src="/make_new_hero_animation.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection; 