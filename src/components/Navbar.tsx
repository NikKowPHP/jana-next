import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto px-6 max-w-screen-xl py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-medium text-slate-900">
          Yana Kavaliova-Lohvin
        </Link>
        <div className="flex items-center space-x-4">
          <a href="https://www.instagram.com/sns_nail" className="text-slate-600 hover:text-rose-500 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
            Instagram (@sns_nail)
          </a>
          <a href="https://www.instagram.com/sns_nail_2" className="text-slate-600 hover:text-rose-500 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
            Instagram (@sns_nail_2)
          </a>
          {/* Add more navigation links here in the future */}
        </div>
      </div>
    </nav>
  );
}
