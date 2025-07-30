'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SubmissionModule } from '@/components/sections/SubmissionModule';
import { AnalysisPanel } from '@/components/sections/AnalysisPanel';

interface ChatMessage {
  role: string;
  content: string;
}

interface AssetAnalysis {
  asset_name: string;
  token: string;
  asset_type: string;
  issuer: string;
  chain: string;
  index_inclusion_score: {
    score_percent: number;
    eligibility: "Fully eligible" | "Conditionally eligible" | "Not recommended";
  };
  key_highlights: {
    top_strengths: string[];
    key_risks: string[];
  };
  risk_analysis: {
    regulatory: string;
    custody: string;
    oracle_data: string;
    redemption: string;
    token_design: string;
  };
  final_verdict: {
    decision: "Include" | "Include with conditions" | "Exclude";
    reasoning: string[];
  };
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analysisData, setAnalysisData] = useState<AssetAnalysis | null>(null);

  const handleInitialAnalysis = async (url: string, isFullAudit: boolean) => {
    if (!url.trim()) return;
    setIsLoading(true);
    setAnalysisData(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, isFullAudit }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data.messages);
      setAnalysisData(data.analysis);
      setShowAnalysisPanel(true);
    } catch (error) {
      console.error('Error generating score report:', error);
      // TODO: Show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    console.log('data :>> ', data);

    if (data.analysis) {
      setAnalysisData(data.analysis);
    }

    setMessages([...newMessages, { role: 'assistant', content: data.message }]);
  };


  return (
    <main className="flex-grow">
      <HeroSection />
      <SubmissionModule
        onGenerateReport={handleInitialAnalysis}
        isLoading={isLoading}
      />
      <AnalysisPanel
        messages={messages}
        analysisData={analysisData}
        onSendMessage={handleSendMessage}
      />
      </main>
  );
}
