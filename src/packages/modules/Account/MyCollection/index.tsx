import { lazy, Suspense } from 'react'

import { Box, Flex, Spinner } from '@chakra-ui/react'

import TabsCommon from '@components/TabsCommon'

import { MarketTabs } from '@ts'

const ListItems = lazy(() => import('@components/ListItems'))
const Sidebar = lazy(() => import('../Sidebar'))
const Header = lazy(() => import('../Header'))

export default function Main() {
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
          items={Array.from({ length: 10 })}
          columnsList={[
            'Pool name',
            'NFTs in pool',
            'Highest bid',
            'Licenses supply',
          ]}
        />
      ),
    },
  ]
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" minW={{ base: 'full', md: '500px' }}>
        <Header title="My Collection" quantity={20} headers={headers} />
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
