import { lazy, Suspense, useEffect } from 'react'

import { Box, Flex, Spinner, SimpleGrid } from '@chakra-ui/react'
import ItemGrid from '@components/ListItems/ItemGrid'

import TabsCommon from '@components/TabsCommon'

import { useWindowSize } from '@hooks/useWindowSize'
import useFomoStore from 'packages/store/fomo'
import { web3Modal } from 'packages/web3'
import { ethers } from 'ethers'


const ListItems = lazy(() => import('@components/ListItems'))
const Sidebar = lazy(() => import('@modules/Profile/Sidebar'))
const Header = lazy(() => import('@modules/Profile/Header'))

export default function Main() {
  const { width } = useWindowSize()

  const { setGameList, ongoingList, upcomingList, finishedList, gameList } = useFomoStore()

  const fetchList = async () => {
    const provider = await web3Modal.connect()
    const library = new ethers.providers.Web3Provider(provider)
    setGameList(library)
  }

  useEffect(() => {
    fetchList()
  }, [])

  const headers = [
    {
      name: 'OMO Price',
      number: '$ 56',
    },
    {
      name: 'My Key Holder Dividends',
      number: '52 ETH',
    },
    {
      name: 'My NFT Provider Dividends',
      number: '16 ETH',
    },
    {
      name: 'My Final Winner Prize',
      number: '10 ETH',
    },
  ]

  const renderTabs = [
    {
      id: 0,
      title: 'All Auctions',
      value: 'all',
      render: (
        <SimpleGrid
          mt='20px'
          columns={[1, 2, 3, 4, 5]}
          spacing="20px">
          {gameList.map((item, idx) => {
            return <ItemGrid gridName='all' item={item} key={idx} />
          })}
        </SimpleGrid>
        ),
    },
    {
      id: 1,
      title: 'Queuing Auctions',
      value: 'queuing',
      render: (
        <SimpleGrid
          mt='20px'
          columns={[1, 2, 3, 4, 5]}
          spacing="20px">
          {upcomingList.map((item, idx) => {
            return <ItemGrid gridName='all' item={item} key={idx} />
          })}
        </SimpleGrid>
        ),
    },
    {
      id: 2,
      title: 'Ongoing Auctions',
      value: 'ongoing',
      render: (
        <SimpleGrid
          mt='20px'
          columns={[1, 2, 3, 4, 5]}
          spacing="20px">
          {ongoingList.map((item, idx) => {
            return <ItemGrid gridName='ongoing' item={item} key={idx} />
          })}
        </SimpleGrid>
        ),
    },
    {
      id: 3,
      title: 'Finished Auctions',
      value: 'finished',
      render: (
        <SimpleGrid
          mt='20px'
          columns={[1, 2, 3, 4, 5]}
          spacing="20px">
          {finishedList.map((item, idx) => {
            return <ItemGrid gridName='finished' item={item} key={idx} />
          })}
        </SimpleGrid>
        ),
    },
  ]
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" minW={{ base: 'full', md: '500px' }}>
        <Header headers={headers} />
        <Box textAlign="center">
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
            <Box p="25px 50px">
              <TabsCommon
                initTab='all'
                renderTabs={renderTabs}
              />
            </Box>
          </Suspense>
        </Box>
      </Box>
    </Flex>
  )
}
