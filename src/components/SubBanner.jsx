"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const SubBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="w-full bg-[#5b1a95] text-white py-3 px-4 flex items-center justify-center relative"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="text-center text-base sm:text-lg max-w-lg mx-auto px-12">
        <span className="font-bold">New: </span>
        <span className="font-bold underline">Make AI Agents</span>
        <span className="font-bold"> are here!</span>
        <span className="font-normal">
          {" "}
          Build adaptive, intelligent automation - available now on all paid
          plans 🚀
        </span>
      </div>
      <button
        onClick={handleClose}
        className="absolute right-4 p-1 hover:bg-white/10 rounded transition-colors duration-200"
        aria-label="Close banner"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default SubBanner;
