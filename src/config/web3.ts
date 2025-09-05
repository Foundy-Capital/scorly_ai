import { http, createConfig } from 'wagmi'
import { bsc, base } from 'wagmi/chains'
import { injected, walletConnect, metaMask } from 'wagmi/connectors'

const projectId = process.env.WCPID;

export const config = createConfig({
  chains: [bsc, base],
  connectors: [walletConnect({ projectId }), metaMask()],
  transports: {
    [bsc.id]: http(),
    [base.id]: http(),
  },
})
