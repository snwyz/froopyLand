import moment, { Moment } from 'moment'

import supportedChains from './chains'
import { IChainData } from './types'

var Web3 = require('web3')

export function getChainData(chainId?: number): IChainData | undefined {
  if (!chainId) {
    return undefined
  }
  // eslint-disable-next-line prefer-destructuring
  const chainData = supportedChains.filter(
    (chain: any) => chain.chain_id === chainId,
  )[0]

  if (!chainData) {
    throw new Error('ChainId missing or not supported')
  }

  const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%INFURA_KEY%') &&
    INFURA_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%INFURA_KEY%', INFURA_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}

export function convertUrlImage(url: string) {
  if (url) {
    const convertUrl = url?.includes('https://')
      ? url
      : url?.replace('ipfs://', 'https://ipfs.io/ipfs/')

    return convertUrl
  }
  return '/static/license-template/template.png'
}

export function convertTimeToDays(time: number) {
  const convertTime = Number(time) / (60 * 60 * 24)

  return convertTime.toFixed(2)
}

export function timeFromNow(end: Moment, withoutSuffix = true) {
  return moment(end).fromNow(withoutSuffix)
}

export function weiToEtherString(wei: string) {
  const roundUpDigits = 5
  const ether = Web3.utils.fromWei(wei, 'ether')
  const roundedEther =
    Math.ceil(ether * Math.pow(10, roundUpDigits)) /
    (Math.pow(10, roundUpDigits) * 1.0)
  return roundedEther
}

export const getAssetOpenSeaURL = (item): any => {
  const address = item.contractAddress || item.derivativeNFTContractAddress
  const id = item.tokenId || item.mintType
  return `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${address}/${id}`
}

export const getPublicEtherscanUrl = (item): string => {
  return `${process.env.NEXT_PUBLIC_ETHERSCAN_URL}/address/${item}`
}
