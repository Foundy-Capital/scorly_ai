'use client';

import { useState, useRef } from 'react';
import { Section, Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { generatePdf } from '@/lib/pdfGenerator';

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

interface AnalysisPanelProps {
  messages: ChatMessage[];
  analysisData: AssetAnalysis | null;
  onSendMessage: (input: string) => void;
}

export function AnalysisPanel({ messages, analysisData, onSendMessage }: AnalysisPanelProps) {
  const [input, setInput] = useState('');
  const analysisReportRef = useRef<HTMLDivElement>(null);

  const handleSendClick = () => {
    onSendMessage(input);
    setInput('');
  };

  const handleDownloadPdf = () => {
    if (analysisReportRef.current) {
      generatePdf(analysisReportRef.current, `RWA-Report-${analysisData?.asset_name || 'analysis'}.pdf`);
    }
  };

  return (
    <Section className="bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <div className="flex justify-center">
          {/* Analysis Report */}
          <div ref={analysisReportRef} className="w-full lg:w-1/2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Analysis Report</h3>
            {analysisData ? (
              <div className="space-y-6">
                {/* Asset Details */}
                <div>
                  <h4 className="text-md font-semibold mb-2 border-b pb-2">Asset Details</h4>
                  <div className="grid grid-wrap grid-cols-2 gap-2 text-sm">
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
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="font-semibold text-lg">{analysisData.index_inclusion_score.eligibility}</p>
                    <p className={`font-semibold text-lg ${
                      analysisData.index_inclusion_score.score_percent > 80
                        ? 'text-green-500'
                        : analysisData.index_inclusion_score.score_percent > 50
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}>
                      Score: {analysisData.index_inclusion_score.score_percent}
                    </p>
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
                {/* Final Verdict */}
                <div>
                  <h4 className="text-md font-semibold mb-2 border-b pb-2">Documents</h4>
                  <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
                    <ul className="list-disc list-inside text-sm">
                      <p><strong>All Documents:</strong> <a target='_blank' href={analysisData?.all_documents}>Open Dropbox</a></p>
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
          <Button onClick={handleDownloadPdf}>
            📥 Download Full Report (PDF)
          </Button>
          <Button variant="secondary">
            📦 Export JSON for API
          </Button>
          {/* <Button variant="outline">
            🔗 Copy Public Report Link
          </Button> */}
        </div>
      </Container>
    </Section>
  );
}
