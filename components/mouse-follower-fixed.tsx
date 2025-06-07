"use client";

import { useEffect } from 'react';
import MouseFollower from 'mouse-follower';
import gsap from 'gsap';

// Declare global window interface extension
declare global {
  interface Window {
    mousefollower: MouseFollower | null;
  }
}

export default function CustomMouseFollower() {
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Register GSAP with MouseFollower
    MouseFollower.registerGSAP(gsap);

    // Initialize the cursor with custom options
    const cursor = new MouseFollower({
      container: document.body,
      className: 'mf-cursor',
      innerClassName: 'mf-cursor-inner',
      textClassName: 'mf-cursor-text',
      mediaClassName: 'mf-cursor-media',
      mediaBoxClassName: 'mf-cursor-media-box',
      speed: 0.55,
      ease: 'expo.out',
      skewing: 2,
      skewingText: 2,
      skewingIcon: 2,
      skewingMedia: 1,
      skewingDelta: 0.001,
      skewingDeltaMax: 0.15,
      stickDelta: 0.15,
      showTimeout: 20,
      hideOnLeave: true,
      hideTimeout: 300,
      dataAttr: 'cursor',
      stateDetection: {
        '-pointer': 'a,button,input,textarea,select,.pointer,[role="button"],.btn,[type="button"],.clickable,label',
        '-inverse': '.bg-white, .bg-slate-100, .bg-gray-100, .invert-cursor',
        '-hidden': 'iframe, .hide-cursor',
        '-exclusion': '[data-cursor="-exclusion"]',
        '-text': '[data-cursor="-text"]',
        '-active': '[data-cursor="-active"]',
        '-magnetic': '[data-cursor="-magnetic"]'
      }
    });

    // Store cursor instance globally to access it from our hooks
    window.mousefollower = cursor;

    // Clean up function to destroy the cursor when component unmounts
    return () => {
      if (cursor) cursor.destroy();
      window.mousefollower = null;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render anything
}
