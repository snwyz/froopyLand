import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import GetFreeLicenseModal from '@modules/Modals/market/getFreeLicense/GetFreeLicenseModal'
import MakeOfferModal from '@modules/Modals/market/offer/MakeOfferModal'
import useStore from 'packages/store'
import {
  acceptOfferFunc,
  cancelOfferFunc,
  getHighestOfferFunc,
  getLicenseOwnerListFunc,
  getOffersFunc,
  getPoolTokenCounterFunc
} from 'packages/web3'

import { ellipseAddress, getTitleErrorMetamask } from '@utils'
import { toastError, toastSuccess } from '@utils/toast'

import { ethers } from 'ethers'
import PriceHistory from './PriceHistory'

// TODO: fix any
export default function SideBarRight({
  userHasMintedFreeLicense,
  setUserHasMintedFreeLicense,
  collectionInfo,
}: {
  userHasMintedFreeLicense?: boolean
  setUserHasMintedFreeLicense?: (item: boolean) => void
  collectionInfo: any
}) {
  const router = useRouter()
  const { pool } = router.query
  const {
    address,
    offers,
    setOffers,
    setMintedLicenses,
    mintedLicenses,
    setHighestOffer,
  } = useStore()
  const currentUserOffer = offers.find(
    (offer) => offer.bidder.toLowerCase() === address.toLocaleLowerCase(),
  )
  const [tokenCount, setTokenCount] = useState<number>(0)
  const [selectedOffer, setSelectedOffer] = useState<number>()
  const [isLoadingAcceptOffer, setIsLoadingAcceptOffer] = useState<boolean>()

  const [isLoadingCancelOffer, setIsLoadingCancelOffer] =
    useState<boolean>(false)

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

  const getMintedLicenses = useCallback(async () => {
    try {
      if (!pool) return
      const licenseOwners = await getLicenseOwnerListFunc(String(pool))
      setMintedLicenses(licenseOwners)
    } catch (error) {
      toastError(error.message || 'getMintedLicenses failed')
    }
  }, [pool, setMintedLicenses])

  const getPoolTokenCounter = useCallback(async () => {
    try {
      if (!pool) return
      const count = await getPoolTokenCounterFunc(String(pool))
      setTokenCount(count)
    } catch (error) {
      toastError(error.message || 'getPoolTokenCounter failed')
    }
  }, [pool])

  const getOffers = useCallback(async () => {
    try {
      if (!pool) return
      const offers = await getOffersFunc(String(pool))
      // convert
      const convert = offers.map((data) => {
        const [offerId, bidder, offerAmount, isCancelled] = data
        return {
          offerId,
          bidder,
          offerAmount,
          isCancelled,
        }
      })
      const listOffers = await convert?.filter((offer) => !offer.isCancelled)
      setOffers(listOffers)
    } catch (error) {
      toastError(error.message || 'getOffers failed')
    }
  }, [pool, setOffers])

  const acceptOffer = useCallback(async () => {
    try {
      if (!pool) return
      setIsLoadingAcceptOffer(true)
      await acceptOfferFunc(String(pool))
      await getOffers()
      await getMintedLicenses()
      await getHighestOffer()
      toastSuccess('Accept offer successfully')
    } catch (error) {
      console.log(error)
      toastError(getTitleErrorMetamask(error) || 'Accept offer failed')
    } finally {
      setIsLoadingAcceptOffer(false)
    }
  }, [getHighestOffer, getMintedLicenses, getOffers, pool])

  const cancelOffer = useCallback(
    async (id: string) => {
      try {
        if (!pool) return
        setIsLoadingCancelOffer(true)
        await cancelOfferFunc(String(pool), id)
        await getOffers()
        // TODO: only getHighestOffer again if cancelledOffer.offerAmount === highestOffer
        await getHighestOffer()
        toastSuccess('Cancel offer successfully')
      } catch (error) {
        console.log(error)
        toastError(
          getTitleErrorMetamask(error) ||
            error.message ||
            'Cancel offer failed',
        )
      } finally {
        setIsLoadingCancelOffer(false)
      }
    },
    [getHighestOffer, getOffers, pool],
  )

  useEffect(() => {
    getPoolTokenCounter()
    getOffers()
    getMintedLicenses()
  }, [getMintedLicenses, getOffers, getPoolTokenCounter])

  const {
    isOpen: isOpenMakeOfferModal,
    onOpen: onOpenMakeOfferModal,
    onClose: onCloseMakeOfferModal,
  } = useDisclosure()
  const {
    isOpen: isOpenGetFreeLicenseModal,
    onOpen: onOpenGetFreeLicenseModal,
    onClose: onCloseGetFreeLicenseModal,
  } = useDisclosure()

  return (
    <Flex
      direction="column"
      pos="relative"
      p={{ md: 'none', lg: '16px' }}
      w={{ base: '100%', xl: '300px' }}
      border={{ base: 'none', md: '1px solid ' }}
      borderColor={{ base: 'none', md: '#704BEA80' }}
      // borderBottomWidth={{ base: '0px', xl: '1px solid' }}
      borderTop="none"
      borderBottom="none">
      <Box px={{ base: '12px', md: 'none' }}>
        <PriceHistory />
      </Box>
      <Flex h="100%" w="100%" borderTop="1px solid #704BEA80" mt="20px">
        <Tabs w={{ base: '100%', md: 'none' }} mt="12px">
          <TabList
            justifyContent={{ base: 'space-around', lg: 'flex-start' }}
            borderBottom="0px">
            {['Recent Offers', 'Normal licenses'].map((item, index) => (
              <Tab
                fontWeight="500"
                py="8px"
                color={{ base: '#fff' }}
                px={0}
                key={index}
                whiteSpace="nowrap">
                {item}
              </Tab>
            ))}
          </TabList>

          <TabPanels overflow="hidden" h="95%">
            <TabPanel h="100%" p="0px">
              <Flex
                borderBottom="1px solid #704BEA80"
                borderTop="1px solid #704BEA80"
                color="#FFA8FE"
                fontSize="12px"
                fontWeight="500"
                //
                p={{ base: '15px 0px 8px ', md: '15px 0px 8px 0px' }}
                alignContent="center"
                gap="118px">
                {['Price', 'Bidder'].map((item) => (
                  <Box ml={{ base: '65px', lg: 'unset' }} key={item}>
                    {item}
                  </Box>
                ))}
              </Flex>
              <Box
                sx={{
                  scrollbarWidth: 'none',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
                h="calc(100vh - 562px)"
                overflow="scroll"
                p="10px 0px">
                {offers?.map((item, idx) => {
                  return (
                    <Flex
                      w="100%"
                      pl={{ base: '20px', lg: 'unset' }}
                      fontSize="12px"
                      gap={{ base: '30%', lg: 'unset' }}
                      justifyContent={{ base: 'right', md: 'space-between' }}
                      alignContent="center"
                      fontWeight="500"
                      mb="10px"
                      key={idx}>
                      <Flex color="#fff" w={{ base: 'none', md: '50%' }}>
                        {ethers.utils.formatEther(item.offerAmount)} ETH
                      </Flex>
                      <Box w={{ base: 'none', md: '40%' }} color="#fff">
                        {item?.bidder?.toLowerCase() === address?.toLowerCase()
                          ? 'You'
                          : ellipseAddress(item.bidder, 4)}{' '}
                      </Box>

                      {isLoadingCancelOffer && idx === selectedOffer ? (
                        <Box w="10%">
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xs"
                          />
                        </Box>
                      ) : (
                        <Flex w="10%" cursor="pointer">
                          {item.bidder?.toLowerCase() ===
                            address?.toLowerCase() && (
                            <CloseIcon
                              onClick={() => {
                                cancelOffer(item.offerId)
                                setSelectedOffer(idx)
                              }}
                              cursor="pointer"
                              color="red"
                            />
                          )}
                        </Flex>
                      )}
                    </Flex>
                  )
                })}
              </Box>
            </TabPanel>
            <TabPanel h="100%" p="0px">
              <Flex
                borderBottom="1px solid #704BEA80"
                borderTop="1px solid #704BEA80"
                color="#FFA8FE"
                fontSize="12px"
                // ml={{ base: '20px', md: 'none' }}
                fontWeight="500"
                p="15px 0px 8px 0px"
                alignContent="center"
                gap="50px">
                {['License ID', 'Owners'].map((item, index) => (
                  <Box ml={{ base: '40px', md: 'none' }} key={index}>
                    {item}
                  </Box>
                ))}
              </Flex>
              <Box
                p="10px 0px"
                h="calc(100vh - 562px)"
                sx={{
                  scrollbarWidth: 'none',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
                overflow="scroll">
                {mintedLicenses.map((item, idx) => {
                  return (
                    <Flex
                      gap="80px"
                      ml={{ base: '55px', md: 'none' }}
                      fontSize="12px"
                      fontWeight="500"
                      mb="12px"
                      key={idx}>
                      <Box color="#fff">{idx + 1}</Box>
                      <Box color="#fff">
                        {item?.toLowerCase() === address?.toLowerCase()
                          ? 'You'
                          : ellipseAddress(item)}
                      </Box>
                    </Flex>
                  )
                })}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex
          left="0"
          w="100%"
          bottom="0"
          h="100px"
          pos="absolute"
          alignItems="center">
          <Box w="100%" textAlign="center">
            {userHasMintedFreeLicense && offers.length > 0 && (
              <>
                <Button
                  onClick={acceptOffer}
                  fontWeight="500"
                  isLoading={isLoadingAcceptOffer}
                  fontSize="14px"
                  _hover={{ opacity: 0.7 }}
                  color="rgba(255,255,255,0.8)"
                  borderRadius="10px"
                  border="1px solid #704BEA!important"
                  variant="outline">
                  Accept offer
                </Button>
                <Box mb="10px" />
              </>
            )}

            {!userHasMintedFreeLicense && (
              <Button
                onClick={onOpenMakeOfferModal}
                fontWeight="500"
                fontSize="14px"
                _hover={{ opacity: 0.7 }}
                color="rgba(255,255,255,0.8)"
                borderRadius="10px"
                border="1px solid #704BEA!important"
                variant="outline">
                Make offer
              </Button>
            )}
            <Box mb="10px" />

            {!currentUserOffer &&
              !userHasMintedFreeLicense &&
              tokenCount <= 100 && (
                <Button
                  onClick={onOpenGetFreeLicenseModal}
                  fontWeight="500"
                  fontSize="14px"
                  _hover={{ opacity: 0.7 }}
                  color="rgba(255,255,255,0.8)"
                  borderRadius="10px"
                  border="1px solid #704BEA!important"
                  variant="outline">
                  {`Get for free (${100 - tokenCount} left)`}
                </Button>
              )}
          </Box>
        </Flex>
        <MakeOfferModal
          isOpen={isOpenMakeOfferModal}
          onClose={onCloseMakeOfferModal}
          collectionInfo={collectionInfo}
        />
        <GetFreeLicenseModal
          userHasMintedFreeLicense={userHasMintedFreeLicense}
          setUserHasMintedFreeLicense={setUserHasMintedFreeLicense}
          isOpen={isOpenGetFreeLicenseModal}
          onClose={onCloseGetFreeLicenseModal}
          collectionInfo={collectionInfo}
        />
      </Flex>
    </Flex>
  )
}
