"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the CustomMouseFollower component to avoid SSR issues
const CustomMouseFollowerNoSSR = dynamic(
  () => import('./mouse-follower-fixed'),
  { ssr: false }
);

// Dynamically import cursor effects
const GlobalCursorEffectsNoSSR = dynamic(
  () => import('./cursor-effects-new').then(mod => mod.GlobalCursorEffects),
  { ssr: false }
);

const CursorExclusionEffectNoSSR = dynamic(
  () => import('./cursor-effects-new').then(mod => mod.CursorExclusionEffect),
  { ssr: false }
);

function MouseFollowerProvider({ children }: { children: React.ReactNode }) {
  // Using state to ensure effects only mount on client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <>
          <CustomMouseFollowerNoSSR />
          <GlobalCursorEffectsNoSSR />
          <CursorExclusionEffectNoSSR />
        </>
      )}
      {children}
    </>
  );
}

// Export the component as both a named export and default export
export { MouseFollowerProvider };
export default MouseFollowerProvider;
