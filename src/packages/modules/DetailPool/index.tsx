import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Hide,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Show,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import MakeDepositModal from '@modules/Modals/market/deposit/MakeDepositModal'
import useStore from 'packages/store'
import {
  checkIfUserHasMintedFreeLicenseFunc,
  getAllOwnedNFTsFunc,
  getHighestOfferFunc,
  getNFTCollectionMetadata,
  getSubscriptionFeeFunc,
} from 'packages/web3'

import MakeDepositDrawer from './Drawers/MakeDepositDrawer'
import Main from './Main'
import SideBarLeft from './SidebarLeft'
import SideBarRight from './SidebarRight'

export default function DetailPool() {
  const {
    balance,
    address,
    highestOffer,
    setHighestOffer,
    collectionInfo,
    setCollectionInfo,
  } = useStore()

  const {
    isOpen: isOpenMakeWithdrawModal,
    onOpen: onOpenMakeWithdrawModal,
    onClose: onCloseMakeWithdrawModal,
  } = useDisclosure()

  const {
    isOpen: isOpenDepositDrawer,
    onOpen: onOpenDepositDrawer,
    onClose: onCloseDepositDrawer,
  } = useDisclosure()
  // DOTO: move pool details and collection details to shared store
  const [subscriptionFee, setSubscriptionFee] = useState<number>()
  const [myNftInPool, setMyNftInPool] = useState<any>([])
  const [userHasMintedFreeLicense, setUserHasMintedFreeLicense] =
    useState<boolean>(false)

  const header = [
    {
      key: 1,
      title: 'Subscription fee',
      text: 'ETH',
      from: subscriptionFee,
    },
    {
      key: 2,
      title: 'License supply',
      text: undefined,
      from: '100',
    },

    {
      key: 3,
      title: 'Highest bid',
      text: 'ETH',
      from: highestOffer,
    },
  ]

  const router = useRouter()
  const { pool, collection } = router.query

  // TODO: remove duplicated func
  const getHighestOffer = useCallback(async () => {
    try {
      if (!pool) return
      const highestOffer = await getHighestOfferFunc(String(pool))
      setHighestOffer(highestOffer)
    } catch (error) {
      console.log(error)
    }
  }, [pool, setHighestOffer])

  const getSubscriptionFee = useCallback(async () => {
    try {
      if (!pool) return
      const subscriptionFee = await getSubscriptionFeeFunc(String(pool))
      setSubscriptionFee(subscriptionFee)
    } catch (error) {
      console.log(error)
    }
  }, [pool])

  const fetchCollectionInfo = useCallback(async () => {
    try {
      if (!collection) return
      const info = await getNFTCollectionMetadata(String(collection))
      setCollectionInfo(info)
    } catch (error) {
      console.log(error)
    }
  }, [collection, setCollectionInfo])

  const getAllNft = useCallback(async () => {
    const allNfts = await getAllOwnedNFTsFunc(address)
    setMyNftInPool(allNfts)
  }, [address, setMyNftInPool])

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

  useEffect(() => {
    getHighestOffer()
    fetchCollectionInfo()
    getSubscriptionFee()
  }, [fetchCollectionInfo, getHighestOffer, getSubscriptionFee])

  useEffect(() => {
    getAllNft()
  }, [getAllNft])

  useEffect(() => {
    if (address) {
      checkIfUserHasMintedFreeLicense(address)
    }
  }, [address, checkIfUserHasMintedFreeLicense])

  return (
    <Box w="100%">
      <Flex
        borderBottom={{ base: 'unset', md: '1px solid rgba(112,75,234,0.5)' }}
        justifyContent={{ base: 'center', lg: 'start' }}
        flexDir={{ base: 'column', md: 'row' }}
        alignItems="center"
        px={{ base: '0px', md: '40px' }}
        py={{ base: '10px' }}
        h={{ base: '100%', lg: '70px' }}
        color="white">
        <Flex
          px={{ base: '20px', md: 'unset' }}
          pb={{ base: '5px' }}
          mr={{ md: '30px', lg: '0px' }}
          justifyContent={{ base: 'space-between', lg: 'flex-start' }}
          alignItems="center"
          w={{ base: '100%', md: '55%', lg: '80%' }}>
          <Flex
            gap={{ lg: '18px' }}
            w={{ base: '100%' }}
            justifyContent={{ base: 'space-between', lg: 'start' }}
            alignItems="center">
            <Flex
              textAlign="center"
              w="fit-content"
              alignItems="center"
              gap={{ base: '7px', md: 'none' }}>
              <Image
                w="48px"
                h="48px"
                objectFit="cover"
                borderRadius="35px"
                alt=""
                src={collectionInfo?.image}
                fallbackSrc="/static/license-template/template.png"
              />
              <Flex alignItems="center">
                <Text
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  maxW="120px"
                  fontSize={{ base: '14px', md: '18px', lg: '18px' }}
                  fontWeight="bold">
                  {collectionInfo?.name}
                </Text>
              </Flex>

              {userHasMintedFreeLicense && (
                <Flex
                  alignItems="center"
                  borderRadius="6px"
                  p="8px 10px"
                  h={{ base: '33px' }}
                  bgColor="#00D39D">
                  <Text
                    fontWeight="500"
                    fontSize={{ base: '10px', lg: '12px' }}
                    color="#2A0668">
                    License Obtained
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Hide above="md">
            <Button
              onClick={onOpenDepositDrawer}
              h="40px"
              w="100px"
              ml={{ base: '10px' }}
              bg="#704BEA"
              fontWeight="900"
              fontSize={{ base: '14px', md: '16px' }}>
              Deposit
            </Button>
          </Hide>
        </Flex>
        <Flex
          px={0}
          border={{ base: '1px solid rgba(112,75,234,0.5)', md: '0px' }}
          w={{ base: '100%', xl: '40%' }}>
          <Box
            sx={{
              scrollbarWidth: 'none',
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            borderRight={{ base: '1px solid rgba(112,75,234,0.5)', lg: '0px' }}
            w="90%"
            p={{ base: '8px 5px', md: '0px' }}
            overflowX="scroll">
            <Flex
              color="rgba(255,255,255,0.8) "
              ml={{ base: '12px', md: 'none' }}>
              <Flex
                justifyContent="center"
                gap={{ base: '20px', md: '30px' }}
                w={{ base: '100%', lg: '100%' }}>
                {header.map((item, idx) => {
                  return (
                    <Flex
                      justifyContent={{ base: 'space-between', md: 'center' }}
                      alignItems={{ base: 'left', md: 'center' }}
                      key={idx}
                      gap="3px"
                      flexDir="column">
                      <Box
                        w={{ lg: '100%' }}
                        fontSize="12px"
                        fontWeight="500"
                        color="#FFA8FE">
                        {item.title}
                      </Box>
                      <Box
                        w={{ lg: '100%' }}
                        fontSize={{ base: '14px', md: '14px' }}
                        color="#FFF">
                        <Flex alignItems="center">
                          <Box
                            mr="px"
                            fontWeight={{ base: '900', md: '700' }}
                            fontSize="14px"
                            mb="3px">
                            {item.from}
                          </Box>
                          <Box
                            fontSize="11px"
                            fontWeight={{ base: '700', md: '500' }}
                            color="rgba(255,255,255,0.8)">
                            {item.text}
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          </Box>

          <Hide above="md">
            {/* <Flex
              w={{ base: '10%', md: '8%' }}
              justifyContent="center"
              alignItems="center">
              <ChevronRightIcon
                w="100%"
                h={{ base: '25%', md: '55%' }}
                color="#FFA8FE"
              />
            </Flex> */}

            <Popover>
              <PopoverTrigger>
                <IconButton
                  h="unset"
                  bg="transparent"
                  _active={{
                    bg: 'transparent',
                  }}
                  _hover={{
                    bg: 'transparent',
                  }}
                  aria-label="right arrow"
                  icon={
                    <ChevronRightIcon
                      w="100%"
                      // h={{ base: '25%', md: '55%' }}
                      color="#FFA8FE"
                    />
                  }
                />
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(63, 29, 172, 0.9)"
                w="100%"
                alignItems="left"
                ml={0}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Flex
                    w="100%"
                    justifyContent={{ base: 'space-evenly', lg: 'unset' }}
                    bg="rgba(63, 29, 172, 0.9)"
                    backdropFilter="blur(9px)"
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
                          fontSize="12px">
                          Fees charged:
                        </Box>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="400">
                          <Box mr="2px" fontWeight="700" fontSize="12px">
                            99,99
                          </Box>
                          <Box fontSize="12px" color="rgba(255,255,255,0.8)">
                            ETH
                          </Box>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Box
                          mr="5px"
                          color="#FFA8FE"
                          fontWeight="500"
                          fontSize="12px">
                          Expenses paid:
                        </Box>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="400">
                          <Box mr="2px" fontWeight="700" fontSize="12px">
                            99,99
                          </Box>
                          <Box fontSize="12px" color="rgba(255,255,255,0.8)">
                            ETH
                          </Box>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Box
                          mr="5px"
                          color="#FFA8FE"
                          fontWeight="500"
                          fontSize="12px">
                          Balance:
                        </Box>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="400">
                          <Box mr="2px" fontWeight="700" fontSize="12px">
                            {balance}
                          </Box>
                          <Box fontSize="12px" color="rgba(255,255,255,0.8)">
                            ETH
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Hide>
        </Flex>
      </Flex>

      <Flex
        display={{ base: 'block', lg: 'flex' }}
        justify="space-between"
        h="100%">
        <Show above="xl">
          <SideBarLeft />
        </Show>
        <Main myNftInPool={myNftInPool} collectionInfo={collectionInfo} />
        <Show above="xl">
          <SideBarRight
            setUserHasMintedFreeLicense={setUserHasMintedFreeLicense}
            userHasMintedFreeLicense={userHasMintedFreeLicense}
            collectionInfo={collectionInfo}
          />
        </Show>
      </Flex>
      <MakeDepositModal
        isOpen={isOpenMakeWithdrawModal}
        onClose={onCloseMakeWithdrawModal}
        isDeposit={false}
      />
      <MakeDepositDrawer
        isOpen={isOpenDepositDrawer}
        onClose={onCloseDepositDrawer}
        isDeposit={true}
      />
    </Box>
  )
}
