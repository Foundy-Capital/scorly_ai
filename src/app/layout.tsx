import type { Metadata } from 'next';
import './globals.css';
import { ModalProvider } from '@/components/ModalContext';

export const metadata: Metadata = {
  title: 'RWA Scoring Platform',
  description: 'Score Any Tokenized Real-World Asset in Seconds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  )
}
