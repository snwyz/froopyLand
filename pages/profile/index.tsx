import { lazy, useEffect, useState } from 'react'

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'

import TabsCommon from '@components/TabsCommon'

import { useWindowSize } from '@hooks/useWindowSize'

import { MarketTabs, MyDividendsTabs } from '@ts'
import { BigNumber } from 'ethers'
import {
  getHistoricalDividendsAndPrize,
  getMyProfit,
} from 'packages/service/api'
import { IProfit, IUserDividends } from 'packages/service/api/types'
import useStore from 'packages/store'

const ListItems = lazy(() => import('@modules/Profile/ListItems'))
const Sidebar = lazy(() => import('@modules/Profile/Sidebar'))
const Header = lazy(() => import('@modules/Profile/Header'))
const RedeemModal = lazy(() => import('@modules/Profile/RedeemModal'))

export default function Main() {
  const { width } = useWindowSize()

  const handleHistoricalPageChange = (page: number) => {
    setCurrentHistoricalPage(page)
  }

  const handleNFTPageChange = (page: number) => {
    setCurrentNFTPage(page)
  }

  const handleHistoricalTabChange = (tab: MyDividendsTabs) => {
    if (tab === MyDividendsTabs.UNCLAIMED) {
      setHistoricalTab(0)
    } else {
      setHistoricalTab(1)
    }
  }

  const { address } = useStore()

  const [open, setOpen] = useState(false)
  const [historicalTab, setHistoricalTab] = useState<number>(0)
  const [currentHistoricalPage, setCurrentHistoricalPage] = useState(1)
  const [currentNFTPage, setCurrentNFTPage] = useState(1)
  const [header, setHeader] = useState([
    {
      name: 'OMO Price',
      number: '-',
    },
    {
      name: 'My Historical Key Holder Dividends',
      number: '-',
    },
    {
      name: 'My Historical Final Winner Prize',
      number: '-',
    },
    {
      name: 'My Historical Final Winner Prize',
      number: '-',
    },
  ])
  const [profit, setProfit] = useState<IProfit>({
    keys: '-',
    flTokens: '-',
    keyDividends: '-',
    unclaimedKeyDividends: '-',
    unclaimedKeyGameIds: [],
    finalWinPrice: '-',
    unclaimedFinalWinPrice: '-',
    unclaimedFinalWinnerGameIds: [],
    nftDividends: '-',
    unclaimedNftDividends: '-',
    unclaimedNftGameIds: [],
  })

  const [historicalDividends, setHistoricalDividends] =
    useState<IUserDividends>({
      total: 0,
      historicalDividendsList: [],
    })

  const renderDividends = [
    {
      id: 0,
      title: 'Unclaimed',
      value: MyDividendsTabs.UNCLAIMED,
      render: (
        <ListItems
          haveGridMode={false}
          columnsGrid={[1, 2, 3, 4, 5]}
          isLoading={false}
          isCustom={false}
          currentPage={currentHistoricalPage}
          setCurrentPage={handleHistoricalPageChange}
          items={historicalDividends.historicalDividendsList}
          columnsList={[
            `${historicalDividends.total} in Total`,
            'Type',
            'Amount',
            'Status',
            'Transaction',
            'Detail',
          ]}
        />
      ),
    },
    {
      id: 1,
      title: 'Claimed',
      value: MyDividendsTabs.CLAIMED,
      render: (
        <ListItems
          haveGridMode={false}
          columnsGrid={[1, 2, 3, 4, 5, 6]}
          isLoading={false}
          isCustom={false}
          currentPage={currentHistoricalPage}
          setCurrentPage={handleHistoricalPageChange}
          items={historicalDividends.historicalDividendsList}
          columnsList={[
            `${historicalDividends.total} in Total`,
            'Type',
            'Amount',
            'Status',
            'Transaction',
            'Detail',
          ]}
        />
      ),
    },
  ]

  const nfts = [
    {
      label: 'Pepe',
      image:
        'https://i.seadn.io/s/raw/files/7720ce176c5f99f259455d9df2e183c0.png?auto=format&dpr=1&w=3840',
      id: '#331',
    },
    {
      label: 'Pepe',
      image:
        'https://i.seadn.io/s/raw/files/d628a7e260cb549690b006ad7d8e459b.png?auto=format&dpr=1&w=3840',
      id: '#99',
    },
    {
      label: 'Pepe',
      image:
        'https://i.seadn.io/s/raw/files/a7c8d34ae894e73f8ac8045a6298d602.png?auto=format&dpr=1&w=3840',
      id: '#932',
    },
  ]
  const renderNFTS = [
    {
      id: 0,
      title: 'Public pool',
      value: MarketTabs.PUBLIC,
      render: (
        <ListItems
          haveGridMode={false}
          columnsGrid={[1, 2, 2, 2]}
          isLoading={false}
          items={nfts}
          isCustom
          columnsList={['3 Total', 'NFT ID', 'Transaction', 'Detail']}
        />
      ),
    },
  ]

  // profit
  useEffect(() => {
    getMyProfit(address)
      .then((res) => {
        if (res.code === '200' && res.data) {
          setHeader([
            {
              name: 'OMO Price',
              number: res.data.flTokens,
            },
            {
              name: 'My Historical Key Holder Dividends',
              number: res.data.keyDividends,
            },
            {
              name: 'My Historical Final Winner Prize',
              number: res.data.finalWinPrice,
            },
            {
              name: 'My Historical Final Winner Prize',
              number: res.data.nftDividends,
            },
          ])
          setProfit(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [address])

  // historical dividends
  useEffect(() => {
    getHistoricalDividendsAndPrize(
      address,
      currentHistoricalPage,
      historicalTab,
    )
      .then((res) => {
        if (res.code === '200' && res.data) {
          setHistoricalDividends(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [address, currentHistoricalPage, historicalTab])

  return (
    <Flex>
      <Sidebar />
      <Box flex="1" minW={{ base: 'full', md: '500px' }}>
        <Header headers={header} />
        <Box m="0 216px" pb="72px">
          <Text
            fontSize="20px"
            lineHeight="24px"
            fontWeight={800}
            color="#fff"
            mt="24px"
            mb="24px">
            My Assets
          </Text>
          {/* My Assets */}
          <Flex gap="30px">
            <Box
              flex={1}
              p="28px 30px"
              border="1px solid #704BEA"
              bgColor="rgba(118, 74, 242, 0.5)"
              borderRadius="20px">
              <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">
                My Keys
              </Text>
              <Flex alignItems="baseline">
                <Text
                  color="#00DAB3"
                  lineHeight="54px"
                  fontSize="36px"
                  fontWeight="900"
                  mr="10px">
                  {profit.keys}
                </Text>
                <Text fontSize="16px" lineHeight="24px">
                  keys
                </Text>
              </Flex>
              {/* <Text>0.056 ETH</Text> */}
              <Button
                disabled={profit.keys === '0' || profit.keys === '-'}
                mt="33px"
                bgColor="#00DAB3"
                w="100%"
                height="52px"
                color="#000"
                fontSize="20px"
                lineHeight="30px"
                onClick={() => setOpen(true)}>
                Redeem
              </Button>
            </Box>
            <Box
              flex={1}
              p="28px 30px"
              border="1px solid #704BEA"
              bgColor="rgba(118, 74, 242, 0.5)"
              borderRadius="20px">
              <Flex justify="space-between" align="center">
                <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">
                  My $OMO
                </Text>
                <Flex align="center">
                  Swap $OMO{' '}
                  <Image
                    src="/static/profile/share.svg"
                    ml="10px"
                    alt="share"
                    w="20px"
                    h="20px"></Image>
                </Flex>
              </Flex>
              <Flex alignItems="baseline">
                <Text
                  color="#00DAB3"
                  lineHeight="54px"
                  fontSize="36px"
                  fontWeight="900"
                  mr="10px">
                  {profit.flTokens}
                </Text>
                <Text fontSize="16px" lineHeight="24px">
                  $OMO
                </Text>
              </Flex>
              {/* <Text>$ 1117.8</Text> */}
              <Flex mt="33px" gap="12px">
                <Button
                  disabled={profit.flTokens === '0' || profit.flTokens === '-'}
                  border="1px solid #704BEA"
                  bg="rgba(118, 74, 242, 0.5)"
                  w="100%"
                  height="52px"
                  color="#9778FF"
                  fontSize="20px"
                  lineHeight="30px"
                  textShadow="0px 0px 30px 0px #390885;">
                  Withdraw
                </Button>
                <Button
                  bgColor="#00DAB3"
                  w="100%"
                  height="52px"
                  color="#000"
                  fontSize="20px"
                  lineHeight="30px">
                  Deposit
                </Button>
              </Flex>
            </Box>
          </Flex>

          <Text
            fontSize="20px"
            lineHeight="24px"
            fontWeight={800}
            color="#fff"
            mt="40px"
            mb="24px">
            My Profit
          </Text>
          {/* My Profit */}
          <Flex
            mt="30px"
            justify="space-between"
            p="28px 30px"
            border="1px solid #704BEA"
            bgColor="rgba(118, 74, 242, 0.5)"
            borderRadius="20px">
            {/* Key Holder Dividends */}
            <Box flexBasis="33.33%" pr="30px">
              <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">
                My Key Holder Dividends
              </Text>
              <Flex alignItems="baseline" mb="16px">
                <Text
                  color="#00DAB3"
                  lineHeight="54px"
                  fontSize="36px"
                  fontWeight="900"
                  mr="10px">
                  {profit.keyDividends !== '-'
                    ? BigNumber.from(profit.keyDividends)
                        .add(BigNumber.from(profit.unclaimedKeyDividends))
                        .toString()
                    : '-'}
                </Text>
                <Text fontSize="16px" lineHeight="24px">
                  ETH
                </Text>
              </Flex>
              <Text color="rgba(255, 255, 255, 0.8)">
                Unclaimed:&nbsp;&nbsp;&nbsp;&nbsp;
                {profit.unclaimedKeyDividends !== '-'
                  ? profit.unclaimedKeyDividends
                  : '-'}{' '}
                ETH
              </Text>
              <Button
                disabled={profit.unclaimedKeyGameIds.length === 0}
                mt="8px"
                bgColor="#00DAB3"
                w="100%"
                height="52px"
                color="#000"
                fontSize="20px"
                lineHeight="30px">
                Claim
              </Button>
            </Box>
            {/* Final Winner Prize */}
            <Box borderLeft="1px solid #704BEA" pl="30px" flexBasis="33.33%">
              <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">
                My Final Winner Prize
              </Text>
              <Flex alignItems="baseline" mb="16px">
                <Text
                  color="#00DAB3"
                  lineHeight="54px"
                  fontSize="36px"
                  fontWeight="900"
                  mr="10px">
                  {profit.finalWinPrice !== '-'
                    ? BigNumber.from(profit.finalWinPrice)
                        .add(BigNumber.from(profit.unclaimedFinalWinPrice))
                        .toString()
                    : '-'}
                </Text>
                <Text fontSize="16px" lineHeight="24px">
                  ETH
                </Text>
              </Flex>
              <Text color="rgba(255, 255, 255, 0.8)">
                Unclaimed:&nbsp;&nbsp;&nbsp;&nbsp;
                {profit.unclaimedFinalWinPrice !== '-'
                  ? profit.unclaimedFinalWinPrice
                  : '-'}{' '}
                ETH
              </Text>
              <Button
                disabled={profit.unclaimedFinalWinnerGameIds.length === 0}
                mt="8px"
                bgColor="#00DAB3"
                w="100%"
                height="52px"
                color="#000"
                fontSize="20px"
                lineHeight="30px">
                Claim
              </Button>
            </Box>
            {/* NFT Provider Dividends */}
            <Box
              borderLeft="1px solid #704BEA"
              pl="30px"
              m="0 100px"
              flexBasis="33.33%">
              <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">
                My NFT Provider Dividends
              </Text>
              <Flex alignItems="baseline" mb="16px">
                <Text
                  color="#00DAB3"
                  lineHeight="54px"
                  fontSize="36px"
                  fontWeight="900"
                  mr="10px">
                  {profit.nftDividends !== '-'
                    ? BigNumber.from(profit.nftDividends)
                        .add(BigNumber.from(profit.unclaimedNftDividends))
                        .toString()
                    : '-'}
                </Text>
                <Text fontSize="16px" lineHeight="24px">
                  ETH
                </Text>
              </Flex>
              <Text color="rgba(255, 255, 255, 0.8)">
                Unclaimed:&nbsp;&nbsp;&nbsp;&nbsp;
                {profit.unclaimedNftDividends !== '-'
                  ? profit.unclaimedNftDividends
                  : '-'}{' '}
                ETH
              </Text>
              <Button
                disabled={profit.unclaimedNftGameIds.length === 0}
                mt="8px"
                bgColor="#00DAB3"
                w="100%"
                height="52px"
                color="#000"
                fontSize="20px"
                lineHeight="30px">
                Claim
              </Button>
            </Box>
          </Flex>

          <Heading mt="50px" fontSize="20px" fontWeight={800} lineHeight="24px">
            My Dividends & Prize
          </Heading>
          <Box mt="20px" textAlign="center">
            <TabsCommon
              initTab={MyDividendsTabs.UNCLAIMED}
              renderTabs={renderDividends}
              onSwitch={(tab) =>
                handleHistoricalTabChange(tab as MyDividendsTabs)
              }
            />
          </Box>
          <Heading mt="50px" fontSize="20px" fontWeight={800} lineHeight="24px">
            My NFTs
          </Heading>
          <Box mt="20px" textAlign="center">
            <TabsCommon
              variant="nonTabs"
              initTab={MarketTabs.PUBLIC}
              renderTabs={renderNFTS}
            />
          </Box>
        </Box>
      </Box>
      <RedeemModal isOpen={open} onClose={() => setOpen(false)} />
    </Flex>
  )
}
