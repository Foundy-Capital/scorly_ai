import Image from 'next/image'
import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { Wallet } from './icons'
import { base } from 'wagmi/chains'
import { useEffect, useState } from 'react'

import { config } from '@/config/web3'

const chains = config.chains

export function Account() {
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const { connectAsync, connectors } = useConnect()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedChainId, setSelectedChainId] = useState(base.id)

  useEffect(() => {
    // Set default chain on mount, you can change this to your preferred default
    setSelectedChainId(base.id)
  }, [])

  async function handleConnect(connector: any) {
    await connectAsync({
      chainId: selectedChainId,
      connector,
    })
    setIsModalOpen(false)
  }

  const getConnectorIcon = (connectorName: string) => {
    if (connectorName.toLowerCase().includes('metamask')) {
      return '/MetaMask.svg'
    }
    if (connectorName.toLowerCase().includes('walletconnect')) {
      return '/WalletConnect.png'
    }
    return '/favicon.svg' // A default icon
  }

  return (
    <>
      {isConnected ? (
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <Wallet className="w-5 h-5" />
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Disconnect'}
        </button>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </button>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Connect Wallet</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Wallet Connector List */}
            <div className="flex flex-col gap-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => handleConnect(connector)}
                  className="flex items-center justify-start gap-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
                >
                  <Image
                    src={getConnectorIcon(connector.name)}
                    alt={connector.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span>{connector.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
