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
