import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../components/common/Logo';

/**
 * Shared Auth Layout Container
 * Provides pixel-perfect consistency between Login and Sign-Up screens.
 * Eliminates redundant boilerplate (background, branding, card styling, footer, copyright).
 */
export default function AuthLayout({
  title,
  subtitle,
  children,
  footerPrompt,
  footerActionText,
  footerActionTo,
  maxWidth = 'max-w-[440px]',
}) {
  return (
    <div className="min-h-screen w-full bg-[#060B13] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D284]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#00C7FF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top SPIS Brand Mark */}
      <div className="relative z-10 mb-6 flex flex-col items-center">
        <Logo variant="vertical" size="lg" />
      </div>

      {/* Main Authentication Card */}
      <div
        className={`w-full ${maxWidth} relative z-10 bg-[#0D1527] border border-[#172338] rounded-2xl shadow-card p-6 sm:p-8 transition-all duration-200`}
      >
        <div className="text-left mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Body */}
        {children}

        {/* Card Footer Navigation Link */}
        {footerPrompt && footerActionText && footerActionTo && (
          <div className="mt-6 text-center text-xs text-slate-400">
            <span>{footerPrompt} </span>
            <Link
              to={footerActionTo}
              className="text-[#00D284] hover:text-[#20E29B] font-semibold transition-colors underline-offset-4 hover:underline"
            >
              {footerActionText}
            </Link>
          </div>
        )}
      </div>

      {/* Page Copyright Notice */}
      <div className="relative z-10 mt-8 text-center text-[11px] sm:text-xs text-slate-500 font-mono">
        © 2024 SPIS Intelligence. All rights reserved.
      </div>
    </div>
  );
}
