import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../components/common/Logo';
import { ROUTES } from '../../../constants/routes';

export default function SplashScreen({ onComplete, autoRedirect = true }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (autoRedirect) {
            setTimeout(() => {
              if (onComplete) onComplete();
              else navigate(ROUTES.LOGIN);
            }, 300);
          }
          return 100;
        }
        const step = Math.floor(Math.random() * 20) + 10;
        return Math.min(prev + step, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, [navigate, onComplete, autoRedirect]);

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] flex flex-col items-center justify-between py-12 px-4 select-none relative overflow-hidden">
      {/* Background Cyber Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00BFA5]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Empty top spacer for centering */}
      <div className="h-6" />

      {/* Main Center Content: Logo & Progress */}
      <div className="flex flex-col items-center text-center max-w-sm w-full z-10">
        <Logo variant="vertical" size="xl" showSubtitle={true} />

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72 mt-12 mb-3">
          <div className="w-full h-1 bg-[#152033] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#00BFA5] to-[#00C7FF] transition-all duration-200 rounded-full shadow-[0_0_12px_rgba(0,210,132,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Initializing indicator */}
        <p className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
          Initializing System...
        </p>
      </div>

      {/* Bottom Engine Version */}
      <div className="z-10 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
        Precision Analysis Engine v2.4.0
      </div>
    </div>
  );
}
