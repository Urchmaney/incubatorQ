import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IncubatorQ',
  description: 'Get a companion in your journey.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <body className={`${inter.className} bg-background/70`}>
        <Providers>
          <div className='max-w-5xl mx-auto'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
