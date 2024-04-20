'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = 'e7a2103583aaebbfa817ab3ee662b770'

const mainnet = {
  chainId: 11155111,
  name: 'Sepolia Network',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl:
    'https://eth-sepolia.g.alchemy.com/v2/bRqDWPHTbD00nR0f1XR6nFw3iWaiJ41l',
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
}

createWeb3Modal({
  themeVariables: {
    // '--w3m-color-mix': '#00BB7F',
    '--w3m-accent': 'rgb(147,51,234,1)',
    '--w3m-color-mix-strength': 40,
  },
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
})

export function Web3ModalProvider({ children }: any) {
  return children
}
