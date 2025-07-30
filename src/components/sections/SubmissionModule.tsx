'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Section, Container } from '@/components/ui/Layout';

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ id, label, isActive, onClick }: TabProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`px-4 py-2 font-medium ${
        isActive
          ? 'border-b-2 border-neutral-900 text-neutral-900 dark:border-neutral-50 dark:text-neutral-50'
          : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
      }`}
    >
      {label}
    </button>
  );
}

interface SubmissionModuleProps {
  onGenerateReport: (data: { messages: any[]; score: any }) => void;
}

export function SubmissionModule({ onGenerateReport }: SubmissionModuleProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isFullAudit, setIsFullAudit] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleGenerateScoreReport = async () => {
    if (activeTab === 'url' && urlInput.trim()) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: urlInput, isFullAudit }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        onGenerateReport(data);
      } catch (error) {
        console.error('Error generating score report:', error);
        // Optionally, handle error state or display a message to the user
      }
    } else if (activeTab === 'upload') {
      // Handle file upload logic here
      console.log('File upload not yet implemented.');
    }
  };

  return (
    <Section>
      <Container className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex space-x-8">
              <Tab
                id="upload-tab"
                label="Upload JSON/CSV"
                isActive={activeTab === 'upload'}
                onClick={() => setActiveTab('upload')}
              />
              <Tab
                id="url-tab"
                label="Paste URL"
                isActive={activeTab === 'url'}
                onClick={() => setActiveTab('url')}
              />
            </div>
          </div>

          <div className="mt-6">
            {activeTab === 'upload' ? (
              <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-12 text-center">
                <div className="space-y-1">
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Drag and drop your file here, or
                  </p>
                  <Button variant="secondary">Browse files</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="url"
                  placeholder="Enter project URL, whitepaper, or GitHub repo"
                  className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
              </div>
            )}

            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                id="full-audit"
                checked={isFullAudit}
                onChange={(e) => setIsFullAudit(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700"
              />
              <label
                htmlFor="full-audit"
                className="ml-2 text-sm text-neutral-600 dark:text-neutral-300"
              >
                Run as full audit (takes longer, more detailed)
              </label>
            </div>

            <div className="mt-6">
              <Button className="w-full" onClick={handleGenerateScoreReport}>Generate Score Report</Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
