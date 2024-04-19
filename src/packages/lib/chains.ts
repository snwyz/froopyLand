import { IChainData } from './types'

const supportedChains: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'eth-mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%INFURA_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Goerli',
    short_name: 'gor',
    chain: 'ETH',
    network: 'eth-goerli',
    chain_id: 5,
    network_id: 5,
    rpc_url: 'https://goerli.infura.io/v3/%INFURA_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'X1 Testnet',
    short_name: 'x1',
    chain: 'X1_TEST',
    network: 'X1_TEST',
    chain_id: 195,
    network_id: 195,
    // rpc_url: 'https://x1-testnet.blockpi.network/v1/rpc/public',
    rpc_url: 'https://x1testrpc.okx.com',
    native_currency: {
      symbol: 'OKB',
      name: 'OKB',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Sepolia test network',
    short_name: 'sepolia',
    chain: 'sepolia_test',
    network: 'sepolia_test',
    chain_id: 11155111,
    network_id: 11155111,
    rpc_url: 'https://eth-sepolia.g.alchemy.com/v2/bRqDWPHTbD00nR0f1XR6nFw3iWaiJ41l',
    native_currency: {
      symbol: 'SepoliaETH',
      name: 'SepoliaETH',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  }
]

export default supportedChains
