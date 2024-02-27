import { Suspense, lazy, useState } from 'react'

import { Box, Spinner } from '@chakra-ui/react'

// import { sleep } from '@utils'
import TabsCommon from '@components/TabsCommon'

import { MarketTabs } from '@ts'

interface Item {
  derivativeContractAddress: string
  originalContractAddress: string
  image: string
  currentNFTInPool: string
  LicenseSupply: string
  name: string
  currentHighestOffer: string
}

const ListItems = lazy(() => import('@components/ListItems'))


export const iData = [
  {
    derivativeContractAddress: '0x7bfd9a55f4c00783b5a8ea18f7735e1a405dd520',
    originalContractAddress: 'string',
    name: 'NNNNN',
    image: 'https://api.our-metaverse.xyz/ourms/4_pnghash_a660da5ab5d19878015e8a5f7a7da3c196b834eb50ac65a62f1dbf339cd96ef5_73222158.webp',
    startTime: '10:29',
    state: 'Active',
    currentHighestOffer: '2000',
    owner: 'Xxxx',
    id: 999
  }
]

export default function Main() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pools, setPools] = useState([])

  // // Iterates all collections and returns their info.
  // const fetchAllCollectionsInfo = useCallback(async (collectionAddresses) => {
  //   const requests = collectionAddresses.map(async (address, index) => {
  //     const DELAY = 200
  //     await sleep(index * DELAY)
  //     let info
  //     try {
  //       info = await getNFTCollectionMetadata(address)
  //     } catch (error) {
  //       console.log(error)
  //     }   
  //     return info
  //   })
  //   return Promise.all(requests)
  //   //Waiting for all the requests to get resolved.
  // }, [])

  // const newGetALlNFTAndLicense = useCallback(async () => {
  //   try {
  //     setIsLoading(true)
  //     const factoryContract = getFactoryContract()
  //     const pools = await factoryContract.methods.getNFTPoolInfo().call()
  //     const collectionsInfo = await fetchAllCollectionsInfo(
  //       pools.map((pool) => pool.originalContractAddress),
  //     )
  //     setPools(
  //       pools.map((pool, index) => ({
  //         ...pool,
  //         ...collectionsInfo[index],
  //       })),
  //     )
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [fetchAllCollectionsInfo])

  // useEffect(() => {
  //   newGetALlNFTAndLicense()
  // }, [newGetALlNFTAndLicense])

  const renderTabs = [
    {
      id: 0,
      title: 'Game List',
      value: MarketTabs.PUBLIC,
      render: (
        // <StyledTable columns={columns} dataSource={data} pagination={false} />
        <ListItems
          isLoading={isLoading}
          items={iData}
          columnsList={[
            'NFT name',
            'NFT Provider Address',
            'Key Sold',
            'Start time',
            'State'
          ]}
        />
      ),
    },
  ]

  return (
    <Box alignItems="center" mb="50px">
      <Suspense
        fallback={
          <Box mt="300px">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        }>
        <TabsCommon
          variant="mainTabs"
          initTab={MarketTabs.PUBLIC}
          renderTabs={renderTabs}
        />
      </Suspense>
    </Box>
  )
}
