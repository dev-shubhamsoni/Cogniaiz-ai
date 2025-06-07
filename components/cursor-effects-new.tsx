"use client";

import { useEffect } from 'react';

// This component adds specific cursor effects to various UI elements across the website
export function GlobalCursorEffects() {
  useEffect(() => {
    // Wait a bit for the DOM to be ready
    const timeout = setTimeout(() => {
      if (typeof window === 'undefined' || !window.mousefollower) return;
      
      const cursor = window.mousefollower;
      
      // We need to store references to the handlers to properly clean them up
      const buttonEnterHandlers: Record<number, () => void> = {};
      const buttonLeaveHandlers: Record<number, () => void> = {};
      const navLinkEnterHandlers: Record<number, () => void> = {};
      const navLinkLeaveHandlers: Record<number, () => void> = {};
      const headingEnterHandlers: Record<number, () => void> = {};
      const headingLeaveHandlers: Record<number, () => void> = {};
      const imageEnterHandlers: Record<number, () => void> = {};
      const imageLeaveHandlers: Record<number, () => void> = {};
      
      try {
        // Add hover effects to all buttons
        const buttons = document.querySelectorAll('button, .btn, [type="button"], .button');
        Array.from(buttons).forEach((button, index) => {
          if (button instanceof HTMLElement) {
            buttonEnterHandlers[index] = () => cursor.addState('-active');
            buttonLeaveHandlers[index] = () => cursor.removeState('-active');
            button.addEventListener('mouseenter', buttonEnterHandlers[index]);
            button.addEventListener('mouseleave', buttonLeaveHandlers[index]);
          }
        });
        
        // Add special effect for navigation links
        const navLinks = document.querySelectorAll('nav a, .nav-link');
        Array.from(navLinks).forEach((link, index) => {
          if (link instanceof HTMLElement) {
            navLinkEnterHandlers[index] = () => cursor.addState('-active');
            navLinkLeaveHandlers[index] = () => cursor.removeState('-active');
            link.addEventListener('mouseenter', navLinkEnterHandlers[index]);
            link.addEventListener('mouseleave', navLinkLeaveHandlers[index]);
          }
        });
        
        // Add text effect for headings
        const headings = document.querySelectorAll('h1, h2, h3');
        Array.from(headings).forEach((heading, index) => {
          if (heading instanceof HTMLElement) {
            headingEnterHandlers[index] = () => {
              cursor.addState('-text');
              cursor.setText(heading.tagName.toLowerCase());
            };
            headingLeaveHandlers[index] = () => {
              cursor.removeState('-text');
              cursor.removeText();
            };
            heading.addEventListener('mouseenter', headingEnterHandlers[index]);
            heading.addEventListener('mouseleave', headingLeaveHandlers[index]);
          }
        });
        
        // Add magnify effect for images
        const images = document.querySelectorAll('img:not(.no-cursor-effect)');
        Array.from(images).forEach((image, index) => {
          if (image instanceof HTMLElement) {
            imageEnterHandlers[index] = () => cursor.addState('-media');
            imageLeaveHandlers[index] = () => cursor.removeState('-media');
            image.addEventListener('mouseenter', imageEnterHandlers[index]);
            image.addEventListener('mouseleave', imageLeaveHandlers[index]);
          }
        });
      } catch (error) {
        console.error('Error applying cursor effects:', error);
      }
      
      // Return cleanup function
      return () => {
        try {
          const buttons = document.querySelectorAll('button, .btn, [type="button"], .button');
          Array.from(buttons).forEach((button, index) => {
            if (button instanceof HTMLElement && buttonEnterHandlers[index]) {
              button.removeEventListener('mouseenter', buttonEnterHandlers[index]);
              button.removeEventListener('mouseleave', buttonLeaveHandlers[index]);
            }
          });
          
          const navLinks = document.querySelectorAll('nav a, .nav-link');
          Array.from(navLinks).forEach((link, index) => {
            if (link instanceof HTMLElement && navLinkEnterHandlers[index]) {
              link.removeEventListener('mouseenter', navLinkEnterHandlers[index]);
              link.removeEventListener('mouseleave', navLinkLeaveHandlers[index]);
            }
          });
          
          const headings = document.querySelectorAll('h1, h2, h3');
          Array.from(headings).forEach((heading, index) => {
            if (heading instanceof HTMLElement && headingEnterHandlers[index]) {
              heading.removeEventListener('mouseenter', headingEnterHandlers[index]);
              heading.removeEventListener('mouseleave', headingLeaveHandlers[index]);
            }
          });
          
          const images = document.querySelectorAll('img:not(.no-cursor-effect)');
          Array.from(images).forEach((image, index) => {
            if (image instanceof HTMLElement && imageEnterHandlers[index]) {
              image.removeEventListener('mouseenter', imageEnterHandlers[index]);
              image.removeEventListener('mouseleave', imageLeaveHandlers[index]);
            }
          });
        } catch (error) {
          console.error('Error cleaning up cursor effects:', error);
        }
      };
    }, 500); // Delay to ensure DOM is loaded
    
    return () => clearTimeout(timeout);
  }, []);
  
  return null;
}

// This component adds exclusion blend mode effect to appropriate elements
export function CursorExclusionEffect() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.mousefollower) return;
    
    const cursor = window.mousefollower;
    const exclusionElements = document.querySelectorAll('[data-cursor="-exclusion"]');
    
    const enterHandlers: Record<number, () => void> = {};
    const leaveHandlers: Record<number, () => void> = {};
    
    try {
      Array.from(exclusionElements).forEach((element, index) => {
        if (element instanceof HTMLElement) {
          enterHandlers[index] = () => cursor.addState('-exclusion');
          leaveHandlers[index] = () => cursor.removeState('-exclusion');
          
          element.addEventListener('mouseenter', enterHandlers[index]);
          element.addEventListener('mouseleave', leaveHandlers[index]);
        }
      });
    } catch (error) {
      console.error('Error applying exclusion effect:', error);
    }
    
    return () => {
      try {
        Array.from(exclusionElements).forEach((element, index) => {
          if (element instanceof HTMLElement && enterHandlers[index]) {
            element.removeEventListener('mouseenter', enterHandlers[index]);
            element.removeEventListener('mouseleave', leaveHandlers[index]);
          }
        });
      } catch (error) {
        console.error('Error cleaning up exclusion effect:', error);
      }
    };
  }, []);
  
  return null;
}
