import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PulseConverter | High-Fidelity MP3',
  description: 'Download your owned music from lost accounts in high quality.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed inset-0 bg-main-gradient -z-10 opacity-80" />
        <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  )
}