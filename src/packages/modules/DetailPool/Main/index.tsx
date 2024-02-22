import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Hide,
  Show,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import MakeDepositModal from '@modules/Modals/market/deposit/MakeDepositModal'
import useStore from 'packages/store'
import {
  checkIfThisPoolHasBeenApprovedFunc,
  checkIfUserHasMintedFreeLicenseFunc,
  getStakedInfoArrayFunc,
} from 'packages/web3'

import GridListMobile from '@components/GridAndList/mobile'

import { DetailItemTabs } from '@ts'

import SideBarRight from '../SidebarRight'
import TabsDetailPool from '../TabsDetailPool'

import ListItems from './ListItems'

type MainDetailPool = {
  collectionInfo: any
  myNftInPool: any[]
}

export default function Main({ collectionInfo, myNftInPool }: MainDetailPool) {
  const {
    isOpen: isOpenMakeDepositModal,
    onOpen: onOpenMakeDepositModal,
    onClose: onCloseMakeDepositModal,
  } = useDisclosure()
  const {
    isOpen: isOpenMakeWithdrawModal,
    onOpen: onOpenMakeWithdrawModal,
    onClose: onCloseMakeWithdrawModal,
  } = useDisclosure()
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure()

  const { balance, address } = useStore()
  const router = useRouter()
  const { pool, collection } = router.query
  const [isApproved, setIsApproved] = useState<boolean>(false)
  const [myNftStakedInPool, setMyNftStakedInPool] = useState<any>([])
  const [myNftExistInPool, setMyNftExistInPool] = useState<any>([])
  const [isLargerThan768] = useMediaQuery('(min-width: 769px)')
  const [userHasMintedFreeLicense, setUserHasMintedFreeLicense] =
    useState<boolean>(false)

  const checkIfUserHasMintedFreeLicense = useCallback(
    async (address: string) => {
      try {
        if (!pool) return
        const check = await checkIfUserHasMintedFreeLicenseFunc(
          String(pool),
          address,
        )
        setUserHasMintedFreeLicense(check)
      } catch (error) {
        console.log(error)
      }
    },
    [pool, setUserHasMintedFreeLicense],
  )

  const checkApproved = useCallback(async () => {
    try {
      if (!collection || !address || !pool) return
      const check = await checkIfThisPoolHasBeenApprovedFunc(
        String(collection).toLocaleLowerCase(),
        address,
        String(pool).toLocaleLowerCase(),
      )
      setIsApproved(check)
    } catch (error) {
      console.log(error)
    }
  }, [address, collection, pool])

  const getStakedInfoArray = useCallback(async () => {
    try {
      if (!pool) return
      let NFTs = await getStakedInfoArrayFunc(String(pool))
      const stakedNfts = NFTs.map((item) => ({
        ...item,
        ...collectionInfo,
      }))
      // convert
      const convert = stakedNfts.map((data) => {
        const { description, image, name, staker, tokenId } = data
        return {
          description,
          image,
          name,
          staker,
          tokenId,
        }
      })
      setMyNftStakedInPool(convert)
    } catch (error) {
      console.log(error)
    }
  }, [collectionInfo, pool, setMyNftStakedInPool])

  const getNftInPool = useCallback(async () => {
    try {
      if (!collection || !myNftInPool) return
      const nfts = myNftInPool.filter(
        (item) =>
          String(item?.contractAddress).toLocaleLowerCase() ===
          String(collection).toLocaleLowerCase(),
      )
      const convert = nfts.map((data) => {
        const {
          contractAddress,
          derivativeAddress,
          image,
          poolAddress,
          title,
          tokenId,
        } = data
        return {
          contractAddress,
          derivativeAddress,
          image,
          poolAddress,
          title,
          tokenId,
        }
      })
      setMyNftExistInPool(convert)
    } catch (error) {
      console.log(error)
    }
  }, [collection, myNftInPool, setMyNftExistInPool])

  useEffect(() => {
    getStakedInfoArray()
    getNftInPool()
    checkApproved()
  }, [checkApproved, getNftInPool, getStakedInfoArray])

  useEffect(() => {
    if (address) {
      checkIfUserHasMintedFreeLicense(address)
    }
  }, [address, checkIfUserHasMintedFreeLicense])

  const renderTabs = [
    {
      id: 0,
      title: 'Staked',
      value: DetailItemTabs.STAKED,
      length: myNftStakedInPool?.length,
      render: (
        <ListItems
          myNftExistInPool={myNftExistInPool}
          setMyNftExistInPool={setMyNftExistInPool}
          myNftStakedInPool={myNftStakedInPool}
          setMyNftStakedInPool={setMyNftStakedInPool}
          setIsApproved={setIsApproved}
          isApproved={isApproved}
          border="none"
          isLoading={false}
          items={myNftStakedInPool}
        />
      ),
    },
    {
      id: 1,
      title: 'My NFTs',
      value: DetailItemTabs.MYNFTS,
      length: myNftExistInPool?.length,
      render: (
        <ListItems
          myNftExistInPool={myNftExistInPool}
          setMyNftExistInPool={setMyNftExistInPool}
          myNftStakedInPool={myNftStakedInPool}
          setMyNftStakedInPool={setMyNftStakedInPool}
          setIsApproved={setIsApproved}
          isApproved={isApproved}
          border="none"
          isLoading={false}
          items={myNftExistInPool}
        />
      ),
    },
  ]
  return (
    <Box flex="1" pos="relative" minH="calc(100vh - 176px)">
      <Hide above="xl">
        <Flex
          p={{ base: '0px', log: '16px 8px' }}
          w="100%"
          px={{ base: '20px', md: '40px' }}
          my={{ base: '12px' }}
          justifyContent="space-between"
          alignItems="center">
          <Flex color="#FFA8FE">
            <Flex
              borderRadius="5px"
              border="1px solid #FFA8FE"
              p={{ base: '8px 10px', md: '8px 12px' }}
              mr="10px"
              justifyContent="space-between"
              alignItems="center">
              <Text
                mr="5px"
                color="#FFF"
                fontWeight="500"
                fontSize={{ base: '12px', md: '14px' }}>
                Show all
              </Text>
              <ChevronDownIcon />
            </Flex>
            <Flex
              borderRadius="5px"
              p={{ base: '8px 10px', md: '8px 12px' }}
              border="1px solid"
              borderColor=" #FFA8FE"
              justifyContent="space-between"
              alignItems="center">
              <Text
                mr="5px"
                fontWeight="500"
                fontSize={{ base: '12px', md: '14px' }}>
                Attributes
              </Text>
              <ChevronDownIcon />
            </Flex>
          </Flex>
          <Flex>
            <Button
              onClick={onOpenDrawer}
              w={{ base: '70px', md: '100px' }}
              bgColor="#00DAB3"
              _active={{
                bg: 'transparent',
                border: '1px solid',
                borderColor: '#00DAB3',
                color: '#00DAB3',
              }}
              _hover={{
                bg: 'transparent',
                border: '1px solid',
                borderColor: '#00DAB3',
                color: '#00DAB3',
              }}
              borderRadius="10px"
              fontWeight="700"
              p="8px 30px"
              color="#000">
              {!isOpenDrawer ? 'Buy' : 'Close'}
            </Button>
            <GridListMobile />
          </Flex>
          <Drawer
            placement={isLargerThan768 ? 'right' : 'bottom'}
            onClose={onCloseDrawer}
            size={{ md: 'md', lg: 'lg' }}
            isOpen={isOpenDrawer}>
            <DrawerContent
              mt="210px"
              bg="#300D7D"
              h={{ base: 'calc(100vh - 32%)', md: 'calc(100vh - 30.5%)' }}
              w="full"
              pos="absolute">
              <DrawerBody px={0}>
                <Flex justifyContent="center">
                  <SideBarRight
                    collectionInfo={collectionInfo}
                    setUserHasMintedFreeLicense={setUserHasMintedFreeLicense}
                    userHasMintedFreeLicense={userHasMintedFreeLicense}
                  />
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Hide>
      <TabsDetailPool initTab={DetailItemTabs.STAKED} renderTabs={renderTabs} />
      <Show above="md">
        <Flex
          pos={{ base: 'unset', md: 'fixed', xl: 'absolute' }}
          bottom="0"
          left="0"
          w="100%"
          justifyContent={{ base: 'space-evenly', lg: 'unset' }}
          bg="rgba(63, 29, 172, 0.9)"
          backdropFilter="blur(9px)"
          border=" 1px solid"
          borderColor="rgba(112, 75, 234, 0.5)"
          borderLeftWidth="0px"
          borderRightWidth="0px"
          h={{ md: '60px', lg: '70px' }}>
          <Flex
            fontSize="14px"
            ml={{ base: '20px', lg: 'unset' }}
            gap={{ base: '19px', lg: 'unset' }}
            flexDir={{ base: 'column', md: 'row' }}
            alignItems="center"
            justifyContent={{ base: 'none', lg: 'space-around' }}
            w={{ base: 'unset', lg: '70%' }}>
            <Flex>
              <Box
                mr="5px"
                color="#FFA8FE"
                fontWeight="500"
                fontSize={{ md: '12px', lg: '14px' }}>
                Fees charged:
              </Box>
              <Flex
                alignItems="center"
                justifyContent="center"
                fontWeight="400">
                <Box
                  mr="2px"
                  fontWeight="700"
                  fontSize={{ md: '12px', lg: '14px' }}>
                  99,99
                </Box>
                <Box
                  fontSize={{ md: '10px', lg: '12px' }}
                  color="rgba(255,255,255,0.8)">
                  ETH
                </Box>
              </Flex>
            </Flex>
            <Flex>
              <Box
                mr="5px"
                color="#FFA8FE"
                fontWeight="500"
                fontSize={{ md: '12px', lg: '14px' }}>
                Expenses paid:
              </Box>
              <Flex
                alignItems="center"
                justifyContent="center"
                fontWeight="400">
                <Box
                  mr="2px"
                  fontWeight="700"
                  fontSize={{ md: '12px', lg: '14px' }}>
                  99,99
                </Box>
                <Box
                  fontSize={{ md: '10px', lg: '12px' }}
                  color="rgba(255,255,255,0.8)">
                  ETH
                </Box>
              </Flex>
            </Flex>
            <Flex>
              <Box
                mr="5px"
                color="#FFA8FE"
                fontWeight="500"
                fontSize={{ md: '12px', lg: '14px' }}>
                Balance:
              </Box>
              <Flex
                alignItems="center"
                justifyContent="center"
                fontWeight="400">
                <Box
                  mr="2px"
                  fontWeight="700"
                  fontSize={{ md: '12px', lg: '14px' }}>
                  {balance}
                </Box>
                <Box
                  fontSize={{ md: '10px', lg: '12px' }}
                  color="rgba(255,255,255,0.8)">
                  ETH
                </Box>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            justifyContent="center"
            gap={{ base: '20px', xl: '15px' }}
            alignItems="center"
            ml={{ base: '40px', md: '25px', lg: 'unset' }}
            mr={{ lg: '15px' }}
            w={{ md: 'unset', lg: '30%' }}
          // mr={{ md: '10px', lg: '0px' }}
          >
            <Button
              onClick={onOpenMakeDepositModal}
              fontSize="14px"
              borderRadius="10px"
              w={{ base: '104px', lg: '134px' }}
              _hover={{ opacity: 0.7 }}
              fontWeight="700"
              bgColor="#704BEA">
              <Box p="10px 30px"> Deposit</Box>
            </Button>
            <Button
              onClick={onOpenMakeWithdrawModal}
              fontSize="14px"
              borderRadius="10px"
              w={{ md: '104px', lg: '134px' }}
              _hover={{ opacity: 0.7 }}
              fontWeight="700"
              bgColor="#704BEA">
              <Box p="10px 30px">Withdraw</Box>
            </Button>
          </Flex>
        </Flex>
      </Show>

      <MakeDepositModal
        isOpen={isOpenMakeDepositModal}
        onClose={onCloseMakeDepositModal}
        isDeposit={true}
      />
      <MakeDepositModal
        isOpen={isOpenMakeWithdrawModal}
        onClose={onCloseMakeWithdrawModal}
        isDeposit={false}
      />
    </Box>
  )
}
