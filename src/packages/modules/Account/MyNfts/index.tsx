import { lazy, Suspense, useCallback, useEffect, useState } from 'react'

import { Box, Flex, Spinner, useBreakpointValue } from '@chakra-ui/react'
import useStore from 'packages/store'
import {
  getAllOwnedNFTsFunc,
  newSplitToCommercializationListsV1,
} from 'packages/web3'

import TabsCommon from '@components/TabsCommon'

import { MyNFTsTabs } from '@ts'

const ListItems = lazy(() => import('@components/ListItems'))
const Sidebar = lazy(() => import('../Sidebar'))
const Header = lazy(() => import('../Header'))

export default function Main() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { itemOffset, address, setIsLoadingGetNFTs } = useStore()

  const [myNfts, setMyNfts] = useState([])
  const [dataNfts, setDataNfts] = useState({
    availableNfts: [],
    commercializedNfts: [],
  })

  const itemsPerPage =
    useBreakpointValue(
      {
        base: 4,
        sm: 4,
        md: 9,
        lg: 12,
        xl: 15,
        '2xl': 18,
      },
      {
        fallback: 'md',
      },
    ) ?? 15

  const endOffset = itemOffset + itemsPerPage

  const currentItems = myNfts.slice(itemOffset, endOffset)

  const loadNFTs = useCallback(async () => {
    try {
      setIsLoadingGetNFTs(true)
      setIsLoading(true)
      const allNfts = await getAllOwnedNFTsFunc(address)
      if (allNfts) {
        const res = await newSplitToCommercializationListsV1(allNfts)
        if (res) {
          setDataNfts(res)
          setMyNfts(allNfts)
        }
        setIsLoadingGetNFTs(false)
        setIsLoading(false)
      } else {
        setIsLoadingGetNFTs(false)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoadingGetNFTs(false)
      setIsLoading(false)
    }
  }, [address, setIsLoadingGetNFTs])

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
      number: `${myNfts.length}`,
    },
    {
      name: 'Staked NFT',
      number: '10',
    },
  ]

  const renderTabs = [
    {
      id: 0,
      title: 'Licensable NFTs',
      value: MyNFTsTabs.UNLICENSED_NFT,
      render: (
        <ListItems
          haveGridMode={false}
          columnsGrid={[1, 2, 3, 3, 4, 5]}
          isLoading={isLoading}
          items={currentItems}
          columnsList={[
            `Name`,
            'Address',
            'Floor price',
            'Corresponding public pool',
            '',
          ]}
        />
      ),
    },
    {
      id: 1,
      title: 'Licensed NFTs',
      value: MyNFTsTabs.LICENSED_NFT,
      render: (
        <ListItems
          haveGridMode={false}
          columnsGrid={[1, 2, 3, 3, 4, 5]}
          isLoading={false}
          items={dataNfts.commercializedNfts}
          columnsList={[
            `${30} Total`,
            'Pool name',
            'Current highest bid',
            'Subscription fee',
            'Total revenue',
            'Lock status',
            '',
          ]}
        />
      ),
    },
  ]

  useEffect(() => {
    if (address) {
      loadNFTs()
    }
  }, [address, loadNFTs])
  return (
    <Flex>
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
        <Sidebar />
        <Box flex="1" minW={{ base: 'full', md: '500px' }}>
          <Header
            title="My NFTs"
            quantity={20}
            headers={headers}
            button={null}
          />
          <Box>
            <TabsCommon
              variant="tabsMyAccount"
              initTab={MyNFTsTabs.UNLICENSED_NFT}
              renderTabs={renderTabs}
            />
          </Box>
        </Box>
      </Suspense>
    </Flex>
  )
}
