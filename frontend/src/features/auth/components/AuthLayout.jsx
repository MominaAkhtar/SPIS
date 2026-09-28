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
    <div className="min-h-screen w-full bg-[#0B0F19] flex flex-col items-center justify-center p-4 pb-20 sm:p-6 sm:pb-24 relative overflow-hidden select-none">
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00BFA5]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#00C7FF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top SPIS Brand Mark */}
      {/* Top SPIS Brand Mark */}
<div className="relative z-10 mb-6 flex flex-col items-center text-center">
  {/* Logo + wordmark */}
  <div className="flex items-center gap-3">
    <Logo
      size={36}
      className="shrink-0 drop-shadow-[0_8px_10px_rgba(0,191,165,0.45)]"
    />
    <span className="text-2xl font-bold text-white tracking-tight leading-none">
      SPIS
    </span>
  </div>

  {/* System name */}
  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00BFA5]">
    Societal Polarization Intelligence System
  </p>

  {/* Tagline (smaller than the system name, tighter spacing) */}
  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#94A3B8]">
    Analyze. Understand. Bridge the Divide.
  </p>
</div>

      {/* Main Authentication Card */}
      <div
        className={`w-full ${maxWidth} relative z-10 bg-[#111827] border border-[#1B2638] rounded-lg shadow-card p-6 sm:p-7 transition-all duration-200`}
      >
        <div className="text-left mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-0.5">
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
              className="text-[#00BFA5] hover:text-[#2DCCA7] font-normal transition-colors underline-offset-4 hover:underline"
            >
              {footerActionText}
            </Link>
          </div>
        )}
      </div>

      {/* Page Copyright Notice */}
      <div className="relative z-10 mt-8 text-center text-[11px] text-white font-sans tracking-wide">
        © 2024 SPIS Intelligence. All rights reserved.
      </div>
    </div>
  );
}