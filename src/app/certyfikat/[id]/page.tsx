import { getAllCertificateIds, getCertificateById } from '@/lib/certificates';
import { Certificate } from '@/data/certificates';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Opt-in for static generation
export const dynamic = 'force-static';
export const dynamicParams = false; // Disallow dynamic params not generated at build time

export async function generateStaticParams() {
  const certificates = getAllCertificateIds();
  return certificates.map((cert) => ({
    id: cert.id,
  }));
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const certificate = getCertificateById(params.id);
  if (!certificate) {
    return {
      title: 'Nie znaleziono certyfikatu'
    }
  }
  return {
    title: certificate.title_pl, // Will use template from RootLayout
    description: certificate.description_pl || `Szczegóły certyfikatu: ${certificate.title_pl}`,
  }
}

export default function CertificateDetailPage({ params }: { params: { id: string } }) {
  const certificate: Certificate | undefined = getCertificateById(params.id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center text-apple-blue hover:text-apple-blue-dark transition-colors group text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Powrót do strony głównej
        </Link>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-apple-gray-900 mb-4">{certificate.title_pl}</h2>

      {certificate.description_pl && (
        <p className="text-lg text-apple-gray-600 mb-10">{certificate.description_pl}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-apple-gray-50 p-6 rounded-xl shadow-soft-sm">
          <h3 className="text-xl font-semibold text-apple-gray-800 mb-4">Oryginalny Dokument</h3>
          {certificate.original_file_type === 'image' ? (
            <a href={`/${certificate.original_file_path}`} target="_blank" title="Zobacz oryginalny dokument w pełnym rozmiarze" rel="noopener noreferrer">
              <div className="relative w-full h-auto aspect-[4/3]"> {/* Adjust aspect ratio as needed or make it dynamic */}
                <Image
                  src={`/${certificate.original_file_path}`}
                  alt={`Oryginał - ${certificate.title_pl}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-lg shadow-md border border-apple-gray-200 hover:shadow-lg transition-shadow duration-300 object-contain" // object-contain or object-cover
                />
              </div>
            </a>
          ) : (
            <a href={`/${certificate.original_file_path}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-apple-blue text-white text-sm font-medium rounded-md hover:bg-apple-blue-dark transition-colors">
              Zobacz oryginał (PDF)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        <div className="bg-apple-gray-50 p-6 rounded-xl shadow-soft-sm">
          <h3 className="text-xl font-semibold text-apple-gray-800 mb-4">Tłumaczenie (PL)</h3>
          {certificate.translation_pl ? (
            <div className="prose prose-sm text-apple-gray-700 whitespace-pre-line max-w-none">
              <p>{certificate.translation_pl}</p>
            </div>
          ) : (
            <p className="text-apple-gray-500 italic">Brak dostępnego tłumaczenia.</p>
          )}
        </div>
      </div>
    </div>
  );
}
