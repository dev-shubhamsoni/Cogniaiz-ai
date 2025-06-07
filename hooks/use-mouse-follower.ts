"use client";

import { useEffect } from 'react';
import MouseFollower from 'mouse-follower';

declare global {
  interface Window {
    mousefollower: MouseFollower | null;
  }
}

// Get the global cursor instance
export function useCursor() {
  if (typeof window !== 'undefined') {
    return window.mousefollower || null;
  }
  return null;
}

// Hook to add a state to the cursor when hovering over an element
export function useMouseFollowerState<T extends HTMLElement>(ref: React.RefObject<T>, state: string) {
  useEffect(() => {
    // Early return if not client side or ref is not available
    if (typeof window === 'undefined' || !ref.current) return;
    
    const element = ref.current;
    const cursor = window.mousefollower;
    
    // Early return if no cursor instance exists
    if (!cursor) return;
    
    const handleMouseEnter = () => cursor.addState(state);
    const handleMouseLeave = () => cursor.removeState(state);
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, state]);
}

// Hook to add text to the cursor when hovering over an element
export function useMouseFollowerText<T extends HTMLElement>(ref: React.RefObject<T>, text: string) {
  useEffect(() => {
    // Early return if not client side or ref is not available
    if (typeof window === 'undefined' || !ref.current) return;
    
    const cursor = window.mousefollower;
    // Early return if no cursor instance exists
    if (!cursor) return;
    
    const element = ref.current;
    
    const handleMouseEnter = () => cursor.setText(text);
    const handleMouseLeave = () => cursor.removeText();
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, text]);
}
