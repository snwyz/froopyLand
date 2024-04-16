import { useState, Suspense, useEffect, lazy } from 'react'

import { Box, Image, Text, Flex, SimpleGrid, Button, Spinner } from '@chakra-ui/react'
import ItemGrid from 'packages/ui/components/ListItems/ItemGrid'
// import { sleep } from '@utils'

import useFomoStore from 'packages/store/fomo'
import NoData from '@components/NoData'
import { faker } from '@faker-js/faker'
import moment from 'moment'
import useAuctions, { ActivityStatus } from 'packages/store/auctions'
import { useRouter } from 'next/router'
import { toastWarning } from '@utils/toast'
// import BidderModal from '@modules/Market/Main/BidderModal'

const BidderModal = lazy(() => import('@modules/Market/Main/BidderModal'))


// TODO 

// 1.  获取游戏信息（包括开始时间，开始状态，出价信息，质押状态） - API 
// data struct
//  createTime
//  state 
//  bidInfo()
// 2.  未登录 / 登录 界面控制

interface Item {
  derivativeContractAddress: string
  originalContractAddress: string
  image: string
  currentNFTInPool: string
  LicenseSupply: string
  name: string
  currentHighestOffer: string
}

// const ListItems = lazy(() => import('@components/ListItems'))


export const generateTimestamp = () => {
  const randomDays = faker.number.int({ min: 1, max: 9 }) // 生成 1 到 9 之间的随机整数
  const randomHours = faker.number.int({ min: 0, max: 23 }) // 生成 0 到 23 之间的随机整数
  const randomMinutes = faker.number.int({ min: 0, max: 59 }) // 生成 0 到 59 之间的随机整数
  const randomSeconds = faker.number.int({ min: 0, max: 59 }) // 生成 0 到 59 之间的随机整数

  const futureDate = moment()
    .add(randomDays, 'days')
    .hour(randomHours)
    .minute(randomMinutes)
    .second(randomSeconds)

  return futureDate.valueOf() / 1000 // 将毫秒级时间戳转换为秒级时间戳
}

const getActionsState = (): ActivityStatus => {
  const now = moment()
  const todayStartTime = moment().startOf('day') // 当天的 0 点 0 时 0 分

  const biddingEndTime = todayStartTime.clone().add(16, 'hours') // 开始时间 + 16 小时
  const stakingEndTime = biddingEndTime.clone().add(8, 'hours') // 出价结束时间 + 8 小时

  let state = ActivityStatus.NotStarted

  if (now.isBefore(todayStartTime)) {
    state = ActivityStatus.NotStarted
  } else if (now.isBetween(todayStartTime, biddingEndTime)) {
    state = ActivityStatus.Bidding
  } else if (now.isBetween(biddingEndTime, stakingEndTime)) {
    state = ActivityStatus.Staking
  } else {
    state = ActivityStatus.Playing
  }

  return state
}

const actionsState = (() => ActivityStatus.Bidding)()  // TEST info

export default function Main() {

  const router = useRouter()


  const [open, setOpen] = useState(false)

  const { gameList, upcomingList, ongoingList, finishedList } = useFomoStore()

  const { auctionInfo, getAuctionInfo }= useAuctions()

  const List = () => {
    if (gameList.length === 0) return <NoData />
    return (
      <>
        <Box padding='0 42px' marginTop="90px">
          <Flex color="#00DAB3" fontSize='24px' height='40px' marginBottom="22px"><Text fontWeight={900} textShadow='0px 0px 10px rgba(0, 218, 179, 1)'>Ongoing Auctions</Text>({ongoingList.length})</Flex>
          <Box h='1px' backgroundColor="rgba(112, 75, 234, 0.5)"></Box>
        </Box>
        <Box padding='0 42px'>
          <SimpleGrid
            mt='20px'
            columns={[1, 2, 3, 4]}
            spacing="20px">
            {ongoingList?.map((item, idx) => {
              return <ItemGrid gridName='ongoingList' item={item} key={idx} />
            })}
          </SimpleGrid>
        </Box>
  
        <Box padding='0 42px' marginTop="55px">
          <Flex color="#00DAB3" fontSize='24px' height='40px' marginBottom="22px"><Text fontWeight={900} textShadow='0px 0px 10px rgba(0, 218, 179, 1)'>Upcoming Auctions</Text>(1) - Queuing</Flex>
          <Box h='1px' backgroundColor="rgba(112, 75, 234, 0.5)"></Box>
        </Box>
        <Box padding='0 42px'>
          <SimpleGrid
            mt='20px'
            columns={[1, 2, 3, 4]}
            spacing="20px">
            {[upcomingList[0]]?.map((item, idx) => {
              return <ItemGrid gridName='upcomingList' item={item} key={idx} />
            })}
          </SimpleGrid>
        </Box>
  
        <Box padding='0 42px' marginTop="55px">
          <Flex color="#00DAB3" fontSize='24px' height='40px' marginBottom="22px"><Text fontWeight={900} textShadow='0px 0px 10px rgba(0, 218, 179, 1)'>Finished Auctions</Text>({finishedList.length})</Flex>
          <Box h='1px' backgroundColor="rgba(112, 75, 234, 0.5)"></Box>
        </Box>
        <Box padding='0 42px'>
          <SimpleGrid
            mt='20px'
            columns={[1, 2, 3, 4]}
            spacing="20px">
            {finishedList?.map((item, idx) => {
              return <ItemGrid gridName='finishedList' item={item} key={idx} />
            })}
          </SimpleGrid>
        </Box>
      </>
    )
  }
  
  const handleBid = (e) => {
    e.stopPropagation()
    if (auctionInfo.status === ActivityStatus.NotStarted) return toastWarning('The activity has not started yet, please stay tuned.')
    setOpen(true)
  }
  

  useEffect(() => {
    getAuctionInfo()
  }, []) 


  if (!auctionInfo) return null

  return (
    <Box alignItems="center" mb="50px">
      <Box padding="0 42px" height="514px" position="relative">
        <Box>
          <Box mt="60px">
            <Image
              marginBottom="40px"
              objectFit="cover"
              src="./static/market/slogen.png"
              alt="slogen"
              w={{ base: '1118px' }}
              height="171px"
            />
            <Flex gap="20px" mb="50px">
              <Flex flexDir="column">
                <Text color="#FFA8FE" fontSize="24px" lineHeight="36px">$FLT Price</Text>
                <Text color="#fff" fontWeight="700" fontSize="32px" lineHeight="48px">$5.40</Text>
              </Flex>
              <Flex flexDir="column">
                <Text color="#FFA8FE" fontSize="24px" lineHeight="36px">Total Keys Fee</Text>
                <Flex align="center"><Image src='/static/common/eth-index.svg' alt='ethereum' w="19px" h="32px" mr="8px"></Image><Text fontSize="32px" lineHeight="48px">5240</Text></Flex>
                <Text color="#fff" fontWeight="700" fontSize="20px" lineHeight="30px">$78.48M</Text>
              </Flex>
              <Flex flexDir="column">
                <Text color="#FFA8FE" fontSize="24px" lineHeight="36px">Total Prize & Dividends</Text>
                <Flex align="center"><Image src='/static/common/eth-index.svg' alt='ethereum' w="19px" h="32px" mr="8px"></Image><Text fontSize="32px" lineHeight="48px">5240</Text></Flex>
                <Text color="#fff" fontWeight="700" fontSize="20px" lineHeight="30px">$78.48M</Text>
              </Flex>
              <Flex flexDir="column">
                <Text color="#FFA8FE" fontSize="24px" lineHeight="36px">Total NFTs Auctioned</Text>
                <Text color="#fff" fontWeight="700" fontSize="32px" lineHeight="48px">$5.40</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" mb="20px">
              {
                ActivityStatus.Staking === auctionInfo.status ? (
                  <Text
                    fontWeight={700}
                    color="#fff"
                    fontSize="20px"
                    lineHeight="30px">
                    {/* You got the chance to auction NFT on {calcStartTime.format('MMMM DD') || 'Mar 26'} */}
                    The NFT auction will start on Mar 28, 0am GMT
                  </Text>
                ) : (
                  <Text
                  fontWeight={700}
                  color="#fff"
                  fontSize="20px"
                  lineHeight="30px">
                  Get the chance to auction NFT on Mar 28, 8pm GMT by bidding a plot of FroopyLand：
                </Text>
                )
              }
              
              {/* <Text fontSize="16px" lineHeight="24px">Registration closes on Feb 14, 12am</Text> */}
            </Flex>
            {[ActivityStatus.NotStarted, ActivityStatus.Bidding].includes(auctionInfo.status) && (
              <Flex pos="relative" _hover={ActivityStatus.NotStarted !== auctionInfo.status ? { cursor: 'pointer' } : null}>
                <Button
                  zIndex="1"
                  fontSize="24px"
                  fontWeight="bold"
                  w="240px"
                  color="#000"
                  h="66px"
                  bgColor="#00DAB3"
                  borderRadius={ActivityStatus.NotStarted === auctionInfo.status ? '10px 0 0 10px' : '10px'}
                  isDisabled={ActivityStatus.NotStarted === auctionInfo.status}
                  onClick={handleBid}>
                  Bid FROMO
                </Button>
                <Flex
                  borderRadius={ActivityStatus.NotStarted === auctionInfo.status ? '0 10px 10px 0' : '10px'}
                  alignItems="center"
                  color="#fff"
                  fontSize="16px"
                  zIndex="0"
                  position="absolute"
                  left={ActivityStatus.NotStarted === auctionInfo.status ? '220px': '210px'}
                  ml="20px"
                  p="20px 24px"
                  h="66px"
                  backgroundColor="rgba(112, 75, 234, 0.5);">
                  <Text>Highest Bid： 570 $FLT</Text>
                  <Text
                    w="1px"
                    h="100%"
                    bg="rgba(255, 255, 255, 0.5)"
                    m="0 16px"></Text>
                  <Text>7 Bidders</Text>
                  <Text
                    w="1px"
                    h="100%"
                    bg="rgba(255, 255, 255, 0.5)"
                    m="0 16px"></Text>
                  <Text color="rgba(255, 255, 255, 0.5)">
                    {/* {
                      auctionInfo.status === ActivityStatus.NotStarted && (
                        `Open on ${calcStartTime.format('MMMM DD, Ha')}`
                      )
                    }
                    {
                      auctionInfo.status === ActivityStatus.Bidding && (
                        `Close on ${calcStartTime.clone().add(moment.duration(16, 'hours')).format('MMMM DD, Ha')}`
                      )
                    } */}
                    Close on Mar 27 16pm
                  </Text>
                  {
                    auctionInfo.status === ActivityStatus.Bidding && (
                      <Image
                      src="./static/market/start.svg"
                      alt="start"
                      onClick={handleBid}
                      w="28px"
                      h="28px"
                      ml="30px"></Image>
                    )
                  }
                </Flex>
              </Flex>
            )}

            {
              ActivityStatus.Staking === auctionInfo.status && (
                <Flex pos="relative" _hover={{ cursor: 'pointer' }}  onClick={() => router.push('/stakeNFT')}>
                  <Button zIndex="1" fontSize='22px' fontWeight='bold' w="240px" color='#000' h='66px' backgroundColor='#00DAB3'>Stake NFT</Button>
                  <Flex borderRadius="10px" alignItems="center" position="absolute" color="#fff" fontSize="16px" zIndex="0" left="210px" ml="20px" p="20px 24px" h='66px' backgroundColor='rgba(112, 75, 234, 0.5);'>
                    <Text>Highest Bid：700 $FLT</Text>
                    <Text w="1px" h="100%" bg="rgba(255, 255, 255, 0.5)" m="0 16px"></Text>
                    <Text>8 Bidders</Text>
                    {/* <Text w="1px" h="100%" bg="rgba(255, 255, 255, 0.5)" m="0 16px"></Text> */}
                    {/* <Text color="rgba(255, 255, 255, 0.5)">Close on Mar 28, 0am</Text> */}
                    <Image src='./static/market/start.svg' alt='start' w="28px" h="28px" ml="30px"></Image>
                  </Flex>
                </Flex>
              )
            }

            {/* <Flex pos="relative" _hover={{ cursor: 'pointer' }}>
              <Flex borderRadius="10px" alignItems="center"  color="#fff" fontSize="16px" zIndex="0" p="20px 24px" h='66px' backgroundColor='rgba(112, 75, 234, 0.5);'>
                <Text fontWeight="700" fontSize="18px" color="#9A7CFF">Bidding Closed</Text>
                <Text w="1px" h="100%" bg="rgba(255, 255, 255, 0.5)" m="0 16px"></Text>
                <Text>Highest Bid：- - $FLT</Text>
                <Text w="1px" h="100%" bg="rgba(255, 255, 255, 0.5)" m="0 16px"></Text>
                <Text>0 Bidders</Text>
                <Text w="1px" h="100%" bg="rgba(255, 255, 255, 0.5)" m="0 16px"></Text>
                <Text color="rgba(255, 255, 255, 0.5)">Close on April 14, 12am</Text>
                <Image src='./static/market/start.svg' alt='start' w="28px" h="28px" ml="30px"></Image>
              </Flex>
            </Flex> */}

          </Box>
          <Image
            position="absolute"
            top={0}
            right="42px"
            objectFit="cover"
            src="./static/market/bg-logo.png"
            alt="logo"
            w="630px"
            h="490px"
          />
        </Box>
      </Box>
      <Box h="1px" backgroundColor="rgba(112, 75, 234, 0.5)"></Box>
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
        <List />
      </Suspense>
      <Suspense>
        <BidderModal isOpen={open} onClose={() => setOpen(false)} />
      </Suspense>
    </Box>
  )
}
