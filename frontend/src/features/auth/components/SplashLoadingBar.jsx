import React from 'react';

/**
 * SplashLoadingBar Component
 * Renders the precision 3-stop linear gradient loading line matching
 * the brand color specification (#00BFA5 linear 3-stop gradient)
 * with animated scanning beam sweep and pulse glow.
 */
export default function SplashLoadingBar({ className = '' }) {
  return (
    <div
      className={`relative w-[196px] h-[2px] flex items-center justify-center select-none ${className}`}
      role="progressbar"
      aria-label="System loading"
    >
      {/* Base 3-stop gradient line (#00BFA5 with fade on both ends) */}
      <div
        className="absolute inset-0 rounded-full spis-loading-line-glow"
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 191, 165, 0.2) 0%, #00BFA5 50%, rgba(0, 191, 165, 0.2) 100%)',
        }}
      />

      {/* Sweeping loading highlight */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div
          className="w-full h-full spis-loading-sweep"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(45, 204, 167, 0.4) 30%, #FFFFFF 50%, rgba(45, 204, 167, 0.4) 70%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
}
