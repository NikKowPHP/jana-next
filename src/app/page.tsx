'use client'

import Link from "next/link"
import Image from "next/image"
import { getAllCertificates } from "@/lib/certificates"
import type { Certificate } from "@/data/certificates"
import { motion } from "framer-motion"

// Opt-in for static generation
export const dynamic = "force-static"

export default function LandingPage() {
  const certificates = getAllCertificates()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <motion.div
        className="mx-auto px-6 max-w-screen-xl py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16 pt-10" variants={itemVariants}>
          <Image
            src="/personal_photos/Screenshot_4.png"
            alt="Personal Photo"
            width={100}
            height={100}
            className="mx-auto rounded-full mb-4"
          />
          <h1 className="text-4xl sm:text-5xl font-medium text-slate-900 mb-6 tracking-tight">
            Witaj na mojej stronie!
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Nazywam się Yana Kavaliova-Lohvin. Poniżej znajdziesz moje certyfikaty potwierdzające kwalifikacje w
            dziedzinie manicure i pedicure.
          </p>
        </motion.div>

        {/* Certificates Section */}
        <motion.div variants={itemVariants}>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-medium text-slate-800">Moje Certyfikaty (z tlumaczeniem) </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-4"></div>
          </div>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((certificate: Certificate) => (
                <motion.div key={certificate.id} variants={itemVariants}>
                  <Link
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
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 text-center" variants={itemVariants}>
              <p className="text-slate-600">Brak dostępnych certyfikatów.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Personal Photos Section */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-medium text-slate-800">Moje Zdjęcia</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {["/personal_photos/Screenshot_4.png", "/personal_photos/Screenshot_5.png", "/personal_photos/Screenshot_6.png"].map((photoPath) => (
              <motion.div key={photoPath} variants={itemVariants}>
                <div className="group block bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out overflow-hidden border border-slate-100">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                    <Image
                      src={photoPath}
                      alt={`Personal photo`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Experience Section */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Doświadczenie zawodowe</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-800">Stylistka Paznokci/Pedicure</h3>
              <p className="text-slate-600">Maj 2024 - Kwie 2025</p>
              <p className="text-slate-500">milfey_minsk, Minsk, Belarus</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800">Stylistka Paznokci/Pedicure</h3>
              <p className="text-slate-600">Lis 2023 - Maj 2024</p>
              <p className="text-slate-500">D.E.V.Beauty_studio, Minsk, Belarus</p>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Umiejętności</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8">
            <p className="text-slate-600 mb-4">Paznokcie są jak kropka na końcu zdania. Dopełniają całość wyglądu.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-2">Manicure</h4>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Manicure hybrydowy</li>
                  <li>Utwardzenie żelem</li>
                  <li>Manicure klasyczny</li>
                  <li>manicure bezcążkowy</li>
                  <li>Design</li>
                  <li>hybryda kolor</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-2">Pedicure</h4>
                <ul className="list-disc list-inside text-slate-600">
                  <li>SMART pedicure</li>
                  <li>Pedi frezarkowy</li>
                </ul>
              </div>
             
            </div>
          </div>
        </motion.div>

        {/* Education and Certificates Section */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Wykształcenie i Certyfikaty</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">KIRSANOVA</h3>
                <p className="text-slate-600">Atraumatyczny Manicure</p>
                <p className="text-slate-500">Sty 2025</p>
                <a href="#" className="text-rose-500 hover:underline">Certyfikat link</a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">KIRSANOVA</h3>
                <p className="text-slate-600">Karta Licencyjna SMART Pedicure</p>
                <p className="text-slate-500">Lut 2024</p>
                <a href="#" className="text-rose-500 hover:underline">Certyfikat link</a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">KIRSANOVA</h3>
                <p className="text-slate-600">Estetyka w Peducure</p>
                <p className="text-slate-500">Lut 2024</p>
                <a href="#" className="text-rose-500 hover:underline">Certyfikat link</a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">KIRSANOVA</h3>
                <p className="text-slate-600">Aparatowy Manicure + Wzmacnianie Żelem Bez Opilowania</p>
                <p className="text-slate-500">Lut 2024</p>
                <a href="#" className="text-rose-500 hover:underline">Certyfikat link</a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">KIRSANOVA</h3>
                <p className="text-slate-600">Kombinowany Manicure</p>
                <p className="text-slate-500">Paz 2023</p>
                <a href="#" className="text-rose-500 hover:underline">Certyfikat link</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional Summary Section */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Podsumowanie zawodowe</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8">
            <p className="text-slate-600">
              Doświadczona Stylistka Paznokci i Pedicure z ponad 1.5 roku doświadczenia zawodowego, zdobytego w Mińsku. Specjalizuję się w manicure (hybrydowy, klasyczny, utwardzanie żelem) oraz pedicure (frezarkowy, SMART), w tym zaawansowanych technikach zdobień. Posiadam liczne certyfikaty potwierdzające kwalifikacje (m.in. KIRSANOVA). Obecnie mieszkam w Krakowie i poszukuję nowych wyzwań zawodowych. Moje prace dostępne są online (portfolio link/Instagram).
            </p>
          </div>
        </motion.div>

        {/* Latest Work Examples Section */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Najnowsze Przykłady Prac</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Work Examples */}
              {[
                "/work_examples/Screenshot_7.png",
                "/work_examples/Screenshot_8.png",
                "/work_examples/Screenshot_9.png",
                "/work_examples/Screenshot_10.png",
                "/work_examples/Screenshot_11.png",
                "/work_examples/Screenshot_12.png",
                "/work_examples/Screenshot_13.png",
                "/work_examples/Screenshot_14.png",
                "/work_examples/Screenshot_15.png",
                "/work_examples/Screenshot_16.png",
              ].map((imagePath) => (
                <motion.div key={imagePath} variants={itemVariants}>
                  <div className="group block bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out overflow-hidden border border-slate-100">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                      <Image
                        src={imagePath}
                        alt={`Work example`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Socials Section */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Socials</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8">
            <ul className="list-disc list-inside text-slate-600">
              <li>Instagram: <a href="https://www.instagram.com/sns_nail_2" className="text-rose-500 hover:underline" target="_blank" rel="noopener noreferrer">@sns_nail_2</a></li>
              <li>Instagram: <a href="https://www.instagram.com/sns_nail" className="text-rose-500 hover:underline" target="_blank" rel="noopener noreferrer">@sns_nail</a></li>
            </ul>
          </div>
        </motion.div>

        

        {/* Languages Section */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Languages</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8">
            <ul className="list-disc list-inside text-slate-600">
              <li>Russian: Native</li>
              <li>Polish: A2</li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div className="mb-8 mt-16" variants={itemVariants}>
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Kontakt</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8">
            <p className="text-slate-600">Email: <a href="mailto:nik.kow@outlook.com" className="text-rose-500 hover:underline">nik.kow@outlook.com</a></p>
            <p className="text-slate-600">Phone: +48 506 838 243</p>
            <p className="text-slate-600">Address: Krakow, Polska</p>
          </div>
        </motion.div>

       
      </motion.div>
    </div>
  )
}
