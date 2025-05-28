"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

const HeroSection = () => {
  const [subBannerHeight, setSubBannerHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(80); // Default 80px
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();

  // Track SubBanner height dynamically
  useEffect(() => {
    const updateHeights = () => {
      // Update SubBanner height
      const subBannerElement = document.querySelector("[data-subbanner]");
      if (subBannerElement) {
        const height = subBannerElement.getBoundingClientRect().height;
        setSubBannerHeight(height);
      } else {
        setSubBannerHeight(0);
      }

      // Update Navbar height
      const navbarElement = document.querySelector("nav");
      if (navbarElement) {
        const height = navbarElement.getBoundingClientRect().height;
        setNavbarHeight(height);
      }
    };

    // Initial calculation
    updateHeights();

    // ResizeObserver for efficiency
    const resizeObserver = new ResizeObserver(updateHeights);

    const subBannerElement = document.querySelector("[data-subbanner]");
    const navbarElement = document.querySelector("nav");

    if (subBannerElement) {
      resizeObserver.observe(subBannerElement);
    }
    if (navbarElement) {
      resizeObserver.observe(navbarElement);
    }

    // Watch for SubBanner element appearing/disappearing
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);

          // Check if SubBanner or Navbar was added or removed
          const relevantChange =
            addedNodes.some(
              (node) =>
                node.nodeType === 1 &&
                (node.hasAttribute?.("data-subbanner") ||
                  node.querySelector?.("[data-subbanner]") ||
                  node.tagName === "NAV" ||
                  node.querySelector?.("nav"))
            ) ||
            removedNodes.some(
              (node) =>
                node.nodeType === 1 &&
                (node.hasAttribute?.("data-subbanner") ||
                  node.querySelector?.("[data-subbanner]") ||
                  node.tagName === "NAV" ||
                  node.querySelector?.("nav"))
            );

          if (relevantChange) {
            updateHeights();
          }
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Set loaded state after a short delay to ensure proper positioning
    const timer = setTimeout(() => {
      setIsLoaded(true);
      controls.start("visible");
    }, 100);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, [controls]);

  // Calculate dynamic padding based on SubBanner height + navbar height
  const dynamicPaddingTop = useMemo(() => {
    return subBannerHeight + navbarHeight;
  }, [subBannerHeight, navbarHeight]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gradient-to-r from-[#220041] to-[#41007F] text-white px-4 py-16"
      style={{
        paddingTop: `${dynamicPaddingTop + 64}px`, // +64px for extra spacing
        minHeight: `calc(100vh - ${dynamicPaddingTop}px)`,
      }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Main Heading */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 max-w-4xl leading-tight"
        variants={itemVariants}
      >
        Automation you can see, flex, and scale
      </motion.h1>

      {/* Paragraph */}
      <motion.p
        className="text-lg font-semibold text-center mb-8 max-w-3xl leading-relaxed opacity-90"
        variants={itemVariants}
      >
        Realize your business's full potential with Make's intuitive no code
        development platform and harness the full power of AI.
      </motion.p>

      {/* Get Started Button */}
      <motion.button
        className="bg-[#ff009a] hover:bg-[#e6008a] text-white font-semibold py-4 px-8 rounded-sm text-sm transition-colors duration-200 mb-8 w-[60%] max-w-xs"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Get started free →
      </motion.button>

      {/* Checkmark Items */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-12 text-center"
        variants={itemVariants}
      >
        <motion.div
          className="flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          <svg
            className="w-5 h-5 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-white font-medium">
            No credit card required
          </span>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          <svg
            className="w-5 h-5 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-white font-medium">
            No time limit on Free plan
          </span>
        </motion.div>
      </motion.div>

      {/* Video */}
      <motion.div className="w-full max-w-2xl" variants={videoVariants}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded-lg shadow-2xl"
        >
          <source src="/make_new_hero_animation.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
