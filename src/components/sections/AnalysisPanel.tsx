'use client';

import { useState } from 'react';
import { Section, Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';

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

interface AnalysisPanelProps {
  messages: ChatMessage[];
  analysisData: AssetAnalysis | null;
  isVisible: boolean;
  onSendMessage: (input: string) => void;
}

export function AnalysisPanel({ messages, analysisData, isVisible, onSendMessage }: AnalysisPanelProps) {
  const [input, setInput] = useState('');

  const handleSendClick = () => {
    onSendMessage(input);
    setInput('');
  };

  if (!isVisible) return null;

  return (
    <Section className="bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Panel */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
            <div className="h-[400px] overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto pr-2">
                  {messages.map((msg, index) => (
                    <div key={index} className={`my-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendClick()}
                    className="flex-1 p-3 rounded-l-lg bg-gray-100 dark:bg-gray-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={handleSendClick}
                    className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Report */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Analysis Report</h3>
            {analysisData ? (
              <div className="space-y-6">
                {/* Asset Details */}
                <div>
                  <h4 className="text-md font-semibold mb-2 border-b pb-2">Asset Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Asset:</strong> {analysisData.asset_name}</p>
                    <p><strong>Token:</strong> {analysisData.token}</p>
                    <p><strong>Type:</strong> {analysisData.asset_type}</p>
                    <p><strong>Issuer:</strong> {analysisData.issuer}</p>
                    <p><strong>Chain:</strong> {analysisData.chain}</p>
                  </div>
                </div>

                {/* Index Inclusion Score */}
                <div>
                  <h4 className="text-md font-semibold mb-2 border-b pb-2">Index Inclusion Score</h4>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-lg">{analysisData.index_inclusion_score.eligibility} | Score: {analysisData.index_inclusion_score.score_percent}</p>
                    </div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="text-md font-semibold mb-2 border-b pb-2">Key Highlights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold mb-1">Top Strengths</h5>
                      <ul className="list-disc list-inside">
                        {analysisData.key_highlights.top_strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Key Risks</h5>
                      <ul className="list-disc list-inside">
                        {analysisData.key_highlights.key_risks.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Risk Analysis */}
                <div>
                  <h4 className="text-md font-semibold mb-2 border-b pb-2">Risk Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Regulatory:</strong> {analysisData.risk_analysis.regulatory}</p>
                    <p><strong>Custody:</strong> {analysisData.risk_analysis.custody}</p>
                    <p><strong>Oracle/Data:</strong> {analysisData.risk_analysis.oracle_data}</p>
                    <p><strong>Redemption:</strong> {analysisData.risk_analysis.redemption}</p>
                    <p><strong>Token Design:</strong> {analysisData.risk_analysis.token_design}</p>
                  </div>
                </div>

                {/* Final Verdict */}
                <div>
                  <h4 className="text-md font-semibold mb-2 border-b pb-2">Final Verdict</h4>
                  <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
                    <p className="font-bold text-lg mb-2">{analysisData.final_verdict.decision}</p>
                    <ul className="list-disc list-inside text-sm">
                      {analysisData.final_verdict.reasoning.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500">No analysis data available.</p>
                <p className="text-sm text-neutral-400">Submit a URL to start the analysis.</p>
              </div>
            )}
          </div>
        </div>

        {/* Download & Share */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button>
            📥 Download Full Report (PDF)
          </Button>
          <Button variant="secondary">
            📦 Export JSON for API
          </Button>
          <Button variant="outline">
            🔗 Copy Public Report Link
          </Button>
        </div>
      </Container>
    </Section>
  );
}
