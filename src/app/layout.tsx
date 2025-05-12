import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

// Load Inter font with specific subsets
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "%s - Yana Kavaliova-Logvin",
    default: "Yana Kavaliova-Logvin",
  },
  description: "Profesjonalne usługi manicure i pedicure - Yana Kavaliova-Logvin",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${inter.variable}`}>
      <body className="font-sans antialiased">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  )
}
