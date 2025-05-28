"use client";

import { useState, useEffect } from "react";

export const useBannerVisibility = (storageKey = "subBannerDismissed") => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const isDismissed = localStorage.getItem(storageKey) === "true";
    setIsVisible(!isDismissed);
    setIsHydrated(true);
  }, [storageKey]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, "true");
  };

  return {
    isVisible: isHydrated ? isVisible : false, // Don't show until hydrated to prevent flash
    handleClose,
    isHydrated,
  };
}; 