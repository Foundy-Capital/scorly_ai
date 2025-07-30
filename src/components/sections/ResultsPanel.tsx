'use client';

import { Section, Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import ChatSection from './ChatSection';

interface ResultsPanelProps {
  isVisible: boolean;
  chatMessages: { role: string; content: string }[];
  scoreBreakdown: { verdict: string; riskFlags: string[] } | null;
}

export function ResultsPanel({ isVisible, chatMessages, scoreBreakdown }: ResultsPanelProps) {
  if (!isVisible) return null;

  return (
    <Section className="bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Panel */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
            <div className="h-[400px] overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <ChatSection initialMessages={chatMessages} />
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {/* Score visualization will go here */}
              {scoreBreakdown && (
                <>
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Verdict</h4>
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {scoreBreakdown.verdict}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Risk Flags</h4>
                    <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-300">
                      {scoreBreakdown.riskFlags.map((flag, index) => (
                        <li key={index}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
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
