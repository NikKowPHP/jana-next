import Link from 'next/link';
import Image from 'next/image';
import { getAllCertificates } from '@/lib/certificates'; // Adjust path if needed
import { Certificate } from '@/data/certificates';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strona Główna', // Will be "Strona Główna - Yana Kavaliova-Logvin"
  description: 'Przeglądaj certyfikaty Yany Kavaliova-Logvin w dziedzinie manicure i pedicure.',
};

// Opt-in for static generation
export const dynamic = 'force-static';

export default function LandingPage() {
  const certificates = getAllCertificates();

  return (
    <div className="mx-auto px-4 max-w-screen-xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">Witaj na mojej stronie!</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Nazywam się Yana Kavaliova-Logvin. Poniżej znajdziesz moje certyfikaty potwierdzające kwalifikacje w dziedzinie manicure i pedicure.
        </p>
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center sm:text-left">Moje Certyfikaty</h2>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((certificate: Certificate) => (
            <Link key={certificate.id} href={`/certyfikat/${certificate.id}`} className="group block bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden">
              <div className="aspect-w-4 aspect-h-3 relative"> {/* Added relative for Next/Image */}
                <Image
                  src={`${certificate.thumbnail_image_path}`}
                  alt={`Miniatura certyfikatu: ${certificate.title_pl}`}
                  fill // Use fill for responsive images in a sized container
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate">{certificate.title_pl}</h3>
                {certificate.description_pl && (
                  <p className="text-gray-500 mt-2 line-clamp-2">{certificate.description_pl}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">Brak dostępnych certyfikatów.</p>
      )}
    </div>
  );
}
