'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiLogIn, FiLogOut, FiHome, FiFlag, FiBriefcase, FiMail } from 'react-icons/fi';

// Props for the Header component
interface HeaderProps {
  sidebarExpanded: boolean;
}

// Header component with navigation, login/logout, and smooth scroll
const Header: React.FC<HeaderProps> = ({ sidebarExpanded }) => {
  // State to track admin login status
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Router and pathname for navigation and route detection
  const router = useRouter();
  const pathname = usePathname(); 

  // Fetch current authentication status from API
  const refreshAuth = async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      setIsAdminLoggedIn(res.ok);
    } catch {
      setIsAdminLoggedIn(false);
    }
  };

  // Smooth scroll to footer
  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Set up auth check on mount and listen to 'auth-changed' events
  useEffect(() => {
    refreshAuth();
    const handler = () => refreshAuth();
    window.addEventListener('auth-changed', handler);
    return () => window.removeEventListener('auth-changed', handler);
  }, []);

  // Logout function: delete session and trigger auth refresh
  const handleLogout = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      await fetch('/api/auth', { method: 'DELETE' });
      localStorage.removeItem('sessionId');
    }
    window.dispatchEvent(new Event('auth-changed'));
    router.push('/');
  };

  // Show logout button only if admin is logged in and on dashboard routes
  const showLogout = isAdminLoggedIn && pathname.startsWith('/dashboard');

  return (
    <header
      className={`bg-gray-100/90 backdrop-blur-lg p-1 sm:p-2 flex items-center justify-between gap-2 sm:gap-4 border-b border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)]
      rounded-lg sm:rounded-xl fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50
      w-[calc(100%-2rem)] md:${sidebarExpanded ? 'w-2/3' : 'w-4/5'} transition-all duration-300`}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-2 flex-shrink-0 font-bold text-black text-sm sm:text-lg">
        <Link href="/">V I S I O Nx.</Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex justify-center gap-1 sm:gap-3 font-medium">
        {/* Home Link */}
        <Link
          href="/"
          className="group bg-gray-200/50 shadow-sm rounded-full px-1 sm:px-3 py-1 flex items-center gap-1.5 transition-colors duration-200 text-gray-700 hover:bg-gray-300/50"
        >
          <span className="hidden sm:inline">Home</span>
          <div className="bg-white/70 rounded-full p-1"><FiHome className="w-4 h-4" /></div>
        </Link>

        {/* Articles Link with smooth scroll if on homepage */}
        <Link
          href="/#sections"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              const section = document.getElementById("sections");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="group bg-gray-200/50 shadow-sm rounded-full px-1 sm:px-3 py-1 flex items-center gap-1.5 transition-colors duration-200 text-gray-700 hover:bg-gray-300/50"
        >
          <span className="hidden sm:inline">Articles</span>
          <div className="bg-white/70 rounded-full p-1"><FiFlag className="w-4 h-4" /></div>
        </Link>

        {/* Coming soon / Projects Link */}
        <Link
          href="/#projects"
          className="group bg-gray-200/50 shadow-sm rounded-full px-1 sm:px-3 py-1 flex items-center gap-1.5 transition-colors duration-200 text-gray-700 hover:bg-gray-300/50"
        >
          <span className="hidden sm:inline">Coming soon</span>
          <div className="bg-white/70 rounded-full p-1"><FiBriefcase className="w-4 h-4" /></div>
        </Link>

        {/* Contact Us Link - scrolls to footer */}
        <Link
          href="#"
          onClick={(e) => { 
            e.preventDefault(); 
            const footer = document.getElementById("footer");
            if (footer) footer.scrollIntoView({ behavior: "smooth" });
          }}
          className="group bg-gray-200/50 shadow-sm rounded-full px-1 sm:px-3 py-1 flex items-center gap-1.5 transition-colors duration-200 text-gray-700 hover:bg-gray-300/50"
        >
          <span className="hidden sm:inline">Contact Us</span>
          <div className="bg-white/70 rounded-full p-1"><FiMail className="w-4 h-4" /></div>
        </Link>
      </nav>

      {/* Login / Logout Buttons */}
      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        {showLogout ? (
          // Logout button for admins on dashboard
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100 font-medium transition-colors duration-300"
          >
            <FiLogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        ) : (
          // Login button
          <Link
            href="/login"
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium transition-colors duration-300"
          >
            <FiLogIn className="w-4 h-4" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
