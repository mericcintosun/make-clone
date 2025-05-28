"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
    items: [{ icon: "credit-card", text: "Pricing" }],
  },
];

// Helper function for icon paths
const getIconPath = (iconName) => `/navbarIcon/${iconName}.svg`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [subBannerHeight, setSubBannerHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const subBannerRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50); // Set scrolled state when user scrolls more than 50px
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);

          // Check if SubBanner was added or removed
          const subBannerAdded = addedNodes.some(
            (node) =>
              node.nodeType === 1 &&
              (node.hasAttribute?.("data-subbanner") ||
                node.querySelector?.("[data-subbanner]"))
          );
          const subBannerRemoved = removedNodes.some(
            (node) =>
              node.nodeType === 1 &&
              (node.hasAttribute?.("data-subbanner") ||
                node.querySelector?.("[data-subbanner]"))
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

    // Set loaded state after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Memoized styles to prevent unnecessary re-renders
  const navbarStyle = useMemo(
    () => ({
      top: `${subBannerHeight}px`,
      transform: "translateZ(0)", // Force hardware acceleration
    }),
    [subBannerHeight]
  );

  const mobileMenuStyle = useMemo(() => {
    const navbarHeight = 80;
    const totalTopHeight = subBannerHeight + navbarHeight;
    return {
      top: `${totalTopHeight}px`,
      height: `calc(100vh - ${totalTopHeight}px)`,
      maxHeight: `calc(100vh - ${totalTopHeight}px)`,
    };
  }, [subBannerHeight]);

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const hamburgerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Render menu item helper
  const renderMenuItem = (item, index) => (
    <motion.li 
      key={item.text} 
      className="flex items-center space-x-3"
      variants={menuItemVariants}
      custom={index}
    >
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
        <Image
          src={getIconPath(item.icon)}
          alt={item.text}
          width={18}
          height={18}
        />
      </div>
      <span className="text-gray-800 text-sm font-semibold">{item.text}</span>
    </motion.li>
  );

  // Render menu section helper
  const renderMenuSection = (section, index) => (
    <motion.div 
      key={section.title} 
      className="mb-6 sm:mb-8"
      variants={menuItemVariants}
      custom={index}
    >
      <h3 className="text-gray-500 text-xs font-semibold mb-3 sm:mb-4 tracking-wider">
        {section.title}
      </h3>
      {section.subtitle && (
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          {section.subtitle}
        </h2>
      )}
      <ul
        className={
          section.title === "SOLUTIONS"
            ? "grid grid-cols-1 gap-3 sm:gap-4"
            : "space-y-3 sm:space-y-4"
        }
      >
        {section.items.map((item, itemIndex) => renderMenuItem(item, itemIndex))}
      </ul>
      {index < menuSections.length - 1 && (
        <hr className="border-gray-200 mt-6 sm:mt-8" />
      )}
    </motion.div>
  );

  return (
    <>
      <motion.nav
        className={`fixed left-0 w-full h-20 flex items-center justify-between px-4 sm:px-6 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen || isScrolled
            ? "bg-white shadow-lg"
            : "bg-gradient-to-r from-[#220041] to-[#41007F]"
        }`}
        style={navbarStyle}
        variants={navbarVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Logo */}
        <motion.div 
          className="h-10 flex items-center cursor-pointer flex-shrink-0"
          variants={logoVariants}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={72}
            height={24}
            className={`h-6 w-auto object-contain transition-all duration-300 ${
              isMobileMenuOpen || isScrolled ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </motion.div>

        {/* Hamburger Menu */}
        <motion.button
          className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 flex-shrink-0"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          variants={hamburgerVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={getIconPath("close")}
                  alt="Close menu"
                  width={56}
                  height={56}
                  className="h-12 w-12 sm:h-14 sm:w-14"
                />
              </motion.div>
            ) : (
              <motion.div
                key="hamburger"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={getIconPath("hamburger")}
                  alt="Open menu"
                  width={56}
                  height={56}
                  className="h-12 w-12 sm:h-14 sm:w-14"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleMobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed left-0 w-full bg-white z-35"
            style={mobileMenuStyle}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="h-full overflow-y-auto">
              <motion.div className="p-4 sm:p-6 pb-8">
                {/* Render all menu sections */}
                {menuSections.map((section, index) => renderMenuSection(section, index))}

                <motion.hr 
                  className="border-gray-200 mb-6 sm:mb-8" 
                  variants={menuItemVariants}
                />

                {/* Talk to sales Section */}
                <motion.div 
                  className="mb-6 sm:mb-8"
                  variants={menuItemVariants}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Talk to sales
                  </h2>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Log in Button */}
                    <motion.button 
                      className="py-3 px-6 border-2 border-purple-500 text-purple-500 rounded-2xl font-semibold text-sm hover:bg-purple-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Log in
                    </motion.button>

                    {/* Get started free Button */}
                    <motion.button 
                      className="py-3 px-6 bg-pink-500 text-white rounded-2xl font-semibold text-sm hover:bg-pink-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get started free
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
