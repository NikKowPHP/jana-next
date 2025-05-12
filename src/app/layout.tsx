import type { Metadata } from "next";
import Header from '@/components/Header' // Import Header
import Footer from '@/components/Footer' // Import Footer
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Yana Kavaliova-Logvin - Certyfikaty',
    template: '%s - Yana Kavaliova-Logvin',
  },
  description: 'Portfolio certyfikatów Yany Kavaliova-Logvin w dziedzinie manicure i pedicure.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-apple-gray-100 text-apple-gray-800 min-h-screen flex flex-col`}
      >
        <Header /> {/* Add Header */}
        <main className="flex-grow container mx-auto mt-8 mb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-soft-lg rounded-2xl p-6 sm:p-10">
            {children}
          </div>
        </main>
        <Footer /> {/* Add Footer */}
      </body>
    </html>
  );
}
