import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const textColorClass = isHome ? "text-white" : "text-[#7A1114]";

  return (
    <header className={`absolute top-0 w-full z-50 transition-colors duration-300 ${textColorClass}`}>
      <div className="flex items-center justify-between px-5 md:px-12 py-4">

        <Link
          to="/"
          className="flex items-center gap-3 md:gap-4 cursor-pointer group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center drop-shadow-xl">
            <img
              src="/upminlogo.svg"
              alt="UP Mindanao Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-abhaya text-[11px] md:text-[13.6px] tracking-wide drop-shadow-md opacity-95 leading-none">
              University of the Philippines
            </div>
            <div className="font-abhaya text-xl md:text-3xl tracking-widest drop-shadow-md leading-none mt-0.5">
              MINDANAO
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium drop-shadow-md">
          <Link to="/" className="hover:opacity-75 transition-opacity">
            Home
          </Link>
          <Link to="/about" className="hover:opacity-75 transition-opacity">
            About
          </Link>
          <Link to="/undergraduate" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
            <Search size={16} /> Search
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden drop-shadow-md p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 text-[#7A1114] font-medium z-50">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-3 border-b border-gray-100 text-left hover:text-[#4A0A0C]"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-3 border-b border-gray-100 text-left hover:text-[#4A0A0C]"
          >
            About
          </Link>

          <Link
            to="/undergraduate"
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-3 flex items-center gap-2 text-left hover:text-[#4A0A0C]"
          >
            <Search size={18} /> Search Repository
          </Link>
        </div>
      )}
    </header>
  );
}