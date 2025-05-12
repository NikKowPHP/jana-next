import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-soft-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-apple-gray-900 hover:text-apple-blue transition-colors">
              Yana Kavaliova-Logvin
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-apple-gray-600 hover:text-apple-blue px-3 py-2 rounded-md text-sm font-medium">
              Certyfikaty
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
