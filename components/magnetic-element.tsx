"use client";

import React from 'react';

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticElement({ children, className = '' }: MagneticElementProps) {
  // Simplified implementation using the data-cursor-stick attribute
  // This uses the built-in functionality of the Mouse Follower library
  return (
    <div 
      data-cursor-stick
      data-cursor="-magnetic"
      className={`cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

interface ImageCursorProps {
  children: React.ReactNode;
  imageUrl: string;
  className?: string;
}

export function ImageCursor({ children, imageUrl, className = '' }: ImageCursorProps) {
  // Simplified implementation using data-cursor-img attribute
  // This uses the built-in functionality of the Mouse Follower library
  return (
    <div 
      data-cursor-img={imageUrl}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}
