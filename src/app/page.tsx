import Link from "next/link"
import Image from "next/image"
import { getAllCertificates } from "@/lib/certificates"
import type { Certificate } from "@/data/certificates"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Yana Kavaliova-Lohvin | Strona Główna",
  description: "Przeglądaj certyfikaty Yany Kavaliova-Logvin w dziedzinie manicure i pedicure.",
}

// Opt-in for static generation
export const dynamic = "force-static"

export default function LandingPage() {
  const certificates = getAllCertificates()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto px-6 max-w-screen-xl py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-medium text-slate-900 mb-6 tracking-tight">
            Witaj na mojej stronie!
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Nazywam się Yana Kavaliova-Logvin. Poniżej znajdziesz moje certyfikaty potwierdzające kwalifikacje w
            dziedzinie manicure i pedicure.
          </p>
        </div>

        {/* Certificates Section */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-slate-800">Moje Certyfikaty</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-4"></div>
        </div>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate: Certificate) => (
              <Link
                key={certificate.id}
                href={`/certyfikat/${certificate.id}`}
                className="group block bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out overflow-hidden border border-slate-100"
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={certificate.thumbnail_image_path || "/placeholder.svg"}
                    alt={`Miniatura certyfikatu: ${certificate.title_pl}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-slate-800 group-hover:text-rose-500 transition-colors duration-300 truncate">
                    {certificate.title_pl}
                  </h3>
                  {certificate.description_pl && (
                    <p className="text-slate-500 mt-2 text-sm line-clamp-2">{certificate.description_pl}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 text-center">
            <p className="text-slate-600">Brak dostępnych certyfikatów.</p>
          </div>
        )}
      </div>
    </div>
  )
}
