import Image from "next/image"
import Link from "next/link"
import { getCertificateById, getAllCertificateIds } from "@/lib/certificates"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

// Generate static params for all certificate IDs
export async function generateStaticParams() {
  const certificateIds = getAllCertificateIds()
  return certificateIds.map((id) => ({ id }))
}

// Dynamic metadata based on the certificate
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const certificate = getCertificateById(params.id)

  if (!certificate) {
    return {
      title: "Certyfikat nie znaleziony",
    }
  }

  return {
    title: certificate.title_pl,
    description: certificate.description_pl || "Szczegóły certyfikatu",
  }
}

export default function CertificatePage({ params }: { params: { id: string } }) {
  const certificate = getCertificateById(params.id)

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-medium text-slate-800 mb-4">Certyfikat nie znaleziony</h1>
          <p className="text-slate-600 mb-6">Przepraszamy, nie mogliśmy znaleźć certyfikatu o podanym ID.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Powrót do strony głównej
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto px-6 max-w-screen-xl py-16">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-rose-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do strony głównej
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden border border-slate-100">
          <div className="relative h-[40vh] sm:h-[50vh] w-full">
            <Image
              src={certificate.image_path || "/placeholder.svg"}
              alt={certificate.title_pl}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-medium text-slate-900 mb-4">{certificate.title_pl}</h1>

            {certificate.description_pl && (
              <p className="text-slate-600 mb-6 leading-relaxed">{certificate.description_pl}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              {certificate.date && (
                <div>
                  <h2 className="font-medium text-slate-800 mb-1">Data wydania</h2>
                  <p className="text-slate-600">{certificate.date}</p>
                </div>
              )}

              {certificate.issuer && (
                <div>
                  <h2 className="font-medium text-slate-800 mb-1">Wydawca</h2>
                  <p className="text-slate-600">{certificate.issuer}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
