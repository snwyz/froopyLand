import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRouter } from 'next/router'

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import useStore from 'packages/store'
import {
  getHighestOfferFunc,
  getOffersFunc,
  getSubscriptionFeeFunc,
  makeOfferFunc,
} from 'packages/web3'

import { getTitleErrorMetamask } from '@utils'
import { toastError, toastSuccess } from '@utils/toast'

import MakeOfferSuccessModal from './MakeOfferSuccessModal'

// TODO: fix any
type MakeOfferModalProps = {
  isOpen: boolean
  onClose: () => void
  collectionInfo: any
}

type MakeOfferFormValue = {
  price: string
  duration: string
}

const MakeOfferModal = ({
  isOpen,
  onClose,
  collectionInfo,
}: MakeOfferModalProps) => {
  const {
    isOpen: isOpenMakeOfferSuccessModal,
    onOpen: onOpenMakeOfferSuccessModal,
    onClose: onCloseMakeOfferSuccessModal,
  } = useDisclosure()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setOffers, highestOffer, setHighestOffer } = useStore()
  const [] = useState<number>()
  const [subscriptionFee, setSubscriptionFee] = useState<number>()

  const router = useRouter()
  const { pool } = router.query

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

  // TODO: remove duplicated func
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

  const getSubscriptionFee = useCallback(async () => {
    try {
      if (!pool) return
      const subscriptionFee = await getSubscriptionFeeFunc(String(pool))
      setSubscriptionFee(subscriptionFee)
    } catch (error) {
      console.log(error)
    }
  }, [pool])

  const makeOffer = useCallback(
    async (amount: string) => {
      try {
        setIsLoading(true)
        if (!pool) return
        await makeOfferFunc(String(pool), amount)
        await getOffers()
        await getHighestOffer()
        onClose()
        onOpenMakeOfferSuccessModal()
        toastSuccess('Make offer successfully')
      } catch (error) {
        console.log(error)
        toastError(
          getTitleErrorMetamask(error) || error.message || 'Make offer failed',
        )
      } finally {
        setIsLoading(false)
      }
    },
    [getHighestOffer, getOffers, onClose, onOpenMakeOfferSuccessModal, pool],
  )

  useEffect(() => {
    getHighestOffer()
    getSubscriptionFee()
  }, [getHighestOffer, getSubscriptionFee])

  const { isOpen: isOpenDescription, onToggle: onToggleDescription } =
    useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MakeOfferFormValue>()
  const onSubmit: SubmitHandler<MakeOfferFormValue> = (data) => {
    makeOffer(String(data.price))
  }
  return (
    <>
      <Modal
        variant="offer"
        size={{ base: 'xs', sm: 'md', md: 'lg', lg: '2xl' }}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay
          bg="rgba(19, 2, 48, 0.8)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          backdropFilter="blur(5px)"
        />
        <form
          style={{ padding: '0px 12px 12px' }}
          onSubmit={handleSubmit(onSubmit)}>
          <ModalContent
            bgColor={useColorModeValue ? '#fff' : '#fff'}
            borderRadius="16px">
            <ModalCloseButton
              size="4xl"
              color="#606062"
              pos="absolute"
              top="18px"
              right="24px"
            />
            <ModalHeader p={0} mb="20px">
              <Flex gap="24px">
                <Box mr={{ lg: '18px' }} textAlign="center">
                  <Image
                    w="48px"
                    h="48px"
                    objectFit="cover"
                    borderRadius="35px"
                    alt=""
                    src={collectionInfo?.image}
                    fallbackSrc="/static/license-template/template.png"
                  />
                </Box>
                <Flex justifyContent="space-evenly" flexDirection="column">
                  <Text fontWeight="700" fontSize="22px">
                    {collectionInfo?.name}
                  </Text>
                  <Text
                    textColor="rgba(0,0,0,0.6)"
                    fontWeight="400"
                    fontSize="14px">
                    Subscription fee: {subscriptionFee} ETH/Month
                  </Text>
                </Flex>
              </Flex>
            </ModalHeader>
            <ModalBody p="0px">
              <Box
                h="500px"
                sx={{
                  scrollbarWidth: 'none',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
                overflow="scroll">
                <Box mt="30px">
                  <Flex
                    justifyContent="space-between"
                    cursor="pointer"
                    onClick={onToggleDescription}
                    align="center">
                    <Flex align="center">
                      <Text fontSize="16px" lineHeight="23px" fontWeight="700">
                        Description
                      </Text>
                    </Flex>
                    {!isOpenDescription ? (
                      <ChevronUpIcon w={5} h={5} />
                    ) : (
                      <ChevronDownIcon w={5} h={5} />
                    )}
                  </Flex>
                  <Collapse in={!isOpenDescription} animateOpacity>
                    <Text
                      textColor="#606062"
                      fontWeight="400"
                      fontSize="13px"
                      p={{ base: '15px 12px', md: '15px 0px' }}>
                      {collectionInfo?.description || 'No description'}
                    </Text>
                  </Collapse>
                </Box>
                <Divider m="10px 0px 30px" />
                {/* <Box
                  bg="#f4f4f4"
                  borderRadius="10px"
                  py={{ base: '18px', lg: '28px' }}
                  px="35px">
                  <Flex flexDir="column" gap="17px">
                    <Flex justifyContent="space-between">
                      <Text fontSize="16px" fontWeight="500">
                        Highest offer
                      </Text>
                      <Text fontSize="16px" fontWeight="400">
                        {highestOffer} ETH
                      </Text>
                    </Flex>
                  </Flex>
                </Box> */}
                <FormControl mt="29px" isInvalid={errors.price ? true : false}>
                  <FormLabel
                    fontSize="16px"
                    fontWeight="500"
                    textColor="rgba(29,24,23,0.8)">
                    Price
                  </FormLabel>
                  <InputGroup mt="15px">
                    <Input
                      borderRadius="10px"
                      placeholder="Enter price"
                      border="2px solid #DFE2E6"
                      h="52px"
                      _focusVisible={{
                        borderColor: '#DFE2E6',
                      }}
                      {...register('price', {
                        required: true,
                        pattern: {
                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                          message: 'Please enter number on this field',
                        },
                      })}
                    />
                    <InputRightElement p="10px 30px 0px 0px">
                      <Text
                        fontSize="16px"
                        fontWeight="500"
                        textColor="#1d1817">
                        ETH
                      </Text>
                    </InputRightElement>
                  </InputGroup>
                  {errors.price && (
                    <FormErrorMessage>Price is required.</FormErrorMessage>
                  )}
                  <ErrorMessage
                    errors={errors}
                    name="price"
                    render={({ message }) => (
                      <Text textColor="#E53E3E" fontSize="14px">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>
                <Flex
                  mt="27px"
                  gap="8px"
                  p="14px 20px 18px"
                  bg="rgba(255, 168, 254, 0.1)"
                  borderRadius="10px">
                  <Image
                    src="/static/modals/question_icon.svg"
                    alt="icon"
                    h="17px"
                  />
                  <Text textColor="#704bea" fontSize="12px" fontWeight="400">
                    When your bid is higher, you need to wait for the holding
                    user to decide whether to transfer. If the holder chooses to
                    transfer, you need to pay the subscription fee according to
                    your bid.
                  </Text>
                </Flex>
              </Box>
            </ModalBody>

            <ModalFooter display="flex" justifyContent="center">
              <Button
                isLoading={isLoading}
                type="submit"
                m="auto"
                mt="20px"
                w="290px"
                borderRadius="10px"
                fontSize="20px"
                fontWeight="900"
                h="66px"
                color="#fff"
                bg="#704BEA"
                _hover={{ bg: '#704BEA' }}>
                Make Offer
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <MakeOfferSuccessModal
        isOpen={isOpenMakeOfferSuccessModal}
        onClose={onCloseMakeOfferSuccessModal}
      />
    </>
  )
}

export default MakeOfferModal
