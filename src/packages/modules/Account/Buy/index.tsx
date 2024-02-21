import { lazy, Suspense } from 'react'

import { Box, Flex, Spinner } from '@chakra-ui/react'

import TabsCommon from '@components/TabsCommon'

import { useWindowSize } from '@hooks/useWindowSize'

import { MarketTabs } from '@ts'

const ListItems = lazy(() => import('@components/ListItems'))
const Sidebar = lazy(() => import('../Sidebar'))
const Header = lazy(() => import('../Header'))

export default function Main() {
  const { width } = useWindowSize()
  const headers = [
    {
      name: 'Total paid',
      number: '56 ETH',
    },
    {
      name: 'Total revenue',
      number: '52 ETH',
    },
    {
      name: 'Number of NFTs',
      number: '16',
    },
    {
      name: 'Staked NFT',
      number: '10',
    },
  ]

  const renderTabs = [
    {
      id: 0,
      title: 'Public pool',
      value: MarketTabs.PUBLIC,
      render: (
        <ListItems
          haveGridMode={false}
          columnsGrid={[1, 2, 3, 3, 4, 5]}
          isLoading={false}
          items={Array.from({ length: 20 })}
          columnsList={
            width > 768
              ? [
                `Pool name`,
                'NFTs in pool',
                'Highest bid',
                // 'Highest offer',
                'Duration',
                'Balance',
                'Status',
              ]
              : [`Pool name`, 'Bid', 'Time', 'Status']
          }
        // columnsList={[
        //   `${20} Total`,
        //   'NFT in pool',
        //   'Subscription fee',
        //   'Current highest bid',
        //   'Highest offer',
        //   'Duration',
        //   'My offer',
        // ]}
        />
      ),
    },
  ]
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" minW={{ base: 'full', md: '500px' }}>
        <Header title="My Licenses" quantity={20} headers={headers} />
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
            <TabsCommon
              variant="nonTabs"
              initTab={MarketTabs.PUBLIC}
              renderTabs={renderTabs}
            />
          </Suspense>
        </Box>
      </Box>
    </Flex>
  )
}
