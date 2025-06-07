"use client";

import React, { useRef } from 'react';
import { useMouseFollowerState, useMouseFollowerText } from '@/hooks/use-mouse-follower';
import { MagneticElement, ImageCursor } from './magnetic-element';

export function MouseFollowerDemo() {  const inverseRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skewRef = useRef<HTMLDivElement>(null);
  
  // Apply different cursor states when hovering over elements
  useMouseFollowerState(inverseRef as React.RefObject<HTMLElement>, '-inverse');
  useMouseFollowerText(textRef as React.RefObject<HTMLElement>, 'Hover effect!');
  useMouseFollowerState(skewRef as React.RefObject<HTMLElement>, '-active');
  
  return (
    <div className="flex flex-col gap-6 items-center p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold">Mouse Follower Demo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div 
          ref={inverseRef}
          className="bg-slate-800 text-white p-6 rounded-lg cursor-pointer text-center"
        >
          Hover to invert cursor
        </div>
        
        <div 
          ref={textRef}
          className="bg-slate-100 p-6 rounded-lg cursor-pointer text-center"
        >
          Hover to show text on cursor
        </div>
        
        <div 
          ref={skewRef}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg cursor-pointer text-center"
        >
          Hover to activate skew effect
        </div>
        
        <a 
          href="#"
          className="pointer bg-emerald-600 text-white p-6 rounded-lg text-center"
        >
          Link element (pointer state)
        </a>
      </div>
      
      <h2 className="text-xl font-semibold mt-8">Advanced Effects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <MagneticElement className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg text-center">
          Magnetic effect - cursor sticks to this element
        </MagneticElement>
        
        <ImageCursor 
          imageUrl="https://picsum.photos/200/200"
          className="bg-slate-200 p-6 rounded-lg text-center"
        >
          Hover to show image in cursor
        </ImageCursor>
        
        <div 
          data-cursor-img="https://picsum.photos/id/237/200/200"
          className="bg-slate-700 text-white p-6 rounded-lg cursor-pointer text-center"
        >
          Using data-attribute for image
        </div>
        
        <div 
          data-cursor="-exclusion"
          className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg cursor-pointer text-center"
        >
          Exclusion blend mode effect
        </div>
      </div>
    </div>
  );
}
