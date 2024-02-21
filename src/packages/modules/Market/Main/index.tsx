import { lazy, Suspense, useCallback, useEffect, useState } from 'react'

import { Box, Spinner } from '@chakra-ui/react'
import { getFactoryContract, getNFTCollectionMetadata } from 'packages/web3'

import TabsCommon from '@components/TabsCommon'

import { sleep } from '@utils'

import { MarketTabs } from '@ts'

const ListItems = lazy(() => import('@components/ListItems'))

export default function Main() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pools, setPools] = useState([])

  // Iterates all collections and returns their info.
  const fetchAllCollectionsInfo = useCallback(async (collectionAddresses) => {
    const requests = collectionAddresses.map(async (address, index) => {
      const DELAY = 200
      await sleep(index * DELAY)
      let info
      try {
        info = await getNFTCollectionMetadata(address)
      } catch (error) {
        console.log(error)
      }
      return info
    })
    return Promise.all(requests)
    //Waiting for all the requests to get resolved.
  }, [])

  const newGetALlNFTAndLicense = useCallback(async () => {
    try {
      setIsLoading(true)
      const factoryContract = getFactoryContract()
      const pools = await factoryContract.methods.getNFTPoolInfo().call()
      const collectionsInfo = await fetchAllCollectionsInfo(
        pools.map((pool) => pool.originalContractAddress),
      )
      setPools(
        pools.map((pool, index) => ({
          ...pool,
          ...collectionsInfo[index],
        })),
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [fetchAllCollectionsInfo])

  useEffect(() => {
    newGetALlNFTAndLicense()
  }, [newGetALlNFTAndLicense])

  const renderTabs = [
    {
      id: 0,
      title: 'Public pool',
      value: MarketTabs.PUBLIC,
      render: (
        <ListItems
          isLoading={isLoading}
          items={pools}
          columnsList={[
            'Pool name',
            'NFTs in pool',
            'Current highest bid',
            'Licenses supply',
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
