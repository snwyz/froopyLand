export type VerifiedType = {
  contractAddress: string
}

export type OpenSeaContractType = {
  name: string
  links: {
    website?: string
    discord?: string
    twitter?: string
    telegram?: string
    instagram?: string
  }
  contractAddress: string
  slug: string
  image: string
  tokenInfo: {
    tokenStandard: string
    symbol: string
  }
}
