import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../components/common/Logo';
import SplashLoadingBar from '../components/SplashLoadingBar';
import { ROUTES } from '../../../constants/routes';

/**
 * SPIS Splash Screen
 * Exact reproduction of the official SPIS splash screen visual reference:
 * - Solid dark background: #0B0F19
 * - Centered SPIS compass logo with smooth animated rotating needle
 * - White SPIS title
 * - Two-line subtitle:
 *     - "SOCIETAL POLARIZATION" in #00BFA5
 *     - "INTELLIGENCE SYSTEM" in #94A3B8
 * - Animated 3-stop linear gradient loading line with sweep
 * - "INITIALIZING SYSTEM..." in #616161
 * - "PRECISION ANALYSIS ENGINE V2.4.0" at the bottom in #616161
 */
export default function SplashScreen({ autoRedirect = false, redirectDelay = 4000 }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setTimeout(() => {
      navigate(ROUTES.TOPIC_MONITORING);
    }, redirectDelay);

    return () => clearTimeout(timer);
  }, [autoRedirect, redirectDelay, navigate]);

  return (
    <main
      onClick={() => navigate(ROUTES.TOPIC_MONITORING)}
      className="min-h-screen w-full bg-[#0B0F19] text-white flex flex-col items-center justify-center relative select-none overflow-hidden cursor-pointer"
      role="main"
      aria-label="SPIS Splash Screen"
    >
      {/* Centered Brand & Initializing Block */}
      <section className="flex flex-col items-center text-center -mt-4">
        {/* Centered SPIS Compass Logo with animated rotating needle */}
        <div className="flex items-center justify-center">
          <Logo size={84} animated={true} tileRadius={16} />
        </div>

        {/* Title */}
        <h1 className="text-[34px] font-bold text-white tracking-[0.02em] leading-none mt-6 font-sans">
          SPIS
        </h1>

        {/* Subtitle */}
        <div className="flex flex-col items-center text-center mt-2.5">
          <span className="text-[11px] font-semibold text-[#00BFA5] tracking-[0.24em] uppercase leading-none">
            SOCIETAL POLARIZATION
          </span>
          <span className="text-[10px] font-medium text-[#94A3B8] tracking-[0.22em] uppercase leading-none mt-1.5">
            INTELLIGENCE SYSTEM
          </span>
        </div>

        {/* Animated Loading Line */}
        <div className="mt-8 flex items-center justify-center">
          <SplashLoadingBar />
        </div>

        {/* Initializing Status */}
        <div className="mt-[18px]">
          <span className="text-[11px] font-medium text-[#616161] tracking-[0.26em] uppercase">
            INITIALIZING SYSTEM...
          </span>
        </div>
      </section>

      {/* Bottom Precision Engine Version Tag */}
      <footer className="absolute bottom-11 left-0 right-0 flex justify-center text-center pointer-events-none">
        <span className="text-[10px] font-medium text-[#616161] tracking-[0.25em] uppercase">
          PRECISION ANALYSIS ENGINE V2.4.0
        </span>
      </footer>
    </main>
  );
}
