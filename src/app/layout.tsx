'use client';

import React from 'react';
import AnimatedCursor from 'react-animated-cursor';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>  <link rel="icon" href="/favicon.png" type="image/png" /></head>
      <body>
      <AnimatedCursor
      innerSize={0}
      outerSize={40}
      outerAlpha={0}
      innerScale={0.7}
      outerScale={3}
      trailingSpeed={5}
      clickables={['a', 'button']}
      innerStyle={{ backgroundColor: 'transparent' }}
      outerStyle={{ backgroundColor: 'transparent' }}
    >
  <span style={{ fontSize: '24px' }}>✏️</span>
</AnimatedCursor>
        {children}
      </body>
    </html>
  );
}
