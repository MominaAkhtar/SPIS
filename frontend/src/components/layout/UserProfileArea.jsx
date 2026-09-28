import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings, Bell, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function UserProfileArea({
  name = 'Researcher Analyst',
  role = 'Lead Intelligence Analyst',
  email = 'analyst@spis.org',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth?.() || {};

  const displayName = user?.name || name;
  const displayRole = user?.role || role;
  const displayEmail = user?.email || email;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-1 py-1 rounded-lg text-slate-200 hover:text-white transition-colors"
      >
        <Avatar name="RA" size="topbar" />
        <span className="hidden sm:inline text-sm font-normal text-white tracking-normal whitespace-nowrap">
          {displayName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#0D1527] border border-[#223654] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Overview */}
          <div className="p-3.5 border-b border-[#172338] bg-[#0A101D] flex items-center gap-3">
            <Avatar name={displayName} size="md" status="online" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{displayName}</p>
              <p className="text-[10px] text-emerald-400 font-medium truncate">{displayRole}</p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">{displayEmail}</p>
            </div>
          </div>

          {/* Action Links */}
          <div className="p-1.5 space-y-0.5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#162540] rounded-lg transition-colors"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Researcher Profile</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate(ROUTES.ALERTS_PREDICTIONS);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#162540] rounded-lg transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-slate-400" />
              <span>Alert Preferences</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#162540] rounded-lg transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Security & Access</span>
            </button>
          </div>

          {/* Logout */}
          <div className="p-1.5 border-t border-[#172338] bg-[#0A101D]">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
