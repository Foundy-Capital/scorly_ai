import Link from 'next/link';
import { Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white shadow-sm mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between text-gray-600">
          <p>&copy; 2024 Scorly. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/academy" className="text-gray-600 hover:text-gray-900">Academy</Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Use</Link>
          </div>
          <a href="https://x.com/scorly_ai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
