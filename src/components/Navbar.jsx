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
            <svg
              role="none"
              width="100%"
              height="100%"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 sm:h-14 sm:w-14"
            >
              <path
                d="M0 28C0 12.536 12.536 0 28 0V0C43.464 0 56 12.536 56 28V28C56 43.464 43.464 56 28 56V56C12.536 56 0 43.464 0 28V28Z"
                fill="#220041"
              />
              <path
                d="M21 21L35 35M35 21L21 35"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            // Hamburger menu icon
            <svg
              role="none"
              width="100%"
              height="100%"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 sm:h-14 sm:w-14"
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="#6366f1" />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Product overview
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="3" fill="#6366f1" />
                      <path
                        d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Apps
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path d="M2 12h20" stroke="#6366f1" strokeWidth="2" />
                      <path
                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Enterprise
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <circle
                        cx="9"
                        cy="7"
                        r="4"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M23 21v-2a4 4 0 0 0-3-3.87"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 3.13a4 4 0 0 1 0 7.75"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="7"
                        height="7"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <rect
                        x="14"
                        y="3"
                        width="7"
                        height="7"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <rect
                        x="14"
                        y="14"
                        width="7"
                        height="7"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <rect
                        x="3"
                        y="14"
                        width="7"
                        height="7"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Automation with AI
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7l10 5 10-5-10-5z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M2 17l10 5 10-5"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M2 12l10 5 10-5"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Agentic automation
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon
                        points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26"
                        stroke="#6366f1"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Make AI Agents
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="12" r="1" fill="#6366f1" />
                      <circle
                        cx="12"
                        cy="12"
                        r="7"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Marketing
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline
                        points="22,12 18,12 15,21 9,3 6,12 2,12"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Sales
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Operations
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <rect
                        x="8"
                        y="2"
                        width="8"
                        height="4"
                        rx="1"
                        ry="1"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Customer Experience
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="3"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="8"
                        y1="21"
                        x2="16"
                        y2="21"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="12"
                        y1="17"
                        x2="12"
                        y2="21"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Finance
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="4"
                        width="20"
                        height="16"
                        rx="2"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M7 15h0M12 15h0M17 15h0M7 11h0M12 11h0M17 11h0"
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Information Technology
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <circle
                        cx="9"
                        cy="7"
                        r="4"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M23 21v-2a4 4 0 0 0-3-3.87"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 3.13a4 4 0 0 1 0 7.75"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    People
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2v20M2 12h20"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M16.24 7.76a6 6 0 0 1-8.49 8.49"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Blog
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path d="M4 22h16" stroke="#6366f1" strokeWidth="2" />
                      <path
                        d="M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 22v-13h8v13"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M9 7h6v4H9V7z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Success stories
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <polyline
                        points="14,2 14,8 20,8"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="13"
                        x2="8"
                        y2="13"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="17"
                        x2="8"
                        y2="17"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <polyline
                        points="10,9 9,9 8,9"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    How-to guides
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <polyline
                        points="7.5,4.21 12,6.81 16.5,4.21"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <polyline
                        points="7.5,19.79 7.5,14.6 3,12"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <polyline
                        points="21,12 16.5,14.6 16.5,19.79"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <polyline
                        points="12,22.08 12,17"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="12"
                        y1="6.81"
                        x2="12"
                        y2="12"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Templates library
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <rect
                        x="8"
                        y="2"
                        width="8"
                        height="4"
                        rx="1"
                        ry="1"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path d="M12 11h4" stroke="#6366f1" strokeWidth="2" />
                      <path d="M12 16h4" stroke="#6366f1" strokeWidth="2" />
                      <path d="M8 11h.01" stroke="#6366f1" strokeWidth="2" />
                      <path d="M8 16h.01" stroke="#6366f1" strokeWidth="2" />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Make Academy
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon
                        points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26"
                        stroke="#6366f1"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Make Community
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="12"
                        y1="17"
                        x2="12.01"
                        y2="17"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Help center
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon
                        points="5,3 19,12 5,21"
                        stroke="#6366f1"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <polyline
                        points="14,2 14,8 20,8"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="13"
                        x2="8"
                        y2="13"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="17"
                        x2="8"
                        y2="17"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <polyline
                        points="10,9 9,9 8,9"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">
                    Find a partner
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <circle
                        cx="9"
                        cy="7"
                        r="4"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M23 21v-2a4 4 0 0 0-3-3.87"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 3.13a4 4 0 0 1 0 7.75"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="4"
                        width="20"
                        height="14"
                        rx="2"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1="2"
                        y1="10"
                        x2="22"
                        y2="10"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                    </svg>
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
