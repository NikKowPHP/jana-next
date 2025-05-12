Okay, here's a comprehensive `todo.md` list for migrating the entire Laravel application to Next.js, designed to be friendly for an AI like @cline to implement.

```markdown
# Project: Yana Kavaliova-Logvin - Personal Portfolio (Next.js Migration)

**Project Description:** Migrate the existing Laravel-based personal portfolio website for Yana Kavaliova-Logvin to a Next.js application. The site showcases manicure and pedicure certificates, displaying original certificate images and their Polish translations. Each certificate will have its own dedicated page, shareable via a unique URL. The MVP will replicate the functionality of the Laravel site using Next.js, focusing on static site generation (SSG) for performance. The website will remain in Polish.

**Source Tech Stack (to be replaced):**
*   Backend: Laravel (PHP)
*   Frontend: Blade Templates, Tailwind CSS
*   Database: None (hardcoded data in `certificates.php`)

**Target Tech Stack:**
*   Framework: Next.js (React)
*   Styling: Tailwind CSS
*   Data: JSON file (migrated from PHP config)
*   Deployment: Static Export or Vercel/Netlify (initially local Next.js dev server)

**AI Implementation Notes:** This plan is designed for an AI (@cline) to implement. Steps should be clear, atomic, and verifiable. The migration will prioritize using Next.js App Router conventions.

---

## Phase 1: Next.js Project Setup & Initial Configuration

*   [ ] **1.1. Initialize Next.js Project:**
    *   [ ] Create a new Next.js application using the App Router: `npx create-next-app@latest yana-portfolio-nextjs --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"`
    *   [ ] Navigate into the project directory: `cd yana-portfolio-nextjs`
    *   [ ] Verify the Next.js development server starts: `npm run dev`.
    *   [ ] Confirm the default Next.js page is accessible in the browser.
*   [ ] **1.2. Configure Tailwind CSS:**
    *   [ ] Tailwind CSS should be pre-configured by `create-next-app`. Verify `tailwind.config.ts` and `postcss.config.js` (or `postcss.config.mjs`) exist.
    *   [ ] **Port Tailwind Theme Customizations:**
        *   [ ] Open the Laravel project's `tailwind.config.js`.
        *   [ ] Copy the `theme.extend` configurations (fontFamily, colors, borderRadius, boxShadow) into the Next.js project's `tailwind.config.ts`.
            *   Example for `tailwind.config.ts`:
                ```typescript
                import type { Config } from 'tailwindcss'

                const config: Config = {
                  content: [
                    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
                    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
                    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
                  ],
                  theme: {
                    extend: {
                      fontFamily: {
                        sans: ['-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"], // Keep existing Tailwind default sans and prepend apple system fonts
                      },
                      colors: {
                        'apple-gray': {
                          50: '#f9fafb',
                          100: '#f3f4f6',
                          200: '#e5e7eb',
                          300: '#d1d5db',
                          400: '#9ca3af',
                          500: '#6b7280',
                          600: '#4b5563',
                          700: '#374151',
                          800: '#1f2937',
                          900: '#111827',
                        },
                        'apple-blue': {
                          light: '#3b82f6',
                          DEFAULT: '#007aff',
                          dark: '#0056b3',
                        },
                        action: '#007aff',
                      },
                      borderRadius: {
                        'xl': '0.75rem',
                        '2xl': '1rem',
                        '3xl': '1.5rem',
                      },
                      boxShadow: {
                        'soft-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
                        'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                      }
                    },
                  },
                  plugins: [],
                }
                export default config
                ```
    *   [ ] Update `src/app/globals.css`:
        *   [ ] Ensure it contains `@tailwind base; @tailwind components; @tailwind utilities;`.
        *   [ ] Copy any custom CSS from Laravel's `resources/css/app.css` (e.g., body font smoothing) into `src/app/globals.css`.
            ```css
            @tailwind base;
            @tailwind components;
            @tailwind utilities;

            body {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            ```
    *   [ ] Verify Tailwind styles are applied correctly by modifying `src/app/page.tsx` with some custom theme classes.

## Phase 2: Data Porting and Management

*   [ ] **2.1. Convert Certificate Data to JSON:**
    *   [ ] Create a directory `src/data`.
    *   [ ] Create a file `src/data/certificates.ts`.
    *   [ ] Manually convert the array from the Laravel project's `config/certificates.php` into a TypeScript array/object export.
        *   Ensure all fields are present: `id`, `title_pl`, `description_pl`, `original_file_path`, `original_file_type`, `thumbnail_image_path`, `translation_pl`.
        *   The `translated_file_path` and `translated_file_type` fields from the original `todo.md` were not in the final `config/certificates.php`. The `translation_pl` field contains the text directly. This is fine.
        *   Paths for images/PDFs will need to be updated in Phase 6 to reflect Next.js public directory structure (e.g., from `assets/certificates/originals/` to `/certificates/originals/`). For now, keep them as in the PHP config.
        *   Example structure for `src/data/certificates.ts`:
            ```typescript
            export interface Certificate {
              id: string;
              title_pl: string;
              description_pl?: string; // Mark as optional if some don't have it
              original_file_path: string;
              original_file_type: 'image' | 'pdf'; // Assuming only these two types
              thumbnail_image_path: string;
              translation_pl?: string; // Mark as optional
            }

            export const certificatesData: Certificate[] = [
              {
                id: 'atraumatyczny-manicure-2025',
                title_pl: '«ATRAUMATYCZNY MANICURE»',
                description_pl: 'Certyfikat ukończenia kursu.',
                original_file_path: 'assets/certificates/originals/manicure_scan_1.jpg', // Path to be updated later
                original_file_type: 'image',
                thumbnail_image_path: 'assets/certificates/originals/manicure_scan_1.jpg', // Path to be updated later
                translation_pl: 'Certyfikat\npotwierdza, że\nKovalowa-Łogwin Jana Nikołajewna...',
              },
              // ... other certificates
            ];
            ```
*   [ ] **2.2. Create Data Access Utilities (Optional but Recommended):**
    *   [ ] Create `src/lib/certificates.ts`.
    *   [ ] Add functions to get all certificates and a single certificate by ID.
        ```typescript
        // src/lib/certificates.ts
        import { certificatesData, Certificate } from '@/data/certificates';

        export function getAllCertificates(): Certificate[] {
          return certificatesData;
        }

        export function getCertificateById(id: string): Certificate | undefined {
          return certificatesData.find(cert => cert.id === id);
        }

        export function getAllCertificateIds() {
          return certificatesData.map(certificate => ({
            id: certificate.id,
          }));
        }
        ```

## Phase 3: Core Layout and Navigation (Next.js)

*   [ ] **3.1. Create Main Layout Component (`src/app/layout.tsx`):**
    *   [ ] This file is already created by `create-next-app`. Modify it.
    *   [ ] Set HTML lang attribute to `pl`: `<html lang="pl">`.
    *   [ ] Define global metadata (site title, description - can be a template).
        ```typescript
        // src/app/layout.tsx
        import type { Metadata } from 'next'
        import './globals.css' // Ensure Tailwind is imported

        export const metadata: Metadata = {
          title: {
            default: 'Yana Kavaliova-Logvin - Certyfikaty',
            template: '%s - Yana Kavaliova-Logvin',
          },
          description: 'Portfolio certyfikatów Yany Kavaliova-Logvin w dziedzinie manicure i pedicure.',
        }

        export default function RootLayout({
          children,
        }: {
          children: React.ReactNode
        }) {
          return (
            <html lang="pl">
              <body className="font-sans antialiased bg-apple-gray-100 text-apple-gray-800 min-h-screen flex flex-col">
                {/* Header will be a separate component */}
                {/* Footer will be a separate component */}
                {children}
              </body>
            </html>
          )
        }
        ```
*   [ ] **3.2. Create Header Component (`src/components/Header.tsx`):**
    *   [ ] Replicate the header structure and styling from Laravel's `resources/views/layouts/app.blade.php`.
    *   [ ] Use Next.js `<Link>` component for navigation.
        ```tsx
        // src/components/Header.tsx
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
        ```
*   [ ] **3.3. Create Footer Component (`src/components/Footer.tsx`):**
    *   [ ] Replicate the footer structure and styling.
        ```tsx
        // src/components/Footer.tsx
        export default function Footer() {
          return (
            <footer className="py-8 text-center">
              <p className="text-xs text-apple-gray-500">
                © {new Date().getFullYear()} Yana Kavaliova-Logvin. Wszelkie prawa zastrzeżone.
              </p>
            </footer>
          );
        }
        ```
*   [ ] **3.4. Integrate Header and Footer into `src/app/layout.tsx`:**
    ```typescript
    // src/app/layout.tsx
    import type { Metadata } from 'next'
    import Header from '@/components/Header' // Import Header
    import Footer from '@/components/Footer' // Import Footer
    import './globals.css'

    export const metadata: Metadata = { /* ... */ }

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang="pl">
          <body className="font-sans antialiased bg-apple-gray-100 text-apple-gray-800 min-h-screen flex flex-col">
            <Header /> {/* Add Header */}
            <main className="flex-grow container mx-auto mt-8 mb-12 px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow-soft-lg rounded-2xl p-6 sm:p-10">
                {children}
              </div>
            </main>
            <Footer /> {/* Add Footer */}
          </body>
        </html>
      )
    }
    ```

## Phase 4: Landing Page Development (Next.js)

*   [ ] **4.1. Create Landing Page (`src/app/page.tsx`):**
    *   [ ] This file is already created. Modify it to display certificates.
    *   [ ] Import `getAllCertificates` from `src/lib/certificates.ts`.
    *   [ ] Fetch certificate data (since it's static, direct import is fine for App Router server components).
    *   [ ] Map over the certificates to display thumbnails and titles, similar to `resources/views/pages/landing.blade.php`.
    *   [ ] Use Next.js `<Link>` for links to detail pages: `href={`/certyfikat/${certificate.id}`}`.
    *   [ ] Use Next.js `<Image>` component for thumbnails for optimization.
    *   [ ] Replicate Tailwind CSS styling from the Laravel version.
        ```tsx
        // src/app/page.tsx
        import Link from 'next/link';
        import Image from 'next/image';
        import { getAllCertificates, Certificate } from '@/lib/certificates'; // Adjust path if needed

        // Opt-in for static generation
        export const dynamic = 'force-static';

        export default function LandingPage() {
          const certificates = getAllCertificates();

          return (
            <div className="container mx-auto px-4 max-w-screen-lg">
              <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-apple-gray-900 mb-4">Witaj na mojej stronie!</h1>
                <p className="text-lg text-apple-gray-600 max-w-2xl mx-auto">
                  Nazywam się Yana Kavaliova-Logvin. Poniżej znajdziesz moje certyfikaty potwierdzające kwalifikacje w dziedzinie manicure i pedicure.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-apple-gray-800 mb-8 text-center sm:text-left">Moje Certyfikaty</h2>

              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {certificates.map((certificate: Certificate) => (
                    <Link key={certificate.id} href={`/certyfikat/${certificate.id}`} className="group block bg-white rounded-2xl shadow-soft-md hover:shadow-soft-lg transition-all duration-300 ease-in-out overflow-hidden">
                      <div className="aspect-w-4 aspect-h-3 relative"> {/* Added relative for Next/Image */}
                        <Image
                          src={`/${certificate.thumbnail_image_path}`} // Path will be relative to /public
                          alt={`Miniatura certyfikatu: ${certificate.title_pl}`}
                          fill // Use fill for responsive images in a sized container
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-medium text-apple-gray-800 group-hover:text-apple-blue transition-colors duration-300 truncate">{certificate.title_pl}</h3>
                        {certificate.description_pl && (
                          <p className="text-sm text-apple-gray-500 mt-1 line-clamp-2">{certificate.description_pl}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-apple-gray-600 text-center">Brak dostępnych certyfikatów.</p>
              )}
            </div>
          );
        }
        ```
    *   [ ] **Note on aspect ratio with Tailwind:** The `aspect-w-4 aspect-h-3` classes might need the `@tailwindcss/aspect-ratio` plugin if not working out of the box, or use padding-bottom trick for aspect ratio. For Next/Image with `fill`, the parent needs to be positioned and sized.

## Phase 5: Certificate Detail Page Development (Next.js)

*   [ ] **5.1. Create Dynamic Route for Certificate Detail Page:**
    *   [ ] Create the directory structure: `src/app/certyfikat/[id]/`.
    *   [ ] Create `src/app/certyfikat/[id]/page.tsx`.
*   [ ] **5.2. Implement `generateStaticParams` for Prerendering:**
    *   [ ] In `page.tsx`, use `generateStaticParams` to tell Next.js which certificate IDs to pre-render.
        ```typescript
        // src/app/certyfikat/[id]/page.tsx
        import { getAllCertificateIds, getCertificateById, Certificate } from '@/lib/certificates';
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
        // ... rest of the component
        ```
*   [ ] **5.3. Implement Certificate Detail Page Component:**
    *   [ ] Fetch the specific certificate data using `getCertificateById(params.id)`.
    *   [ ] If certificate not found, call `notFound()` from `next/navigation`.
    *   [ ] Display certificate title, description, original document (image or PDF link), and translated text.
    *   [ ] Use Next.js `<Image>` for certificate images.
    *   [ ] Replicate Tailwind CSS styling from `resources/views/pages/certificate_detail.blade.php`.
        ```tsx
        // src/app/certyfikat/[id]/page.tsx (continued)
        export default function CertificateDetailPage({ params }: { params: { id: string } }) {
          const certificate = getCertificateById(params.id);

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
        ```
*   [ ] **5.4. Create a `not-found.tsx` page:**
    *   [ ] Create `src/app/not-found.tsx` for a custom 404 page.
        ```tsx
        // src/app/not-found.tsx
        import Link from 'next/link'

        export default function NotFound() {
          return (
            <div className="text-center py-10">
              <h1 className="text-2xl font-semibold text-apple-gray-800 mb-4">404 - Nie znaleziono strony</h1>
              <p className="text-apple-gray-600 mb-6">Przepraszamy, strona której szukasz nie istnieje.</p>
              <Link href="/" className="text-apple-blue hover:text-apple-blue-dark transition-colors">
                Wróć na stronę główną
              </Link>
            </div>
          )
        }
        ```

## Phase 6: Asset Handling (Next.js)

*   [ ] **6.1. Move Static Assets:**
    *   [ ] Copy all files from the Laravel project's `public/assets/certificates/` directory (originals, thumbnails) to the Next.js project's `public/certificates/` directory.
        *   `public/assets/certificates/originals/manicure_scan_1.jpg` -> `public/certificates/originals/manicure_scan_1.jpg`
    *   [ ] Create `public/certificates/originals/` and `public/certificates/thumbnails/` if they don't exist.
*   [ ] **6.2. Update Asset Paths in `src/data/certificates.ts`:**
    *   [ ] Modify `original_file_path` and `thumbnail_image_path` for each certificate to be relative to the `public` directory but without the leading `/public`. Next.js serves `public` directory contents from the root.
        *   Example: `'assets/certificates/originals/manicure_scan_1.jpg'` becomes `'certificates/originals/manicure_scan_1.jpg'`.
        *   When using `<Image src={...} />` or `<a> href={...} />`, paths should start with `/`, e.g. `src={'/' + certificate.thumbnail_image_path}`.
*   [ ] **6.3. Favicon:**
    *   [ ] Copy `favicon.ico` from Laravel's `public` directory to Next.js's `public` directory.
    *   [ ] Next.js App Router automatically picks up `favicon.ico` from `src/app/favicon.ico` or `public/favicon.ico`. Ensure it's in `public/favicon.ico` for simplicity or `src/app/favicon.ico`.
        For `src/app/favicon.ico`, the `RootLayout` metadata can reference it:
        ```typescript
        // src/app/layout.tsx
        export const metadata: Metadata = {
          // ...
          icons: {
            icon: '/favicon.ico', // if in public
            // icon: '/icon.png', // if using src/app/icon.png
          },
        }
        ```
        If `favicon.ico` is in `public/`, it might be picked up automatically. For robustness, placing it in `src/app/favicon.ico` is often preferred with App Router. Let's stick to `public/favicon.ico` for now and ensure it's linked correctly if not automatic.
        (Correction: Next.js prefers `src/app/favicon.ico`. If using `public/favicon.ico`, ensure no `src/app/favicon.ico` exists and link it manually in `layout.tsx` if needed, or rely on browser default behavior).
        For simplicity, let's assume `public/favicon.ico` will be used and check if it's picked up. If not, add `<link rel="icon" href="/favicon.ico" />` to `layout.tsx`'s head.

## Phase 7: SEO & Accessibility (Next.js)

*   [ ] **7.1. Page Titles and Metadata:**
    *   [ ] Verify that `src/app/layout.tsx` sets a default title and title template.
    *   [ ] Verify that `src/app/certyfikat/[id]/page.tsx` uses `generateMetadata` to set dynamic titles and descriptions for certificate detail pages.
    *   [ ] For the landing page (`src/app/page.tsx`), add specific metadata if needed (can be exported `metadata` object).
        ```tsx
        // src/app/page.tsx
        import type { Metadata } from 'next';

        export const metadata: Metadata = {
          title: 'Strona Główna', // Will be "Strona Główna - Yana Kavaliova-Logvin"
          description: 'Przeglądaj certyfikaty Yany Kavaliova-Logvin w dziedzinie manicure i pedicure.',
        };
        // ... rest of the component
        ```
*   [ ] **7.2. Image Alt Text:**
    *   [ ] Ensure all `<Image>` components have descriptive `alt` text in Polish. (Already done in component examples).
*   [ ] **7.3. Semantic HTML:**
    *   [ ] Review generated HTML to ensure appropriate use of semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`). (Largely handled by component structure).
*   [ ] **7.4. `robots.txt`:**
    *   [ ] Create `public/robots.txt` with basic rules:
        ```
        User-agent: *
        Allow: /
        Sitemap: [URL_OF_SITEMAP_ONCE_GENERATED_OR_DEPLOYED]/sitemap.xml
        ```
*   [ ] **7.5. Sitemap Generation (Post-MVP or Basic for MVP):**
    *   [ ] For MVP, a manual sitemap is not strictly necessary if all pages are linked.
    *   [ ] (Future) Consider `next-sitemap` package for automatic sitemap generation during build. For now, update `robots.txt` placeholder.

## Phase 8: Testing & Refinements

*   [ ] **8.1. Manual Testing (using `npm run dev`):**
    *   [ ] Open landing page:
        *   [ ] Verify all certificate thumbnails and titles are displayed correctly.
        *   [ ] Verify links to certificate detail pages are correct.
        *   [ ] Check image loading and alt texts.
    *   [ ] Open each certificate detail page via its URL and by clicking from landing page:
        *   [ ] Verify correct title, description, and metadata.
        *   [ ] Verify original document image/PDF link works.
        *   [ ] Verify translated text is displayed.
        *   [ ] Verify "Back to Home" link works.
    *   [ ] Test 404 page by navigating to a non-existent certificate ID.
    *   [ ] Check for broken links or missing images/PDFs (console errors, visual check).
    *   [ ] Test responsiveness on different screen sizes (browser dev tools).
    *   [ ] Verify favicon is displayed.
*   [ ] **8.2. Code Review (Self-Review for AI):**
    *   [ ] Check for clarity and consistency in React components.
    *   [ ] Ensure Tailwind CSS is applied effectively and consistently, matching the original design.
    *   [ ] Verify data fetching/access logic is correct.
    *   [ ] Check for any TypeScript errors or warnings.
    *   [ ] Check for console errors in the browser.

## Phase 9: Build & Pre-Deployment Checks (Local)

*   [ ] **9.1. Production Build:**
    *   [ ] Run `npm run build` to compile the Next.js application for production.
    *   [ ] Verify the build completes without errors.
    *   [ ] Serve the production build locally: `npm run start`.
    *   [ ] Test the site thoroughly using the production build.
*   [ ] **9.2. Environment Configuration:**
    *   [ ] For Next.js, most configuration is build-time. Ensure no sensitive keys are hardcoded if any were to be added later.
    *   [ ] `APP_URL` equivalent for Next.js is often handled by `metadataBase` in `layout.tsx` for absolute URLs in metadata, or by deployment platform.
        ```typescript
        // src/app/layout.tsx
        export const metadata: Metadata = {
          metadataBase: new URL('https://yourdomain.com'), // Replace with actual domain
          // ... other metadata
        }
        ```
        (For now, this can be omitted until actual deployment).

## Phase 10: Dockerization (Next.js - Standalone)

*   [ ] **10.1. Create Next.js Dockerfile:**
    *   [ ] Create `Dockerfile` in the root of the Next.js project.
        ```dockerfile
        # Dockerfile for Next.js App

        # Stage 1: Install dependencies and build the application
        FROM node:18-alpine AS deps
        WORKDIR /app

        # Install pnpm (or use npm/yarn if preferred)
        RUN npm install -g pnpm

        COPY package.json pnpm-lock.yaml* ./
        RUN pnpm install --frozen-lockfile

        FROM node:18-alpine AS builder
        WORKDIR /app
        COPY --from=deps /app/node_modules ./node_modules
        COPY . .

        # Environment variables for build time if needed
        # ENV NEXT_PUBLIC_API_URL=http://example.com

        RUN npm run build

        # Stage 2: Production image
        FROM node:18-alpine AS runner
        WORKDIR /app

        ENV NODE_ENV production
        # Optionally, if you want to expose a different port than 3000
        # ENV PORT 8080

        RUN addgroup --system --gid 1001 nodejs
        RUN adduser --system --uid 1001 nextjs

        COPY --from=builder /app/public ./public
        COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
        COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

        USER nextjs

        EXPOSE 3000
        # ENV PORT 3000 # Next.js default port

        CMD ["node", "server.js"]
        ```
    *   [ ] **Note:** The Dockerfile above assumes `output: 'standalone'` in `next.config.js` for an optimized production server.
        ```js
        // next.config.js (or .mjs/.ts)
        /** @type {import('next').NextConfig} */
        const nextConfig = {
          output: 'standalone', // Add this
          // reactStrictMode: true, // etc.
        }

        module.exports = nextConfig
        ```
*   [ ] **10.2. Update `docker-compose.yml` (or create new one):**
    *   [ ] The existing `docker-compose.yml` is for a Laravel (PHP+Nginx) + PostgreSQL setup.
    *   [ ] For a pure Next.js static/SSR app, you'd typically only need the Node.js service.
    *   [ ] Create a simplified `docker-compose.yml` for the Next.js app:
        ```yaml
        # docker-compose.yml for Next.js app
        version: '3.8'
        services:
          nextjs-app:
            build:
              context: .
              dockerfile: Dockerfile
            container_name: yana-portfolio-nextjs
            restart: unless-stopped
            ports:
              - "${APP_PORT:-3000}:3000" # Expose Next.js app port
            # environment: # Any runtime env vars
            #   - NODE_ENV=production
            networks:
              - yana-portfolio_network

        networks:
          yana-portfolio_network:
            driver: bridge
        ```
*   [ ] **10.3. Test Docker Setup:**
    *   [ ] Build the Docker image: `docker-compose build`
    *   [ ] Run the container: `docker-compose up`
    *   [ ] Access the application in the browser at the mapped port.

## Phase 11: Future Considerations (Post-Migration)

*   [ ] **11.1. CMS Integration:**
    *   [ ] Consider a headless CMS (e.g., Strapi, Sanity, Contentful) to manage certificates if they change frequently or if Yana needs to update them herself.
*   [ ] **11.2. Multilingual Support (Next.js i18n).**
*   [ ] **11.3. Advanced PDF/Image Display (e.g., lightboxes, embedded PDF viewers).**
*   [ ] **11.4. Contact Form (using Next.js API Routes and an email service).**
*   [ ] **11.5. Deployment Strategy:**
    *   [ ] Deploy to Vercel (ideal for Next.js) or Netlify for easy static hosting.
    *   [ ] Or, use the Docker container on a cloud provider.
*   [ ] **11.6. Automated Testing (Jest, React Testing Library, Playwright/Cypress).**
*   [ ] **11.7. Cookie Consent Banner (if analytics or other tracking is added).**
*   [ ] **11.8. Sitemap Generation:** Implement `next-sitemap` or a custom script to generate `sitemap.xml` during build.

---
**End of `todo.md` for Next.js Migration**
```