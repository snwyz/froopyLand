import { lazy, Suspense, useEffect, useState } from 'react'

import { Box, Flex, SimpleGrid, Spinner } from '@chakra-ui/react'
import ItemGrid from '@components/ListItems/ItemGrid'

import TabsCommon from '@components/TabsCommon'

import { useWindowSize } from '@hooks/useWindowSize'
import useFomoStore from 'packages/store/fomo'
import { getMyAuctions } from 'packages/service/api'
import useStore from 'packages/store'
import { INftList } from 'packages/service/api/types'

const ListItems = lazy(() => import('@components/ListItems'))
const Sidebar = lazy(() => import('@modules/Profile/Sidebar'))
const Header = lazy(() => import('@modules/Profile/Header'))

export default function Main() {
  const { width } = useWindowSize()

  const { address } = useStore()
  const { userHeaderInfo } = useFomoStore()
  const [gameNft, setGameNft] = useState<INftList>({
    total: 0,
    nftList: [],
  })

  let upcomingList = gameNft.nftList.filter((item) => item.status === '0')
  let ongoingList = gameNft.nftList.filter((item) => item.status === '1')
  let finishedList = gameNft.nftList.filter((item) => item.status === '2')

  const fetchList = async () => {
    getMyAuctions(address).then((res) => {
      setGameNft(res)
    })
  }

  useEffect(() => {
    fetchList()
  }, [])

  const renderTabs = [
    {
      id: 0,
      title: `All Auctions (${gameNft.total})`,
      value: 'all',
      render: (
        <SimpleGrid mt="20px" columns={[1, 2, 3, 4, 5]} spacing="20px">
          {gameNft.nftList.map((item, idx) => {
            return <ItemGrid gridName="all" item={item} key={idx} />
          })}
        </SimpleGrid>
      ),
    },
    {
      id: 1,
      title: 'Queuing Auctions',
      value: 'queuing',
      render: (
        <SimpleGrid mt="20px" columns={[1, 2, 3, 4, 5]} spacing="20px">
          {upcomingList.map((item, idx) => {
            return <ItemGrid gridName="all" item={item} key={idx} />
          })}
        </SimpleGrid>
      ),
    },
    {
      id: 2,
      title: 'Ongoing Auctions',
      value: 'ongoing',
      render: (
        <SimpleGrid mt="20px" columns={[1, 2, 3, 4, 5]} spacing="20px">
          {ongoingList.map((item, idx) => {
            return <ItemGrid gridName="ongoing" item={item} key={idx} />
          })}
        </SimpleGrid>
      ),
    },
    {
      id: 3,
      title: 'Finished Auctions',
      value: 'finished',
      render: (
        <SimpleGrid mt="20px" columns={[1, 2, 3, 4, 5]} spacing="20px">
          {finishedList.map((item, idx) => {
            return <ItemGrid gridName="finished" item={item} key={idx} />
          })}
        </SimpleGrid>
      ),
    },
  ]
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" minW={{ base: 'full', md: '500px' }}>
        <Header headers={userHeaderInfo} />
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
              <TabsCommon initTab="all" renderTabs={renderTabs} />
            </Box>
          </Suspense>
        </Box>
      </Box>
    </Flex>
  )
}
