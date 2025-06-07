"use client";

import React from 'react';

// Helper function to apply mouse follower effects to sidebar elements
interface CursorOptions {
  state?: string;
  text?: string;
}

export function withCursorEffects<P extends object>(
  Component: React.ComponentType<P>,
  cursorOptions: CursorOptions = { state: '-active', text: '' }
) {
  return function WithCursorEffects(props: P) {
    const ref = React.useRef<HTMLElement>(null);
    
    React.useEffect(() => {
      const element = ref.current;
      if (!element || typeof window === 'undefined' || !window.mousefollower) return;
      
      const cursor = window.mousefollower;
      
      const handleMouseEnter = () => {
        if (cursorOptions.state) cursor.addState(cursorOptions.state);
        if (cursorOptions.text) cursor.setText(cursorOptions.text);
      };
      
      const handleMouseLeave = () => {
        if (cursorOptions.state) cursor.removeState(cursorOptions.state);
        if (cursorOptions.text) cursor.removeText();
      };
      
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);
    
    return <Component ref={ref} {...props} />;
  };
}

// Helper hooks for applying cursor effects to sidebar navigation items
export function useSidebarItemCursorEffect<T extends HTMLElement>(ref: React.RefObject<T | null>, label: string) {
  React.useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined' || !window.mousefollower) return;
    
    const cursor = window.mousefollower;
    
    const handleMouseEnter = () => {
      cursor.addState('-active');
      cursor.setText(label);
    };
    
    const handleMouseLeave = () => {
      cursor.removeState('-active');
      cursor.removeText();
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, label]);
}
