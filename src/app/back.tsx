'use client';

import React, { useEffect, useRef, useState } from 'react';
import { color } from 'three/tsl';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const GlobeBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadScript = (src: string) =>
      new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });

    const initializeEffect = async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js');

      if (isMounted && vantaRef.current) {
        vantaEffect?.destroy();
        const effectInstance = window.VANTA.GLOBE({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xffffff, // Black background
          color: 0x000000, 
          color2:0x000000,// White globe
          size: 1, // Adjust globe size
        });

        setVantaEffect(effectInstance);
      }
    };

    initializeEffect();

    return () => {
      isMounted = false;
      vantaEffect?.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default GlobeBackground;
