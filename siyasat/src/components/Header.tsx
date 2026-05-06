import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import type { ViewState } from "../types";

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export default function Header({ onNavigate, currentView }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = currentView === "home";
  const textColorClass = isHome ? "text-white" : "text-[#7A1114]";

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`absolute top-0 w-full z-50 transition-colors duration-300 ${textColorClass}`}>
      <div className="flex items-center justify-between px-5 md:px-12 py-4">
        
        <div
          className="flex items-center gap-3 md:gap-4 cursor-pointer group"
          onClick={() => handleNavClick("home")}
        >
          <div className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center drop-shadow-xl transition-transform">
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
            <div className="font-abhaya text-xl md:text-3xl tracking-widest drop-shadow-md leading-none mt-0.5 md:mt-0">
              MINDANAO
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium drop-shadow-md">
          <button
            onClick={() => handleNavClick("home")}
            className="hover:opacity-75 transition-opacity"
          >
            Home
          </button>
          <button className="hover:opacity-75 transition-opacity">About</button>
          <button className="flex items-center gap-2 hover:opacity-75 transition-opacity">
            <Search size={16} /> Search
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden drop-shadow-md p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 text-[#7A1114] font-medium z-50">
          <button 
            onClick={() => handleNavClick("home")} 
            className="py-3 border-b border-gray-100 text-left hover:text-[#4A0A0C]"
          >
            Home
          </button>
          <button className="py-3 border-b border-gray-100 text-left hover:text-[#4A0A0C]">
            About
          </button>
          <button className="py-3 flex items-center gap-2 text-left hover:text-[#4A0A0C]">
            <Search size={18} /> Search Repository
          </button>
        </div>
      )}
    </header>
  );
}