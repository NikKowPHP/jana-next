import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { getCertificateById  } from "@/lib/certificates"
import { ArrowLeft, FileText } from "lucide-react"
import type { Metadata } from "next"

import { certificatesData } from '@/data/certificates';

type Props = {
  params: Promise<{ id: string }>; // params is now a Promise
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams also, if used
};

// Generate static params for all certificate IDs
export async function generateStaticParams() {
  return certificatesData.map((certificate) => ({
    id: certificate.id,
  }));
}

// Dynamic metadata based on the certificate
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const certificate = getCertificateById(resolvedParams.id)

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

export default async function CertificatePage({ params }: Props): Promise<React.ReactElement> {
  const resolvedParams = await params;
  const certificate = getCertificateById(resolvedParams.id)

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
        <div className="pt-[20px] ">

        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-rose-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do strony głównej
        </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certificate Image */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden border border-slate-100">
            {certificate.original_file_type === "image" ? (
              <div className="relative h-[60vh] w-full">
                <Image
                  src={certificate.original_file_path || "/placeholder.svg"}
                  alt={certificate.title_pl}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 h-[60vh]">
                <FileText className="w-16 h-16 text-slate-400 mb-4" />
                <p className="text-slate-600">Ten certyfikat jest dostępny jako plik PDF.</p>
                <a
                  href={certificate.original_file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                >
                  Otwórz PDF
                </a>
              </div>
            )}
          </div>

          {/* Certificate Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden border border-slate-100 p-8">
            <h1 className="text-3xl font-medium text-slate-900 mb-6">{certificate.title_pl}</h1>

            {certificate.description_pl && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-slate-800 mb-2">Opis</h2>
                <p className="text-slate-600">{certificate.description_pl}</p>
              </div>
            )}

            {certificate.translation_pl && (
              <div>
                <h2 className="text-lg font-medium text-slate-800 mb-2">Tłumaczenie</h2>
                <div className="bg-slate-50 rounded-xl p-6 whitespace-pre-line text-slate-600 leading-relaxed">
                  {certificate.translation_pl}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
