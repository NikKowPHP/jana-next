'use client'
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto px-6 max-w-screen-xl py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-medium text-slate-900">
          Yana Kavaliova-Lohvin
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="https://www.instagram.com/sns_nail" className="text-slate-600 hover:text-rose-500 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
            Instagram (@sns_nail)
          </a>
          <a href="https://www.instagram.com/sns_nail_2" className="text-slate-600 hover:text-rose-500 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
            Instagram (@sns_nail_2)
          </a>
          {/* Add more navigation links here in the future */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-slate-600 hover:text-rose-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-6 pt-2 pb-4 space-y-1 sm:px-3">
          <a href="https://www.instagram.com/sns_nail" className="block text-slate-600 hover:text-rose-500 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
            Instagram (@sns_nail)
          </a>
          <a href="https://www.instagram.com/sns_nail_2" className="block text-slate-600 hover:text-rose-500 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
            Instagram (@sns_nail_2)
          </a>
          {/* Add more navigation links here in the future */}
        </div>
      </div>
    </nav>
  );
}
