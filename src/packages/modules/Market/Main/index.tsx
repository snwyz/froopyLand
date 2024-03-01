import { Suspense, useEffect, useState } from 'react'

import { Box, Image, Button, Text, Flex, SimpleGrid, Spinner } from '@chakra-ui/react'
import ItemGrid from 'packages/ui/components/ListItems/ItemGrid'
// import { sleep } from '@utils'

import useFomoStore from 'packages/store/fomo'
import NoData from '@components/NoData'
import { faker } from '@faker-js/faker'
import moment from 'moment'

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



export default function Main() {

  const [upcomingList, setUpcomingList] = useState([])
  const [ongoingList, setOngoingList] = useState([])
  const [finishedList, setFinishedList] = useState([])

  const { gameList } = useFomoStore()


  const generateTimestamp = () => {
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

  const generateMockData = (list, len) => {
    return Array.from({ length: len }, (_) => {
      const clonedItem = { ...list[0] }
      delete clonedItem.id 
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
        endTime: generateTimestamp(),
        startTimestamp: generateTimestamp(),
        nftImage: imageUrls[faker.number.int({ min: 0, max: 5 })]
      }
    })
  }

  const renderList = () => {
    const upcomingList = gameList.filter(v => v.state === 0)
    const ongoingList = gameList.filter(v => v.state === 1)
    const finishedList = gameList.filter(v => v.state === 2)
    
    setUpcomingList(upcomingList.concat(generateMockData(upcomingList, 4)))
    setOngoingList(ongoingList.concat(generateMockData(ongoingList, 5)))
    setFinishedList(finishedList.concat(generateMockData(finishedList, 3)))
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
  


  return (
    <Box alignItems="center" mb="50px">
      <Box padding='0 42px' height='514px' position='relative'>
        <Box>
          <Box mt='60px'>
            <Image marginBottom='40px' objectFit='cover' src='./static/market/slogen.png' alt="slogen" w={{ base: '1118px'  }} height="171px" />
            <Image marginBottom='54px' objectFit='cover' src='./static/market/price-list.png' alt="logo" w='1034px' h='123px' />
            <Button fontSize='24px' fontWeight='bold' w="280px" color='#000' h='66px' backgroundColor='#00DAB3'>Start a Auction</Button>
          </Box>
          <Image position='absolute' top={0} right='42px' objectFit='cover' src='./static/market/bg-logo.png' alt="logo" w='630px' h='490px' />
        </Box>
      </Box>
      <Box h='1px' backgroundColor="rgba(112, 75, 234, 0.5)"></Box>
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
    </Box>
  )
}
