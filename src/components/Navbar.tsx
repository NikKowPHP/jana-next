'use client'
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (sectionLink) => {
    setIsOpen(!isOpen);
    // Scroll to the section smoothly
    const section = document.querySelector(sectionLink);
    // add a timeout to allow the menu to close before scrolling
    setTimeout(() => {
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' , block: 'start' });
      }
    }
    , 300);
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
        <Link href="/" className="text-xl font-handwriting text-gray-700 flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-2 rounded-full"/>
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
          <motion.a
            href="#certificates"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Certyfikaty
          </motion.a>
          <motion.a
            href="#personal-photos"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Moje Zdjęcia
          </motion.a>
          <motion.a
            href="#professional-experience"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Doświadczenie zawodowe
          </motion.a>
          <motion.a
            href="#skills"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Umiejętności
          </motion.a>
          <motion.a
            href="#education-and-certificates"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Wykształcenie i Certyfikaty
          </motion.a>
          <motion.a
            href="#professional-summary"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Podsumowanie zawodowe
          </motion.a>
          <motion.a
            href="#latest-work-examples"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Przykłady Prac
          </motion.a>
          <motion.a
            href="#socials"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Socials
          </motion.a>
          <motion.a
            href="#languages"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Languages
          </motion.a>
          <motion.a
            href="#contact"
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Kontakt
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
        <div className="px-4 py-3 space-y-2">
          <motion.a
            href="https://www.instagram.com/sns_nail"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            target="_blank"
            onClick={() => toggleMenu('https://www.instagram.com/sns_nail')}
            rel="noopener noreferrer"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Instagram (@sns_nail)
          </motion.a>
          <motion.a
            href="https://www.instagram.com/sns_nail_2"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            target="_blank"
            onClick={() => toggleMenu('https://www.instagram.com/sns_nail_2')}
            rel="noopener noreferrer"
            variants={linkVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Instagram (@sns_nail_2)
          </motion.a>
          <motion.a
            href="#certificates"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#certificates')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Certyfikaty
          </motion.a>
          <motion.a
            href="#personal-photos"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#personal-photos')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Moje Zdjęcia
          </motion.a>
          <motion.a
            href="#professional-experience"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#professional-experience')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Doświadczenie zawodowe
          </motion.a>
          <motion.a
            href="#skills"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#skills')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Umiejętności
          </motion.a>
          <motion.a
            href="#education-and-certificates"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#education-and-certificates')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Wykształcenie i Certyfikaty
          </motion.a>
          <motion.a
            href="#professional-summary"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#professional-summary')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Podsumowanie zawodowe
          </motion.a>
          <motion.a
            href="#latest-work-examples"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#latest-work-examples')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Przykłady Prac
          </motion.a>
          <motion.a
            href="#socials"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#socials')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Socials
          </motion.a>
          <motion.a
            href="#languages"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#languages')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Languages
          </motion.a>
          <motion.a
            href="#contact"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-300"
            variants={linkVariants}
            onClick={() => toggleMenu('#contact')}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Kontakt
          </motion.a>
          {/* Add more navigation links here in the future */}
        </div>
      </motion.div>
    </nav>
  );
}
