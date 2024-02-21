import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

import { DerivativeNFT, MinType } from '@ts'

type MyPersistState = {
  licensesDataInitPersist: MinType[]
  setLicensesDataInitPersist: (minTypes: MinType[]) => void
  setUpdateLicensesDataInitPersist: (item: MinType) => void

  nftsDataInitPersist: DerivativeNFT[]
  setNftsDataInitPersist: (nfts: DerivativeNFT[]) => void
}
type MyPersist = (
  config: StateCreator<MyPersistState>,
  options: PersistOptions<MyPersistState>,
) => StateCreator<MyPersistState>

const usePersistStore = create<MyPersistState>(
  (persist as unknown as MyPersist)(
    (set) => ({
      licensesDataInitPersist: [],
      setLicensesDataInitPersist: (licensesDataInitPersist: MinType[]) => {
        //  Only show licenses that are available for sale
        const onlySaleMintTypes = licensesDataInitPersist?.filter(
          (item) => item.isSaleEnabled && Number(item.remaining) > 0,
        )

        // const sortData = onlySaleMintTypes.sort((a, b) =>
        //   a.title.localeCompare(b.title),
        // )
        set((state) => {
          return {
            ...state,
            licensesDataInitPersist: onlySaleMintTypes,
          }
        })
      },

      setUpdateLicensesDataInitPersist: (item: MinType) => {
        set((state) => {
          const updateLicensesData = state.licensesDataInitPersist.map(
            (minion) => {
              if (
                minion.derivativeNFTContractAddress ===
                  item.derivativeNFTContractAddress &&
                item.mintType === minion.mintType
              ) {
                return { ...item, remaining: item.remaining - 1 }
              } else return minion
            },
          )

          return {
            ...state,
            licensesDataInitPersist: updateLicensesData,
          }
        })
      },

      nftsDataInitPersist: [],
      setNftsDataInitPersist: (nftsDataInitPersist: DerivativeNFT[]) => {
        set((state) => {
          const onlySaleCollections = nftsDataInitPersist.filter?.(
            (item) =>
              item?.mintTypes?.length > 0 &&
              item?.mintTypes?.some(
                (item) => item?.isSaleEnabled && Number(item?.remaining) > 0,
              ),
          )

          const sortData = onlySaleCollections.sort((a, b) =>
            a.title.localeCompare(b.title),
          )
          return {
            ...state,
            nftsDataInitPersist: sortData,
          }
        })
      },
    }),
    { name: 'poolz-persist' },
  ),
)

export default usePersistStore
