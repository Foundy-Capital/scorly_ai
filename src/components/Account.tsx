'use client';

import { useAccount, useDisconnect } from 'wagmi'
import { Wallet } from './ui/icons'
import { useEffect, useState } from 'react'
import { WalletConnectModal } from './WalletConnectModal'

export function Account() {
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  // Call /api/auth/user when wallet connects
  useEffect(() => {
    if (address && isConnected) {
      createOrUpdateUser(address)
    }
  }, [address, isConnected])

  const createOrUpdateUser = async (walletAddress: string) => {
    setIsLoadingUser(true)
    try {
      const response = await fetch('/api/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      })

      if (!response.ok) {
        throw new Error('Failed to create/update user')
      }

      const data = await response.json()
      console.log('User created/updated:', data.user)

      // You can store user data in localStorage or context if needed
      localStorage.setItem('user', JSON.stringify(data.user))
    } catch (error) {
      console.error('Error creating/updating user:', error)
    } finally {
      setIsLoadingUser(false)
    }
  }

  const handleWalletConnect = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {isConnected ? (
        <button
          onClick={() => {
            disconnect()
            // Clear user data on disconnect
            localStorage.removeItem('user')
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <Wallet className="w-5 h-5" />
          {isLoadingUser ? 'Loading...' : (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Disconnect')}
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

      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </>
  )
}
