import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './context/language_context'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Colegio bilingüe en Medellin',
  description: 'We educate in CONSCIOUSNESS to and for life. The New School (TNS).',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LanguageProvider>
        <body className={inter.className}>{children}</body>

      </LanguageProvider >
    </html>
  )
}
