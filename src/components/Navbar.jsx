"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [subBannerHeight, setSubBannerHeight] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Dynamically calculate SubBanner height
  useEffect(() => {
    const updateSubBannerHeight = () => {
      const subBannerElement = document.querySelector("[data-subbanner]");
      if (subBannerElement) {
        const height = subBannerElement.getBoundingClientRect().height;
        setSubBannerHeight(height);
      } else {
        setSubBannerHeight(0);
      }
    };

    // Initial calculation
    updateSubBannerHeight();

    // Create ResizeObserver to watch for SubBanner size changes
    const resizeObserver = new ResizeObserver(updateSubBannerHeight);
    const mutationObserver = new MutationObserver(updateSubBannerHeight);

    const subBannerElement = document.querySelector("[data-subbanner]");
    if (subBannerElement) {
      resizeObserver.observe(subBannerElement);
    }

    // Watch for DOM changes
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Update on window resize
    window.addEventListener("resize", updateSubBannerHeight);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", updateSubBannerHeight);
    };
  }, []);

  const navbarHeight = 80;
  const totalTopHeight = subBannerHeight + navbarHeight;

  return (
    <>
      <nav
        className={`fixed left-0 w-full h-20 flex items-center justify-between px-4 sm:px-6 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "bg-white shadow-lg"
            : "bg-gradient-to-r from-[#220041] to-[#41007F]"
        }`}
        style={{
          top: `${subBannerHeight}px`,
          transform: "translateZ(0)", // Force hardware acceleration
        }}
      >
        {/* Logo */}
        <div className="h-10 flex items-center cursor-pointer flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={72}
            height={24}
            className={`h-6 w-auto object-contain transition-all duration-300 ${
              isMobileMenuOpen ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </div>

        {/* Hamburger Menu */}
        <button
          className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 flex-shrink-0"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            // Close (X) icon
            <Image
              src="/navbarIcon/close.svg"
              alt="Close menu"
              width={56}
              height={56}
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
          ) : (
            // Hamburger menu icon
            <Image
              src="/navbarIcon/hamburger.svg"
              alt="Open menu"
              width={56}
              height={56}
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 w-full bg-white z-35 transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{
          top: `${totalTopHeight}px`,
          height: `calc(100vh - ${totalTopHeight}px)`,
          maxHeight: `calc(100vh - ${totalTopHeight}px)`,
        }}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-4 sm:p-6 pb-8">
            {/* WHAT IS MAKE Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-gray-500 text-xs font-semibold mb-3 sm:mb-4 tracking-wider">
                WHAT IS MAKE
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/lightning.svg"
                      alt="Lightning"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Product overview
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/crosshair.svg"
                      alt="Crosshair"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Apps
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/globe.svg"
                      alt="Globe"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Enterprise
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/users.svg"
                      alt="Users"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    About us
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200 mb-6 sm:mb-8" />

            {/* MAKE + AI Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-gray-500 text-xs font-semibold mb-3 sm:mb-4 tracking-wider">
                MAKE + AI
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/grid.svg"
                      alt="Grid"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Automation with AI
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/layers.svg"
                      alt="Layers"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Agentic automation
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/star.svg"
                      alt="Star"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Make AI Agents
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/target.svg"
                      alt="Target"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Make AI apps
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200 mb-6 sm:mb-8" />

            {/* SOLUTIONS Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-gray-500 text-xs font-semibold mb-3 sm:mb-4 tracking-wider">
                SOLUTIONS
              </h3>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                Make across your business
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/book.svg"
                      alt="Book"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Marketing
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/activity.svg"
                      alt="Activity"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Sales
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/settings.svg"
                      alt="Settings"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Operations
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/clipboard.svg"
                      alt="Clipboard"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Customer Experience
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/monitor.svg"
                      alt="Monitor"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Finance
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/server.svg"
                      alt="Server"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Information Technology
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/people.svg"
                      alt="People"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    People
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/compass.svg"
                      alt="Compass"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Workplace Productivity
                  </span>
                </div>
              </div>
            </div>

            <hr className="border-gray-200 mb-6 sm:mb-8" />

            {/* RESOURCES Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-gray-500 text-xs font-semibold mb-3 sm:mb-4 tracking-wider">
                RESOURCES
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/book-open.svg"
                      alt="Book Open"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Blog
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/trophy.svg"
                      alt="Trophy"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Success stories
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/file-text.svg"
                      alt="File Text"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    How-to guides
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/package.svg"
                      alt="Package"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Templates library
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/clipboard-list.svg"
                      alt="Clipboard List"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Make Academy
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/community.svg"
                      alt="Community"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Make Community
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/help-circle.svg"
                      alt="Help Circle"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Help center
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/play.svg"
                      alt="Play"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Webinars
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200 mb-6 sm:mb-8" />

            {/* PARTNERS Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-gray-500 text-xs font-semibold mb-3 sm:mb-4 tracking-wider">
                PARTNERS
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/search.svg"
                      alt="Search"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Find a partner
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/partner.svg"
                      alt="Partner"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Become a partner
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200 mb-6 sm:mb-8" />

            {/* PRICING Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-gray-500 text-xs font-semibold mb-3 sm:mb-4 tracking-wider">
                PRICING
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/navbarIcon/credit-card.svg"
                      alt="Credit Card"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Pricing
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200 mb-6 sm:mb-8" />

            {/* Talk to sales Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                Talk to sales
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {/* Log in Button */}
                <button className="py-3 px-6 border-2 border-purple-500 text-purple-500 rounded-2xl font-semibold text-sm hover:bg-purple-50 transition-colors">
                  Log in
                </button>

                {/* Get started free Button */}
                <button className="py-3 px-6 bg-pink-500 text-white rounded-2xl font-semibold text-sm hover:bg-pink-600 transition-colors">
                  Get started free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
