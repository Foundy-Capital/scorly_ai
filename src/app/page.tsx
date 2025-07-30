
'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SubmissionModule } from '@/components/sections/SubmissionModule';
import { ResultsPanel } from '@/components/sections/ResultsPanel';

export default function Home() {
  const [showResults, setShowResults] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <HeroSection />
      <SubmissionModule />
      <ResultsPanel isVisible={showResults} />
    </main>
  );
}
