import { Suspense, lazy, useEffect, useMemo, useState } from 'react'

import { Box, Image, Text, Flex, SimpleGrid, Spinner, Button } from '@chakra-ui/react'
import ItemGrid from 'packages/ui/components/ListItems/ItemGrid'
// import { sleep } from '@utils'

import useFomoStore from 'packages/store/fomo'
import NoData from '@components/NoData'
import { faker } from '@faker-js/faker'
import moment from 'moment'
import useAuctions, { ActivityStatus } from 'packages/store/auctions'
import { useRouter } from 'next/router'
import { toastWarning } from '@utils/toast'

const BidderModal = lazy(() => import('@modules/Market/Main/BidderModal'))


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

const actionsState = (() => ActivityStatus.Staking)()  // TEST info


export default function Main() {

  const router = useRouter()

  const [upcomingList, setUpcomingList] = useState([])
  const [ongoingList, setOngoingList] = useState([])
  const [finishedList, setFinishedList] = useState([])
  const [open, setOpen] = useState(false)

  const { gameList } = useFomoStore()

  const { startTime, state, roundInfo } = useAuctions()
  
  // const getActivityStatus  = (startTime: Moment) => {
  //   if (!startTime) return ActivityStatus.NotStarted
  //   console.log(startTime.format('YYYY-MM-DD'), '<=====startTime')
    
  //   const biddingEndTime = startTime.add(moment.duration(16, 'hours'))
  //   const stakingEndTime = biddingEndTime.clone().add(moment.duration(8, 'hours'))

  //   let state = ActivityStatus.NotStarted

  //   if (moment().isBefore(startTime)) {
  //     state = ActivityStatus.NotStarted
  //   } else if (moment().isBetween(startTime, biddingEndTime)) {
  //     state = ActivityStatus.Bidding
  //   } else if (moment().isBetween(biddingEndTime, stakingEndTime)) {
  //     state = ActivityStatus.Staking
  //   } else {
  //     state = ActivityStatus.Playing
  //   }
  //   return state
  // }

  const calcStartTime = useMemo(() => moment(Number(roundInfo?.bidStartTimePoint) * 1000), [roundInfo])

  // const actionsState = useMemo(()=> getActivityStatus(moment(Number(roundInfo?.bidStartTimePoint) * 1000)), [roundInfo])

  // getActionsState() 

  
  console.log(actionsState, 'actionsState')
  
  const generateMockData = (list) => {
    const num = 6
    const len = num - list.length
    if (len <= 0) return []
    return Array.from({ length: len }, (_) => {
      const clonedItem = { ...list[0] }
      delete clonedItem.id 
      delete clonedItem.state
      const imageUrls = [
        'https://i.seadn.io/s/raw/files/1c27508d0d3016e1d18e63b81c861c81.png?auto=format&dpr=1&w=1000',
        'https://i.seadn.io/gcs/files/1877dff2c72f4e338d7c1200c925e718.png?auto=format&dpr=1&w=1000',
        'https://i.seadn.io/gcs/files/bff9ff793f644326c6bb8891803d1fbd.png?auto=format&dpr=1&w=1000',
        'https://i.seadn.io/s/raw/files/7c50c8ce58d8976aaf8d9097a5568e20.png?auto=format&dpr=1&w=1000',
        'https://i.seadn.io/s/raw/files/f404c42f90ab3d63d5f7d43eeb97d583.png?auto=format&dpr=1&w=1000',
        'https://i.seadn.io/s/raw/files/3bf515fc55478ba57bf56ada5a02031a.png?auto=format&dpr=1&w=1000'
      ]
      
      return {
        ...clonedItem,
        id: 0,
        endTime: generateTimestamp(),
        startTimestamp: generateTimestamp(),
        isClone: true,
        nftName: faker.internet.userName() + '-' + faker.number.int({ min: 1, max: 100 }),
        nftImage: imageUrls[faker.number.int({ min: 0, max: 5 })]
      }
    })
  }

  const renderList = () => {
    if (!gameList.length) return
    const upcomingList = gameList.filter(v => v.state === 0)
    const ongoingList = gameList.filter(v => v.state === 1)
    const finishedList = gameList.filter(v => v.state === 2)
    setUpcomingList([upcomingList[0]])
    setOngoingList(ongoingList.concat(generateMockData(ongoingList)))
    setFinishedList(finishedList.concat(generateMockData(finishedList)))
  }



  useEffect(() => {
    renderList()
  }, [gameList])

  // const renderTabs = [
  //   {
  //     id: 0,
  //     title: 'Game List',
  //     value: MarketTabs.PUBLIC,
  //     render: (
  //       <ListItems
  //         isLoading={isLoading}
  //         items={gameList}
  //         columnsList={[
  //           'NFT name',
  //           'NFT Provider Address',
  //           'Key Price (Ether)',
  //           'Start time',
  //           'State'
  //         ]}
  //       />
  //     ),
  //   },
  // ]

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
            columns={[1, 2, 3, 4, 5, 6]}
            spacing="20px">
            {ongoingList?.map((item, idx) => {
              return <ItemGrid gridName='ongoingList' item={item} key={idx} />
            })}
          </SimpleGrid>
        </Box>
  
        <Box padding='0 42px' marginTop="55px">
          <Flex color="#00DAB3" fontSize='24px' height='40px' marginBottom="22px"><Text fontWeight={900} textShadow='0px 0px 10px rgba(0, 218, 179, 1)'>Upcoming Auctions</Text>({upcomingList.length}) - Queuing</Flex>
          <Box h='1px' backgroundColor="rgba(112, 75, 234, 0.5)"></Box>
        </Box>
        <Box padding='0 42px'>
          <SimpleGrid
            mt='20px'
            columns={[1, 2, 3, 4, 5, 6]}
            spacing="20px">
            {upcomingList?.map((item, idx) => {
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
            columns={[1, 2, 3, 4, 5, 6]}
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
    if (actionsState === ActivityStatus.NotStarted) return toastWarning('The activity has not started yet, please stay tuned.')
    setOpen(true)
  }


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
            <Image
              marginBottom="54px"
              objectFit="cover"
              src="./static/market/price-list.png"
              alt="logo"
              w="1034px"
              h="123px"
            />
            <Flex alignItems="center" mb="20px">

              {
                ActivityStatus.Staking === actionsState ? (
                  <Text
                    fontWeight={700}
                    color="#fff"
                    fontSize="20px"
                    lineHeight="30px">
                    You got the chance to auction NFT on {calcStartTime.format('MMMM DD')}
                  </Text>
                ) : (
                  <Text
                  fontWeight={700}
                  color="#fff"
                  fontSize="20px"
                  lineHeight="30px">
                  Get the chance to auction NFT on{' '}
                  {calcStartTime.format('MMMM DD')} by bidding a plot of
                  FroopyLand：
                </Text>
                )
              }
              
              {/* <Text fontSize="16px" lineHeight="24px">Registration closes on Feb 14, 12am</Text> */}
            </Flex>
            {[ActivityStatus.NotStarted, ActivityStatus.Bidding].includes(
              actionsState,
            ) && (
              <Flex pos="relative" _hover={ActivityStatus.NotStarted !== actionsState ? { cursor: 'pointer' } : null}>
                <Button
                  zIndex="1"
                  fontSize="24px"
                  fontWeight="bold"
                  w="240px"
                  color="#000"
                  h="66px"
                  bgColor="#00DAB3"
                  borderRadius={ActivityStatus.NotStarted === actionsState ? '10px 0 0 10px' : '10px'}
                  isDisabled={ActivityStatus.NotStarted === actionsState}
                  onClick={handleBid}>
                  Bid
                </Button>
                <Flex
                  borderRadius={ActivityStatus.NotStarted === actionsState ? '0 10px 10px 0' : '10px'}
                  alignItems="center"
                  color="#fff"
                  fontSize="16px"
                  zIndex="0"
                  position="absolute"
                  left={ActivityStatus.NotStarted === actionsState ? '220px': '210px'}
                  ml="20px"
                  p="20px 24px"
                  h="66px"
                  backgroundColor="rgba(112, 75, 234, 0.5);">
                  <Text>Highest Bid：- - $FLT</Text>
                  <Text
                    w="1px"
                    h="100%"
                    bg="rgba(255, 255, 255, 0.5)"
                    m="0 16px"></Text>
                  <Text>0 Bidders</Text>
                  <Text
                    w="1px"
                    h="100%"
                    bg="rgba(255, 255, 255, 0.5)"
                    m="0 16px"></Text>
                  <Text color="rgba(255, 255, 255, 0.5)">
                    {
                      actionsState === ActivityStatus.NotStarted && (
                        `Open on ${calcStartTime.format('MMMM DD, Ha')}`
                      )
                    }
                    {
                      actionsState === ActivityStatus.Bidding && (
                        `Close on ${calcStartTime.clone().add(moment.duration(16, 'hours')).format('MMMM DD, Ha')}`
                      )
                    }
                  </Text>
                  {
                    actionsState === ActivityStatus.Bidding && (
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
              ActivityStatus.Staking === actionsState && (
                <Flex pos="relative" _hover={{ cursor: 'pointer' }}  onClick={() => router.push('/stakeNFT')}>
                  <Button zIndex="1" fontSize='24px' fontWeight='bold' w="240px" color='#000' h='66px' backgroundColor='#00DAB3'>Stake NFT</Button>
                  <Flex borderRadius="10px" alignItems="center" position="absolute" color="#fff" fontSize="16px" zIndex="0" left="210px" ml="20px" p="20px 24px" h='66px' backgroundColor='rgba(112, 75, 234, 0.5);'>
                    <Text>Highest Bid：20 $FLT</Text>
                    <Text w="1px" h="100%" bg="rgba(255, 255, 255, 0.5)" m="0 16px"></Text>
                    <Text>9 Bidders</Text>
                    <Text w="1px" h="100%" bg="rgba(255, 255, 255, 0.5)" m="0 16px"></Text>
                    <Text color="rgba(255, 255, 255, 0.5)">Close on April 14, 12am</Text>
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
      <BidderModal isOpen={open} onClose={() => setOpen(false)} />
    </Box>
  )
}
