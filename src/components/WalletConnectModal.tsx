'use client';

import Image from 'next/image'
import { useConnect } from 'wagmi'
import { base } from 'wagmi/chains'
import { useEffect, useState } from 'react'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect?: () => void
}

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const { connectAsync, connectors } = useConnect()
  const [selectedChainId, setSelectedChainId] = useState(base.id)

  useEffect(() => {
    setSelectedChainId(base.id)
  }, [])

  async function handleConnect(connector: any) {
    await connectAsync({
      chainId: selectedChainId,
      connector,
    })
    onClose()
    onConnect?.()
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

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Connect Wallet</h2>
          <button
            onClick={onClose}
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
  )
}
