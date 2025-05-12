'use client'
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  const menuVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto px-6 max-w-screen-xl py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-medium text-slate-900">
          Yana Kavaliova-Lohvin
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.a
            href="https://www.instagram.com/sns_nail"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Instagram (@sns_nail)
          </motion.a>
          <motion.a
            href="https://www.instagram.com/sns_nail_2"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Instagram (@sns_nail_2)
          </motion.a>
          {/* Add more navigation links here in the future */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMenu}
            className="text-slate-600 hover:text-rose-500 focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                initial={false}
                animate={{ d: isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" }}
                transition={{ duration: 0.2 }}
              ></motion.path>
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 pt-2 pb-4 space-y-1 sm:px-3">
          <motion.a
            href="https://www.instagram.com/sns_nail"
            className="block text-slate-600 hover:text-rose-500 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Instagram (@sns_nail)
          </motion.a>
          <motion.a
            href="https://www.instagram.com/sns_nail_2"
            className="block text-slate-600 hover:text-rose-500 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Instagram (@sns_nail_2)
          </motion.a>
          {/* Add more navigation links here in the future */}
        </div>
      </motion.div>
    </nav>
  );
}
