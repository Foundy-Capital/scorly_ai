'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SubmissionModule } from '@/components/sections/SubmissionModule';
import { AnalysisPanel } from '@/components/sections/AnalysisPanel';
import { ErrorNotification } from '@/components/ui/ErrorNotification';
import { Paywall } from '@/components/Paywall';
import { useModal } from '@/components/ModalContext';

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
  all_documents: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analysisData, setAnalysisData] = useState<AssetAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isPaywallOpen, openPaywall, closePaywall } = useModal();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInitialAnalysis = async (url: string, isFullAudit: boolean) => {
    if (!url.trim()) return;
    setIsLoading(true);
    setAnalysisData(null);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, isFullAudit }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      // console.log('data :>> ', data);
      setMessages(data.messages);
      setAnalysisData(data.analysis);
      setShowAnalysisPanel(true);
    } catch (error) {
      console.error('Error generating score report:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      // console.log('data :>> ', data);

      if (data.analysis) {
        setAnalysisData(data.analysis);
      }

      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
    }
  };


  return (
    <main className="flex-grow">
      {error && <ErrorNotification message={error} />}
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

      {/* Premium Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unlock Premium Features
            </h2>
            <p className="text-lg text-gray-600">
              Get access to all previously scored assets, advanced filtering, and exclusive insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Full Database Access</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Access to all previously scored assets</li>
                <li>• Comprehensive asset analysis reports</li>
                <li>• Historical scoring data</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Advanced Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Advanced filtering and search</li>
                <li>• Leaderboard and rankings</li>
                <li>• Export capabilities</li>
                <li>• Priority support</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={openPaywall}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Premium Access
            </button>
          </div>
        </div>
      </section>

      <Paywall
        isOpen={isPaywallOpen}
        onClose={closePaywall}
        onSuccess={() => {
          // Handle success - maybe redirect to scores or update UI
          window.location.href = '/scores';
        }}
      />
    </main>
  );
}
