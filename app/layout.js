
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Colegio bilingüe en Medellin',
  description: 'We educate in CONSCIOUSNESS to and for life. The New School (TNS).',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>{children}</body>


    </html>
  )
}
