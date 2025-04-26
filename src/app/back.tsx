'use client';

import React, { useEffect, useRef, useState } from 'react';

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
    let effectInstance: any = null; // local variable for the effect instance

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
        if (effectInstance) effectInstance.destroy();

        effectInstance = window.VANTA.GLOBE({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xffffff,
          color: 0x000000,
          color2: 0x000000,
          size: 1,
        });

        setVantaEffect(effectInstance);
      }
    };

    initializeEffect();

    const handleResize = () => {
      if (effectInstance) {
        effectInstance.resize(); // <-- properly call resize
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      if (effectInstance) effectInstance.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        opacity: 0.5,
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default GlobeBackground;
