import create from 'zustand'

import { FilterMarket, MarketType } from '@ts'

import {
  CollectionInfo,
  defaultCollectionInfo,
  defaultFilterMarket,
  DerivativeNFT,
  FilterType,
  MinType,
  SortType,
} from './types'

interface MyState {
  balance: number
  setBalance: (balance: number) => void

  poolAddress: string
  setPoolAdress: (poolAddress: string) => void

  offers: any
  setOffers: (offer: any) => void

  mintedLicenses: any[]
  setMintedLicenses: (mintedLicenses: any[]) => void

  highestOffer: number
  setHighestOffer: (highestOffer: number) => void

  number: number
  setNumber: (number: number) => void

  isGridMode: boolean
  setIsGridMode: (value: boolean) => void

  currentPage: number
  setCurrentPage: (number: number) => void

  itemOffset: number
  setItemOffset: (number: number) => void

  search: string
  setSearch: (search: string) => void

  address: string
  setAddress: (address: string) => void

  collectionInfo: any
  setCollectionInfo: (collectionInfo: any) => void

  marketType: MarketType
  setMarketType: (type: MarketType) => void

  isRefreshingData: boolean
  setIsRefreshingData: (value: boolean) => void

  licensesDataInit: MinType[]
  setLicensesDataInit: (minTypes: MinType[]) => void

  licensesData: MinType[]
  setLicensesData: (minTypes: MinType[]) => void
  setUpdateLicensesData: (item: MinType) => void

  nftsDataInit: DerivativeNFT[]
  setNftsDataInit: (nfts: DerivativeNFT[]) => void

  nftsData: DerivativeNFT[]
  setNftsData: (nfts: DerivativeNFT[]) => void

  isLoadingGetNFTs: boolean
  setIsLoadingGetNFTs: (value: boolean) => void

  filterMarket: FilterType
  setFilterMarket: (value: any, type: FilterMarket) => void

  selectedSidebar: string[]
  setSelectedSidebar: (value: string) => void

  collectionNfts: DerivativeNFT[]
  setCollectionNfts: (collections: DerivativeNFT[]) => void

  collectionLicenses: string[]
  setCollectionLicenses: (collections: string[]) => void

  resetCollectionMarket: () => void
  resetAllFilterMarket: () => void
  resetPagination: () => void

  // filter data market
  selectedSort: SortType
  setSelectedSort: (selectedSort: SortType) => void

  //filter data market
  sortDataByAllPriceHasCollectionHasLicenseDuration: () => void
  sortDataByAllPriceEmptyCollectionHasLicenseDuration: () => void
  sortDataBySpecificPriceHasCollectionHasLicenseDuration: () => void
  sortDataBySpecificPriceEmptyCollectionHasLicenseDuration: () => void

  sortDataByAllPriceHasCollectionEmptyLicenseDuration: () => void
  sortDataByAllPriceEmptyCollectionEmptyLicenseDuration: () => void
  sortDataBySpecificPriceHasCollectionEmptyLicenseDuration: () => void
  sortDataBySpecificPriceEmptyCollectionEmptyLicenseDuration: () => void
}

const useStore = create<MyState>((set) => ({
  balance: 0,
  setBalance: (value: number) => {
    set((state) => ({
      ...state,
      balance: value,
    }))
  },

  collectionInfo: defaultCollectionInfo,
  setCollectionInfo: (value: CollectionInfo) => {
    set((state) => ({
      ...state,
      collectionInfo: value,
    }))
  },

  mintedLicenses: [],
  setMintedLicenses: (value: any[]) => {
    set((state) => ({
      ...state,
      mintedLicenses: value,
    }))
  },

  highestOffer: 0,
  setHighestOffer: (value: number) => {
    set((state) => ({
      ...state,
      highestOffer: value,
    }))
  },

  poolAddress: '',
  setPoolAdress: (value: string) => {
    set((state) => ({
      ...state,
      poolAddress: value,
    }))
  },

  offers: [],
  setOffers: (offer: any[]) => {
    set((state) => ({
      ...state,
      offers: offer,
    }))
  },

  number: 0,
  setNumber: (value: number) => {
    set((state) => ({
      ...state,
      number: value,
    }))
  },

  isGridMode: false,
  setIsGridMode: (value: boolean) => {
    set((state) => ({
      ...state,
      isGridMode: value,
    }))
  },

  currentPage: 0,
  setCurrentPage: (value: number) => {
    set((state) => ({
      ...state,
      currentPage: value,
    }))
  },

  itemOffset: 0,
  setItemOffset: (value: number) => {
    set((state) => {
      return {
        ...state,
        itemOffset: value,
      }
    })
  },

  search: '',
  setSearch: (value: string) => {
    set((state) => ({
      ...state,
      search: value,
    }))
  },

  address: '',
  setAddress: (address) =>
    set((state) => ({
      ...state,
      address,
    })),

  marketType: MarketType.COLLECTIONS,
  setMarketType: (type: MarketType) => {
    set((state) => ({
      ...state,
      marketType: type,
    }))
  },

  licensesDataInit: [],
  setLicensesDataInit: (mintTypes: MinType[]) => {
    //  Only show licenses that are available for sale
    const onlySaleMintTypes = mintTypes?.filter(
      (item) => item.isSaleEnabled && Number(item.remaining) > 0,
    )
    // const sortData = onlySaleMintTypes.sort((a, b) =>
    //   a.title.localeCompare(b.title),
    // )

    set((state) => {
      return {
        ...state,
        licensesDataInit: onlySaleMintTypes,
      }
    })
  },

  licensesData: [],
  setLicensesData: (licensesData: MinType[]) => {
    set((state) => {
      const notYet = licensesData.filter(
        (mintType) =>
          !state.licensesData
            .map((license) => license.derivativeNFTContractAddress)
            .includes(mintType.derivativeNFTContractAddress),
      )
      //  Only show licenses that are available for sale

      const onlySaleMintTypes = notYet?.filter(
        (item) => item.isSaleEnabled && Number(item.remaining) > 0,
      )

      return {
        ...state,
        licensesData: [...state.licensesData, ...onlySaleMintTypes],
      }
    })
  },
  setUpdateLicensesData: (item: MinType) => {
    set((state) => {
      const updateLicensesData = state.licensesData.map((minion) => {
        if (
          minion.derivativeNFTContractAddress ===
          item.derivativeNFTContractAddress &&
          item.mintType === minion.mintType
        ) {
          return { ...item, remaining: item.remaining - 1 }
        } else return minion
      })

      const updateLicensesDataInit = state.licensesDataInit.map((minion) => {
        if (
          minion.derivativeNFTContractAddress ===
          item.derivativeNFTContractAddress &&
          item.mintType === minion.mintType
        ) {
          return { ...item, remaining: item.remaining - 1 }
        } else return minion
      })

      return {
        ...state,
        licensesData: updateLicensesData,
        licensesDataInit: updateLicensesDataInit,
      }
    })
  },

  nftsDataInit: [],
  setNftsDataInit: (collections: DerivativeNFT[]) => {
    set((state) => {
      //  Only show collections that are available for sale
      const onlySaleCollections = collections.filter?.(
        (item) =>
          item?.mintTypes?.length > 0 &&
          item?.mintTypes?.some(
            (item) => item?.isSaleEnabled && Number(item?.remaining) > 0,
          ),
      )

      // const sortData = onlySaleCollections.sort((a, b) =>
      //   a.title.localeCompare(b.title),
      // )

      return {
        ...state,
        nftsDataInit: onlySaleCollections,
      }
    })
  },

  nftsData: [],
  setNftsData: (originNfts: DerivativeNFT[]) => {
    set((state) => {
      const nftsHaveMintType = originNfts.filter(
        (item) => item.mintTypes && item.mintTypes.length > 0,
      )
      const notYet = nftsHaveMintType.filter(
        (item) =>
          item.mintTypes &&
          item.mintTypes?.length > 0 &&
          !state.nftsData.map((nft) => nft.index).includes(item.index),
      )
      //  Only show collections that are available for sale
      const onlySaleCollections = notYet.filter?.(
        (item) =>
          item?.mintTypes?.length > 0 &&
          item?.mintTypes?.some(
            (item) => item?.isSaleEnabled && Number(item?.remaining) > 0,
          ),
      )

      // const sortData = onlySaleCollections.sort((a, b) =>
      //   a.title.localeCompare(b.title),
      // )
      return {
        ...state,
        nftsData: [...state.nftsData, ...onlySaleCollections],
      }
    })
  },

  isRefreshingData: false,
  setIsRefreshingData: (value) =>
    set((state) => ({
      ...state,
      isRefreshingData: value,
    })),

  isLoadingGetNFTs: false,
  setIsLoadingGetNFTs: (value) =>
    set((state) => ({
      ...state,
      isLoadingGetNFTs: value,
    })),

  resetCollectionMarket: () => {
    set((state) => {
      return {
        ...state,
        collectionsMarket: [],
        filterMarket: {
          ...state.filterMarket,
          collections: [],
        },
      }
    })
  },

  filterMarket: defaultFilterMarket,
  setFilterMarket: (value: any, type: FilterMarket) => {
    set((state) => {
      let collections = []
      let licenseDuration = []

      switch (type) {
        case FilterMarket.COLLECTIONS:
          if (state.filterMarket.collections.includes(value)) {
            collections = state.filterMarket.collections.filter(
              (item) => item !== value,
            )
          } else {
            collections = [...state.filterMarket.collections, value]
          }

          return {
            ...state,
            filterMarket: {
              ...state.filterMarket,
              collections,
            },
          }

        case FilterMarket.LICENSE_DURATION:
          if (state.filterMarket.licenseDuration.includes(value)) {
            licenseDuration = state.filterMarket.licenseDuration.filter(
              (item) => item !== value,
            )
          } else {
            licenseDuration = [...state.filterMarket.licenseDuration, value]
          }

          return {
            ...state,
            filterMarket: {
              ...state.filterMarket,
              licenseDuration,
            },
          }

        case FilterMarket.IS_SALE:
          return {
            ...state,
            filterMarket: {
              ...state.filterMarket,
              isSale: value,
            },
          }

        case FilterMarket.PRICE:
          return {
            ...state,
            filterMarket: {
              ...state.filterMarket,
              mintPrice: value[0],
              maxPrice: value[1],
            },
          }

        default:
          break
      }
    })
  },

  selectedSidebar: [],
  setSelectedSidebar: (value: string) => {
    set((state) => {
      let selectedSidebar = []
      if (state.selectedSidebar.includes(value)) {
        selectedSidebar = state.selectedSidebar.filter((item) => item !== value)
      } else {
        selectedSidebar = [...state.selectedSidebar, value]
      }

      return {
        ...state,
        selectedSidebar,
      }
    })
  },

  resetPagination: () =>
    set((state) => {
      return {
        ...state,
        currentPage: 0,
        itemOffset: 0,
      }
    }),
  resetAllFilterMarket: () =>
    set((state) => {
      return {
        ...state,
        currentPage: 0,
        itemOffset: 0,
        nftsData: state.nftsDataInit,
        licensesData: state.licensesDataInit,
        selectedSort: {
          value: '',
          bgColor: '#e2e8f0',
          title: '',
        },
        filterMarket: {
          ...state.filterMarket,
          isSale: false,
          mintPrice: 0,
          maxPrice: 5,
          collections: [],
          licenseDuration: [],
        },
      }
    }),

  collectionNfts: [],
  setCollectionNfts: (collections: DerivativeNFT[]) => {
    set((state) => ({
      ...state,
      collectionNfts: collections,
    }))
  },

  collectionLicenses: [],
  setCollectionLicenses: (collections: string[]) => {
    set((state) => ({
      ...state,
      collectionLicenses: collections,
    }))
  },

  selectedSort: {
    value: '',
    title: '',
  },
  setSelectedSort: (selectedSort: SortType) => {
    set((state) => ({
      ...state,
      selectedSort,
    }))
  },

  //CASE 1: all price - has collection - has license duration
  sortDataByAllPriceHasCollectionHasLicenseDuration: () => {
    set((state) => {
      let collections: DerivativeNFT[] = []
      let minions: MinType[] = []
      const { search } = state

      if (search) {
        collections = state.nftsDataInit.filter(
          (item) =>
            state.filterMarket.collections.includes(item.sort.toLowerCase()) &&
            item.mintTypes
              .map((item) =>
                state.filterMarket.licenseDuration.includes(item.expDuration),
              )
              .includes(true) &&
            (item.name.toLowerCase().includes(search) ||
              item.originalContractAddress.toLowerCase().includes(search)),
        )
        minions = state.licensesDataInit.filter(
          (item) =>
            state.filterMarket.collections.includes(
              item.derivativeNFTContractAddress.toLowerCase(),
            ) &&
            state.filterMarket.licenseDuration.includes(item.expDuration) &&
            item.nameForSearch.toLowerCase().includes(search),
        )
      } else {
        collections = state.nftsDataInit.filter((item) => {
          const sort = `${item.originalContractAddress} ${item.tokenId}`
          return (
            state.filterMarket.collections.includes(sort.toLowerCase()) &&
            item.mintTypes
              .map((item) =>
                state.filterMarket.licenseDuration.includes(item.expDuration),
              )
              .includes(true)
          )
        })
        minions = state.licensesDataInit.filter(
          (item) =>
            state.filterMarket.collections.includes(
              item.derivativeNFTContractAddress.toLowerCase(),
            ) && state.filterMarket.licenseDuration.includes(item.expDuration),
        )
      }

      return {
        ...state,
        nftsData: collections,
        licensesData: minions,
      }
    })
  },

  //CASE 2: all price - empty collection - has license duration
  sortDataByAllPriceEmptyCollectionHasLicenseDuration: () => {
    set((state) => {
      let collections: DerivativeNFT[] = []
      let minions: MinType[] = []
      const { search } = state
      if (search) {
        collections = state.nftsDataInit.filter(
          (item) =>
            item.mintTypes
              .map((item) =>
                state.filterMarket.licenseDuration.includes(item.expDuration),
              )
              .includes(true) &&
            (item.name.toLowerCase().includes(search) ||
              item.originalContractAddress.toLowerCase().includes(search)),
        )

        minions = state.licensesDataInit.filter(
          (item) =>
            state.filterMarket.licenseDuration.includes(item.expDuration) &&
            item.nameForSearch.toLowerCase().includes(search),
        )
      } else {
        collections = state.nftsDataInit.filter((item) =>
          item.mintTypes
            .map((item) =>
              state.filterMarket.licenseDuration.includes(item.expDuration),
            )
            .includes(true),
        )

        minions = state.licensesDataInit.filter((item) =>
          state.filterMarket.licenseDuration.includes(item.expDuration),
        )
      }

      return {
        ...state,
        nftsData: collections,
        licensesData: minions,
      }
    })
  },

  //CASE 3: specific price - has collection - has license duration
  sortDataBySpecificPriceHasCollectionHasLicenseDuration: () => {
    set((state) => {
      const { mintPrice, maxPrice, licenseDuration } = state.filterMarket

      let collections: DerivativeNFT[] = []
      let minions: MinType[] = []
      const { search } = state
      if (search) {
        if (maxPrice === defaultFilterMarket.maxPrice) {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map((item) => Number(item.price) >= mintPrice)
                .includes(true) &&
              item.mintTypes
                .map((item) => licenseDuration.includes(item.expDuration))
                .includes(true) &&
              state.filterMarket.collections.includes(
                item.sort.toLowerCase(),
              ) &&
              (item.name.toLowerCase().includes(search) ||
                item.originalContractAddress.toLowerCase().includes(search)),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              licenseDuration.includes(item.expDuration) &&
              state.filterMarket.collections.includes(
                item.derivativeNFTContractAddress.toLowerCase(),
              ) &&
              item.nameForSearch.toLowerCase().includes(search),
          )
        } else {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map(
                  (item) =>
                    Number(item.price) >= mintPrice &&
                    Number(item.price) <= maxPrice,
                )
                .includes(true) &&
              item.mintTypes
                .map((item) => licenseDuration.includes(item.expDuration))
                .includes(true) &&
              state.filterMarket.collections.includes(
                item.sort.toLowerCase(),
              ) &&
              (item.name.toLowerCase().includes(search) ||
                item.originalContractAddress.toLowerCase().includes(search)),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              Number(item.price) <= maxPrice &&
              licenseDuration.includes(item.expDuration) &&
              state.filterMarket.collections.includes(
                item.derivativeNFTContractAddress.toLowerCase(),
              ) &&
              item.nameForSearch.toLowerCase().includes(search),
          )
        }
      } else {
        if (maxPrice === defaultFilterMarket.maxPrice) {
          collections = state.nftsDataInit.filter((item) => {
            return (
              item.mintTypes
                .map((item) => Number(item.price) >= mintPrice)
                .includes(true) &&
              item.mintTypes
                .map((item) => licenseDuration.includes(item.expDuration))
                .includes(true) &&
              state.filterMarket.collections.includes(item.sort.toLowerCase())
            )
          })
          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              licenseDuration.includes(item.expDuration) &&
              state.filterMarket.collections.includes(
                item.derivativeNFTContractAddress.toLowerCase(),
              ),
          )
        } else {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map(
                  (item) =>
                    Number(item.price) >= mintPrice &&
                    Number(item.price) <= maxPrice,
                )
                .includes(true) &&
              item.mintTypes
                .map((item) => licenseDuration.includes(item.expDuration))
                .includes(true) &&
              state.filterMarket.collections.includes(item.sort.toLowerCase()),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              Number(item.price) <= maxPrice &&
              licenseDuration.includes(item.expDuration) &&
              state.filterMarket.collections.includes(
                item.derivativeNFTContractAddress.toLowerCase(),
              ),
          )
        }
      }

      return {
        ...state,
        nftsData: collections,
        licensesData: minions,
      }
    })
  },

  //CASE 4: specific price - empty collection - has license duration
  sortDataBySpecificPriceEmptyCollectionHasLicenseDuration: () => {
    set((state) => {
      const { mintPrice, maxPrice, licenseDuration } = state.filterMarket

      let collections: DerivativeNFT[] = []
      let minions: MinType[] = []
      const { search } = state
      if (search) {
        if (maxPrice === defaultFilterMarket.maxPrice) {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map((item) => Number(item.price) >= mintPrice)
                .includes(true) &&
              item.mintTypes
                .map((item) => licenseDuration.includes(item.expDuration))
                .includes(true) &&
              (item.name.toLowerCase().includes(search) ||
                item.originalContractAddress.toLowerCase().includes(search)),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              licenseDuration.includes(item.expDuration) &&
              item.nameForSearch.toLowerCase().includes(search),
          )
        } else {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map(
                  (item) =>
                    Number(item.price) >= mintPrice &&
                    Number(item.price) <= maxPrice,
                )
                .includes(true) &&
              item.mintTypes
                .map((item) => licenseDuration.includes(item.expDuration))
                .includes(true) &&
              (item.name.toLowerCase().includes(search) ||
                item.originalContractAddress.toLowerCase().includes(search)),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              Number(item.price) <= maxPrice &&
              licenseDuration.includes(item.expDuration) &&
              item.nameForSearch.toLowerCase().includes(search),
          )
        }
      } else {
        if (maxPrice === defaultFilterMarket.maxPrice) {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map((item) => Number(item.price) >= mintPrice)
                .includes(true) &&
              item.mintTypes
                .map((item) => licenseDuration.includes(item.expDuration))
                .includes(true),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              licenseDuration.includes(item.expDuration),
          )
        } else {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map(
                  (item) =>
                    Number(item.price) >= mintPrice &&
                    Number(item.price) <= maxPrice,
                )
                .includes(true) &&
              item.mintTypes
                .map((item) => licenseDuration.includes(item.expDuration))
                .includes(true),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              Number(item.price) <= maxPrice &&
              licenseDuration.includes(item.expDuration),
          )
        }
      }

      return {
        ...state,
        nftsData: collections,
        licensesData: minions,
      }
    })
  },

  //CASE 5: all price - has collection - empty license duration
  sortDataByAllPriceHasCollectionEmptyLicenseDuration: () => {
    set((state) => {
      let collections: DerivativeNFT[] = []
      let minions: MinType[] = []

      const { search } = state

      if (search) {
        collections = state.nftsDataInit.filter(
          (item) =>
            state.filterMarket.collections.includes(item.sort.toLowerCase()) &&
            (item.name.toLowerCase().includes(search) ||
              item.originalContractAddress.toLowerCase().includes(search)),
        )

        minions = state.licensesDataInit.filter(
          (item) =>
            state.filterMarket.collections.includes(
              item.derivativeNFTContractAddress.toLowerCase(),
            ) && item.nameForSearch.toLowerCase().includes(search),
        )
      } else {
        collections = state.nftsDataInit.filter((item) =>
          state.filterMarket.collections.includes(item.sort.toLowerCase()),
        )

        minions = state.licensesDataInit.filter((item) =>
          state.filterMarket.collections.includes(
            item.derivativeNFTContractAddress.toLowerCase(),
          ),
        )
      }

      return {
        ...state,
        nftsData: collections,
        licensesData: minions,
      }
    })
  },

  //CASE 6: all price - empty collection - empty license duration
  sortDataByAllPriceEmptyCollectionEmptyLicenseDuration: () => {
    set((state) => {
      let collections: DerivativeNFT[] = []
      let minions: MinType[] = []
      const { search } = state

      if (search) {
        collections = state.nftsDataInit.filter(
          (e) =>
            e.name.toLowerCase().includes(search) ||
            e.originalContractAddress.toLowerCase().includes(search),
        )

        minions = state.licensesDataInit.filter((e) => {
          return e.nameForSearch.toLowerCase().includes(search)
        })
      } else {
        collections = state.nftsDataInit
        minions = state.licensesDataInit
      }

      return {
        ...state,
        nftsData: collections,
        licensesData: minions,
      }
    })
  },

  //CASE 7: specific price - has collection - empty license duration
  sortDataBySpecificPriceHasCollectionEmptyLicenseDuration: () => {
    set((state) => {
      const { maxPrice, mintPrice } = state.filterMarket

      let collections: DerivativeNFT[] = []
      let minions: MinType[] = []
      const { search } = state
      if (search) {
        if (maxPrice === defaultFilterMarket.maxPrice) {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map((item) => Number(item.price) >= mintPrice)
                .includes(true) &&
              state.filterMarket.collections.includes(
                item.sort.toLowerCase(),
              ) &&
              (item.name.toLowerCase().includes(search) ||
                item.originalContractAddress.toLowerCase().includes(search)),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              state.filterMarket.collections.includes(
                item.derivativeNFTContractAddress.toLowerCase(),
              ) &&
              item.nameForSearch.toLowerCase().includes(search),
          )
        } else {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map(
                  (item) =>
                    Number(item.price) >= mintPrice &&
                    Number(item.price) <= maxPrice,
                )
                .includes(true) &&
              state.filterMarket.collections.includes(
                item.sort.toLowerCase(),
              ) &&
              (item.name.toLowerCase().includes(search) ||
                item.originalContractAddress.toLowerCase().includes(search)),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              Number(item.price) <= maxPrice &&
              state.filterMarket.collections.includes(
                item.derivativeNFTContractAddress.toLowerCase(),
              ) &&
              item.nameForSearch.toLowerCase().includes(search),
          )
        }
      } else {
        if (maxPrice === defaultFilterMarket.maxPrice) {
          collections = state.nftsDataInit.filter((item) => {
            return (
              item.mintTypes
                .map((item) => Number(item.price) >= mintPrice)
                .includes(true) &&
              state.filterMarket.collections.includes(item.sort.toLowerCase())
            )
          })

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              state.filterMarket.collections.includes(
                item.derivativeNFTContractAddress.toLowerCase(),
              ),
          )
        } else {
          collections = state.nftsDataInit.filter(
            (nft) =>
              nft.mintTypes
                .map(
                  (item) =>
                    Number(item.price) >= mintPrice &&
                    Number(item.price) <= maxPrice,
                )
                .includes(true) &&
              state.filterMarket.collections.includes(nft.sort.toLowerCase()),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              Number(item.price) <= maxPrice &&
              state.filterMarket.collections.includes(
                item.derivativeNFTContractAddress.toLowerCase(),
              ),
          )
        }
      }

      return {
        ...state,
        nftsData: collections,
        licensesData: minions,
      }
    })
  },

  //CASE 8: specific price - empty collection - empty license duration
  sortDataBySpecificPriceEmptyCollectionEmptyLicenseDuration: () => {
    set((state) => {
      const { mintPrice, maxPrice } = state.filterMarket

      let collections: DerivativeNFT[] = []
      let minions: MinType[] = []

      const { search } = state
      if (search) {
        if (maxPrice === defaultFilterMarket.maxPrice) {
          collections = state.nftsDataInit.filter(
            (nft) =>
              nft.mintTypes
                .map((item) => Number(item.price) >= mintPrice)
                .includes(true) &&
              (nft.name.toLowerCase().includes(search) ||
                nft.originalContractAddress.toLowerCase().includes(search)),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              item.nameForSearch.toLowerCase().includes(search),
          )
        } else {
          collections = state.nftsDataInit.filter(
            (item) =>
              item.mintTypes
                .map(
                  (item) =>
                    Number(item.price) >= mintPrice &&
                    Number(item.price) <= maxPrice,
                )
                .includes(true) &&
              (item.name.toLowerCase().includes(search) ||
                item.originalContractAddress.toLowerCase().includes(search)),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice &&
              Number(item.price) <= maxPrice &&
              item.nameForSearch.toLowerCase().includes(search),
          )
        }
      } else {
        if (maxPrice === defaultFilterMarket.maxPrice) {
          collections = state.nftsDataInit.filter((item) =>
            item.mintTypes
              .map((item) => Number(item.price) >= mintPrice)
              .includes(true),
          )

          minions = state.licensesDataInit.filter(
            (item) => Number(item.price) >= mintPrice,
          )
        } else {
          collections = state.nftsDataInit.filter((item) =>
            item.mintTypes
              .map(
                (item) =>
                  Number(item.price) >= mintPrice &&
                  Number(item.price) <= maxPrice,
              )
              .includes(true),
          )

          minions = state.licensesDataInit.filter(
            (item) =>
              Number(item.price) >= mintPrice && Number(item.price) <= maxPrice,
          )
        }
      }

      return {
        ...state,
        nftsData: collections,
        licensesData: minions,
      }
    })
  },
}))

export default useStore
