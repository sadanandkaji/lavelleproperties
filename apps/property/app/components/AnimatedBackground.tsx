'use client';

import React from 'react';

const AnimatedBackground: React.FC = () => {
  // We use darkened gold (#a6843d) to make sure it's visible on the #fdfbf0 background
  const distantTowers = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Cpath d='M0 200V80h10v-10h4v10h16v-40h8v-10h4v10h20v60h10v100M120 200V20h12v-10h4v10h16v200M240 200V60h24v-10h8v10h20v200M400 200V10h10V0h4v10h20v200M600 200V80h30v200' fill='%23a6843d'/%3E%3C/svg%3E")`;
  const midSkyline = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Cpath d='M0 200V120h20v-10h10v10h20v100M100 200V80h24v200M160 200V140h16v-10h8v10h16v100M260 200V40h30v200M360 200V100h40v200M480 200V60h20v200M600 200V120h40v200M720 200V90h30v200' fill='%23a6843d'/%3E%3C/svg%3E")`;
  const foregroundCity = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Cpath d='M0 200V160h30v-10h5v10h30v100M100 200V120h35v200M180 200V150h20v-5h10v5h20v100M280 200V80h40v200M380 200V140h50v200M480 200V40h40v200M600 200V120h60v200' fill='%23a6843d'/%3E%3C/svg%3E")`;

  return (
    <>
      <style jsx global>{`
        @keyframes moveBackground {
          from { background-position: 0 bottom; }
          to { background-position: -1600px bottom; }
        }
        .parallax-slow { animation: moveBackground 150s linear infinite; }
        .parallax-mid { animation: moveBackground 100s linear infinite; }
        .parallax-fast { animation: moveBackground 60s linear infinite; }
        
        .bg-grid-gold {
          background-image: 
            linear-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197, 160, 89, 0.15) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

      <div className="fixed inset-0 z-[-1] h-screen w-screen overflow-hidden bg-[#fdfbf0]">
        
        {/* Layer 1: Distant Towers (Slowest) */}
        <div 
          className="parallax-slow absolute inset-0 bottom-0 opacity-10 bg-repeat-x bg-bottom" 
          style={{ 
            backgroundImage: distantTowers, 
            backgroundSize: '1600px 60vh',
            height: '60vh',
            top: '40vh'
          }} 
        />

        {/* Layer 2: Mid Skyline */}
        <div 
          className="parallax-mid absolute inset-0 bottom-0 opacity-20 bg-repeat-x bg-bottom" 
          style={{ 
            backgroundImage: midSkyline, 
            backgroundSize: '1200px 40vh',
            height: '40vh',
            top: '60vh'
          }} 
        />

        {/* Layer 3: Foreground Buildings (Fastest) */}
        <div 
          className="parallax-fast absolute inset-0 bottom-0 opacity-30 bg-repeat-x bg-bottom" 
          style={{ 
            backgroundImage: foregroundCity, 
            backgroundSize: '800px 30vh',
            height: '30vh',
            top: '70vh'
          }} 
        />

        {/* Layer 4: Blueprint Grid Overlay */}
        <div className="bg-grid-gold absolute inset-0 z-[5] opacity-20 pointer-events-none" />
      </div>
    </>
  );
};

export default AnimatedBackground;