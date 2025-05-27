"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubBannerVisible, setIsSubBannerVisible] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if SubBanner exists in DOM to determine visibility
  useEffect(() => {
    const checkSubBanner = () => {
      const subBannerElement = document.querySelector('[data-subbanner]');
      setIsSubBannerVisible(!!subBannerElement);
    };

    // Initial check
    checkSubBanner();

    // Set up observer to watch for SubBanner changes
    const observer = new MutationObserver(checkSubBanner);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // SubBanner height is approximately 96px (adjusted by user)
  const subBannerHeight = 96;
  const navbarHeight = 80;
  const navbarTop = isSubBannerVisible ? subBannerHeight : 0;
  const totalTopHeight = navbarTop + navbarHeight;

  return (
    <>
      <nav 
        className="fixed left-0 w-full h-20 bg-gradient-to-r from-[#220041] to-[#41007F] flex items-center justify-between px-6 z-40 transition-all duration-300"
        style={{ top: `${navbarTop}px` }}
      >
        {/* Logo */}
        <div className="h-10 flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={72}
            height={24}
            className="h-6 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Hamburger Menu */}
        <button 
          className="h-14 w-14 flex items-center justify-center"
          onClick={toggleMobileMenu}
        >
          <svg 
            role="none" 
            width="100%" 
            height="100%" 
            viewBox="0 0 56 56" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14"
          >
            <path 
              d="M0 28C0 12.536 12.536 0 28 0V0C43.464 0 56 12.536 56 28V28C56 43.464 43.464 56 28 56V56C12.536 56 0 43.464 0 28V28Z" 
              fill="#220041"
            />
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M27.9092 21.3636H21.3638V27.9091H27.9092V21.3636ZM27.9092 30.0909H21.3638V36.6364H27.9092V30.0909ZM28.8931 32.1657L34.5616 28.8929L37.8343 34.5615L32.1658 37.8342L28.8931 32.1657ZM36.6365 21.3636H30.091V27.9091H36.6365V21.3636Z" 
              fill="white"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed left-0 w-full bg-gradient-to-b from-[#220041] to-[#41007F] z-30 transition-all duration-300"
          style={{ 
            top: `${totalTopHeight}px`,
            height: `calc(100vh - ${totalTopHeight}px)`
          }}
        >
          <div className="p-6">
            <ul className="space-y-6">
              <li>
                <a href="#" className="block text-white text-xl font-medium hover:text-gray-200 transition-colors">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="#" className="block text-white text-xl font-medium hover:text-gray-200 transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#" className="block text-white text-xl font-medium hover:text-gray-200 transition-colors">
                  Hizmetler
                </a>
              </li>
              <li>
                <a href="#" className="block text-white text-xl font-medium hover:text-gray-200 transition-colors">
                  İletişim
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
