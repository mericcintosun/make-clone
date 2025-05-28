"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

// Menu data structure
const menuSections = [
  {
    title: "WHAT IS MAKE",
    items: [
      { icon: "lightning", text: "Product overview" },
      { icon: "crosshair", text: "Apps" },
      { icon: "globe", text: "Enterprise" },
      { icon: "users", text: "About us" },
    ],
  },
  {
    title: "MAKE + AI",
    items: [
      { icon: "grid", text: "Automation with AI" },
      { icon: "layers", text: "Agentic automation" },
      { icon: "star", text: "Make AI Agents" },
      { icon: "target", text: "Make AI apps" },
    ],
  },
  {
    title: "SOLUTIONS",
    subtitle: "Make across your business",
    items: [
      { icon: "book", text: "Marketing" },
      { icon: "activity", text: "Sales" },
      { icon: "settings", text: "Operations" },
      { icon: "clipboard", text: "Customer Experience" },
      { icon: "monitor", text: "Finance" },
      { icon: "server", text: "Information Technology" },
      { icon: "people", text: "People" },
      { icon: "compass", text: "Workplace Productivity" },
    ],
  },
  {
    title: "RESOURCES",
    items: [
      { icon: "book-open", text: "Blog" },
      { icon: "trophy", text: "Success stories" },
      { icon: "file-text", text: "How-to guides" },
      { icon: "package", text: "Templates library" },
      { icon: "clipboard-list", text: "Make Academy" },
      { icon: "community", text: "Make Community" },
      { icon: "help-circle", text: "Help center" },
      { icon: "play", text: "Webinars" },
    ],
  },
  {
    title: "PARTNERS",
    items: [
      { icon: "search", text: "Find a partner" },
      { icon: "partner", text: "Become a partner" },
    ],
  },
  {
    title: "PRICING",
    items: [
      { icon: "credit-card", text: "Pricing" },
    ],
  },
];

// Helper function for icon paths
const getIconPath = (iconName) => `/navbarIcon/${iconName}.svg`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [subBannerHeight, setSubBannerHeight] = useState(0);
  const subBannerRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Optimized SubBanner height tracking with single observer
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

    // Single ResizeObserver for efficiency
    const resizeObserver = new ResizeObserver(updateSubBannerHeight);
    
    const subBannerElement = document.querySelector("[data-subbanner]");
    if (subBannerElement) {
      resizeObserver.observe(subBannerElement);
    }

    // Watch for SubBanner element appearing/disappearing
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);
          
          // Check if SubBanner was added or removed
          const subBannerAdded = addedNodes.some(node => 
            node.nodeType === 1 && (node.hasAttribute?.('data-subbanner') || node.querySelector?.('[data-subbanner]'))
          );
          const subBannerRemoved = removedNodes.some(node => 
            node.nodeType === 1 && (node.hasAttribute?.('data-subbanner') || node.querySelector?.('[data-subbanner]'))
          );
          
          if (subBannerAdded || subBannerRemoved) {
            updateSubBannerHeight();
          }
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Memoized styles to prevent unnecessary re-renders
  const navbarStyle = useMemo(() => ({
    top: `${subBannerHeight}px`,
    transform: "translateZ(0)", // Force hardware acceleration
  }), [subBannerHeight]);

  const mobileMenuStyle = useMemo(() => {
    const navbarHeight = 80;
    const totalTopHeight = subBannerHeight + navbarHeight;
    return {
      top: `${totalTopHeight}px`,
      height: `calc(100vh - ${totalTopHeight}px)`,
      maxHeight: `calc(100vh - ${totalTopHeight}px)`,
    };
  }, [subBannerHeight]);

  // Render menu item helper
  const renderMenuItem = (item) => (
    <li key={item.text} className="flex items-center space-x-3">
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
        <Image
          src={getIconPath(item.icon)}
          alt={item.text}
          width={18}
          height={18}
        />
      </div>
      <span className="text-gray-800 text-sm font-semibold">
        {item.text}
      </span>
    </li>
  );

  // Render menu section helper
  const renderMenuSection = (section, index) => (
    <div key={section.title} className="mb-6 sm:mb-8">
      <h3 className="text-gray-500 text-xs font-semibold mb-3 sm:mb-4 tracking-wider">
        {section.title}
      </h3>
      {section.subtitle && (
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          {section.subtitle}
        </h2>
      )}
      <ul className={section.title === "SOLUTIONS" ? "grid grid-cols-1 gap-3 sm:gap-4" : "space-y-3 sm:space-y-4"}>
        {section.items.map(renderMenuItem)}
      </ul>
      {index < menuSections.length - 1 && (
        <hr className="border-gray-200 mt-6 sm:mt-8" />
      )}
    </div>
  );

  return (
    <>
      <nav
        className={`fixed left-0 w-full h-20 flex items-center justify-between px-4 sm:px-6 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "bg-white shadow-lg"
            : "bg-gradient-to-r from-[#220041] to-[#41007F]"
        }`}
        style={navbarStyle}
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
              src={getIconPath("close")}
              alt="Close menu"
              width={56}
              height={56}
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
          ) : (
            // Hamburger menu icon
            <Image
              src={getIconPath("hamburger")}
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
        style={mobileMenuStyle}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-4 sm:p-6 pb-8">
            {/* Render all menu sections */}
            {menuSections.map(renderMenuSection)}

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
