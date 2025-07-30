
'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SubmissionModule } from '@/components/sections/SubmissionModule';
import { ResultsPanel } from '@/components/sections/ResultsPanel';

interface ChatMessage {
  role: string;
  content: string;
}

interface ScoreBreakdown {
  verdict: string;
  riskFlags: string[];
  // Add other properties as needed for the score breakdown
}

export default function Home() {
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);

  const handleGenerateReport = (data: { messages: ChatMessage[]; score: ScoreBreakdown }) => {
    setChatMessages(data.messages);
    setScoreBreakdown(data.score);
    setShowResultsPanel(true);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <HeroSection />
      <SubmissionModule onGenerateReport={handleGenerateReport} />
      <ResultsPanel
        isVisible={showResultsPanel}
        chatMessages={chatMessages}
        scoreBreakdown={scoreBreakdown}
      />
    </main>
  );
}
