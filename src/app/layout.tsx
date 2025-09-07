import type { Metadata } from 'next'
import './globals.css'
import { ModalProvider } from '@/components/ModalContext'
import { Header } from '@/components/Header'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'RWA Scoring Platform',
  description: 'Score Any Tokenized Real-World Asset in Seconds',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <ModalProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="flex-grow">{children}</main>
            </div>
          </ModalProvider>
        </body>
      </html>
    </Providers>
  )
}
