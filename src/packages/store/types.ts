export type MinType = {
  image: string
  title: string
  description: string
  price: string
  remaining: number
  currency: string
  total: number
  mintType: number
  expDuration: string
  derivativeNFTContractAddress?: string
  isSaleEnabled: boolean
  mediaUri?: string
  nameForSearch?: string
}

export type DerivativeNFT = {
  index?: number
  title?: string
  tokenId: string
  originalContractAddress: string
  image: string
  mintTypes?: MinType[]
  derivativeContractAddress?: string
  name?: string
  sort?: string
}

export type CollectionInfo = {
  name?: string
  description?: string
  image?: string
}

export type NftDeployInfoType = {
  derivativeContractAddress: string
  originalContractAddress: string
  tokenId: string
}

export type FilterType = {
  isSale: boolean
  mintPrice: number
  maxPrice: number
  collections: string[]
  licenseDuration: string[]
}

export type SortType = {
  value: string
  title: string
}

export const defaultFilterMarket = {
  isSale: false,
  mintPrice: 0,
  maxPrice: 5,
  collections: [],
  licenseDuration: [],
}

export const defaultCollectionInfo = {
  name: '',
  description: '',
  image: '',
}
