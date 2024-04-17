import { lazy, useEffect, useState } from 'react'

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'

import TabsCommon from '@components/TabsCommon'

import { useWindowSize } from '@hooks/useWindowSize'

import { MarketTabs, MyDividendsTabs } from '@ts'
import { BigNumber, ethers } from 'ethers'
import {
  getHistoricalDividendsAndPrize,
  getMyPurchasedNfts,
} from 'packages/service/api'
import {
  IProfit,
  IUserDividends,
  IUserRetrieved,
} from 'packages/service/api/types'
import useStore from 'packages/store'
import useFomoStore from 'packages/store/fomo'
import { checkApprovalFunc } from 'packages/web3'

const ListItems = lazy(() => import('@modules/Profile/ListItems'))
const Sidebar = lazy(() => import('@modules/Profile/Sidebar'))
const Header = lazy(() => import('@modules/Profile/Header'))
const RedeemModal = lazy(() => import('@modules/Profile/RedeemModal'))
const OmoModal = lazy(() => import('@modules/Profile/OmoModal'))

export default function Main() {
  const { width } = useWindowSize()
  const { userHeaderInfo, getUserHeaderInfo } = useFomoStore()

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

  const handleOpenOmo = (type: number) => {
    if (type === 1) {
      checkApprovalFunc().then((res) => {
        if (res) {
          setOmoType(type)
          setOpenOmo(true)
        }
      })
    } else {
      setOmoType(type)
      setOpenOmo(true)
    }
  }

  const { address } = useStore()

  const [open, setOpen] = useState(false)
  const [oepnOmo, setOpenOmo] = useState(false)
  const [omoType, setOmoType] = useState<number>(0)
  const [historicalTab, setHistoricalTab] = useState<number>(0)
  const [currentHistoricalPage, setCurrentHistoricalPage] = useState(0)
  const [currentNFTPage, setCurrentNFTPage] = useState(0)
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

  const [purchasedNfts, setPurchasedNfts] = useState<IUserRetrieved>({
    total: 0,
    gameNftList: [],
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
          items={
            historicalDividends
              ? historicalDividends.historicalDividendsList
              : []
          }
          columnsList={[
            `${historicalDividends ? historicalDividends.total : 0} in Total`,
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
          items={
            historicalDividends
              ? historicalDividends.historicalDividendsList
              : []
          }
          columnsList={[
            `${historicalDividends ? historicalDividends.total : 0} in Total`,
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
          items={purchasedNfts ? purchasedNfts.gameNftList : []}
          currentPage={currentNFTPage}
          setCurrentPage={handleNFTPageChange}
          isCustom
          columnsList={[
            `${purchasedNfts ? purchasedNfts.total : 0} Total `,
            'NFT ID',
            'Transaction',
            'Detail',
          ]}
        />
      ),
    },
  ]

  // profit
  useEffect(() => {
    getUserHeaderInfo(address).then((res) => {
      if (res) {
        setProfit(res)
      }
    })
  }, [address, getUserHeaderInfo])

  // historical dividends
  useEffect(() => {
    getHistoricalDividendsAndPrize(
      address,
      currentHistoricalPage,
      historicalTab,
    )
      .then((res) => {
        if (res) {
          setHistoricalDividends(res)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [address, currentHistoricalPage, historicalTab])

  // my nfts
  useEffect(() => {
    getMyPurchasedNfts(address, currentNFTPage)
      .then((res) => {
        if (res) {
          setPurchasedNfts(res)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [address, currentNFTPage])

  return (
    <Flex>
      <Sidebar />
      <Box flex="1" minW={{ base: 'full', md: '500px' }}>
        <Header headers={userHeaderInfo} />
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
                  My $OMO
                </Text>
                <Flex align="center">
                  Swap $OMO{' '}
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
                  {profit.flTokens && profit.flTokens !== '-'
                    ? ethers.utils.formatEther(profit.flTokens)
                    : '-'}
                </Text>
                <Text fontSize="16px" lineHeight="24px">
                  $OMO
                  $OMO
                </Text>
              </Flex>
              {/* <Text>$ 1117.8</Text> */}
              <Flex mt="33px" gap="12px">
                <Button
                  disabled={profit.flTokens === '0' || profit.flTokens === '-'}
                  onClick={() => handleOpenOmo(0)}
                  border="1px solid #FCFBFF"
                  bg="transparent"
                  w="100%"
                  height="52px"
                  color="#FFFFFF"
                  _hover={{ color: '#000000', bg: '#00DAB3' }}
                  fontSize="20px"
                  lineHeight="30px"
                  textShadow="0px 0px 30px 0px #390885;">
                  Withdraw
                </Button>
                <Button
                  onClick={() => handleOpenOmo(1)}
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
      <OmoModal
        type={omoType}
        isOpen={oepnOmo}
        isApproval={false}
        onClose={() => setOpenOmo(false)}
      />
    </Flex>
  )
}
