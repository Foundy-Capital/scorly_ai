'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { CircleDollarSign, Coins, FileText, MessageCircle } from '@/components/ui/icons'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { SubmissionModule } from '@/components/sections/SubmissionModule'
import { AnalysisPanel } from '@/components/sections/AnalysisPanel'
import { ErrorNotification } from '@/components/ui/ErrorNotification'
import { Account } from '@/components/ui/Account'

import { config } from '@/config/web3'

interface ChatMessage {
  role: string
  content: string
}

interface AssetAnalysis {
  asset_name: string
  token: string
  asset_type: string
  issuer: string
  chain: string
  index_inclusion_score: {
    score_percent: number
    eligibility: 'Fully eligible' | 'Conditionally eligible' | 'Not recommended'
  }
  key_highlights: {
    top_strengths: string[]
    key_risks: string[]
  }
  risk_analysis: {
    regulatory: string
    custody: string
    oracle_data: string
    redemption: string
    token_design: string
  }
  final_verdict: {
    decision: 'Include' | 'Include with conditions' | 'Exclude'
    reasoning: string[]
  }
  all_documents: string
}

const queryClient = new QueryClient()

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [analysisData, setAnalysisData] = useState<AssetAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleInitialAnalysis = async (url: string, isFullAudit: boolean) => {
    if (!url.trim()) return
    setIsLoading(true)
    setAnalysisData(null)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, isFullAudit }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      // console.log('data :>> ', data);
      setMessages(data.messages)
      setAnalysisData(data.analysis)
      setShowAnalysisPanel(true)
    } catch (error) {
      console.error('Error generating score report:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.analysis) {
        setAnalysisData(data.analysis)
      }

      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error sending message:', error)
      setError(error.message)
    }
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Coins className="w-8 h-8 text-brown-600" />
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Scorly</h1>
                    <p className="text-sm text-gray-600">...</p>
                  </div>
                </div>

                <Account />
              </div>
            </div>
          </header>
          <main className="flex-grow">
            {error && <ErrorNotification message={error} />}
            <HeroSection />
            <SubmissionModule onGenerateReport={handleInitialAnalysis} isLoading={isLoading} />
            <AnalysisPanel
              messages={messages}
              analysisData={analysisData}
              onSendMessage={handleSendMessage}
            />
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
