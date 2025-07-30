import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  )
}
