import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import SuccessfullyObtainedModal from '@modules/Modals/SuccessfullyObtainedModal'
import useStore from 'packages/store'
import {
  checkIfUserHasMintedFreeLicenseFunc,
  getLicenseOwnerListFunc,
  getSubscriptionFeeFunc,
  mintFreeLicenseFunc,
} from 'packages/web3'

import BaseModal from '@components/Modal'

import { getTitleErrorMetamask } from '@utils'
import { toastError } from '@utils/toast'

// TODO: fix any
type GetFreeLicenseModalProps = {
  isOpen: boolean
  onClose: () => void
  collectionInfo: any
  userHasMintedFreeLicense?: boolean
  setUserHasMintedFreeLicense?: (item: boolean) => void
}

const GetFreeLicenseModal = ({
  isOpen,
  onClose,
  collectionInfo,
  setUserHasMintedFreeLicense,
}: GetFreeLicenseModalProps) => {
  const { address, setMintedLicenses } = useStore()
  const { isOpen: isOpenDescription, onToggle: onToggleDescription } =
    useDisclosure()
  const router = useRouter()
  const { pool } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [subscriptionFee, setSubscriptionFee] = useState<number>()

  const isNormalLicense = router.asPath.includes('normal-license')
  const isFixedTermLicense = router.asPath.includes('fixed-term-license')
  const {
    isOpen: isOpenSuccessfullyObtainedModal,
    onOpen: onOpenSuccessfullyObtainedModal,
    onClose: onCloseSuccessfullyObtainedModal,
  } = useDisclosure()

  const mintFreeLicense = useCallback(async () => {
    try {
      setIsLoading(true)
      if (!pool) return
      await mintFreeLicenseFunc(String(pool))
      const licenseOwners = await getLicenseOwnerListFunc(String(pool))
      setMintedLicenses(licenseOwners)
      const check = await checkIfUserHasMintedFreeLicenseFunc(
        String(pool),
        address,
      )
      if (check) {
        setUserHasMintedFreeLicense(check)
      }
      onClose()
      onOpenSuccessfullyObtainedModal()
    } catch (error) {
      console.log(error)
      toastError(
        getTitleErrorMetamask(error) ||
          error.message ||
          'Get free license failed',
      )
    } finally {
      setIsLoading(false)
    }
  }, [
    address,
    onClose,
    onOpenSuccessfullyObtainedModal,
    pool,
    setMintedLicenses,
    setUserHasMintedFreeLicense,
  ])

  const getSubscriptionFee = useCallback(async () => {
    try {
      if (!pool) return
      const subscriptionFee = await getSubscriptionFeeFunc(String(pool))
      setSubscriptionFee(subscriptionFee)
    } catch (error) {
      console.log(error)
    }
  }, [pool])

  useEffect(() => {
    getSubscriptionFee()
  }, [getSubscriptionFee])

  return (
    <>
      <BaseModal
        variant="offer"
        size={{ base: 'xs', sm: 'md', lg: '2xl' }}
        isOpen={isOpen}
        buttons={
          <Button
            isLoading={isLoading}
            onClick={mintFreeLicense}
            m="auto"
            mt="20px"
            _hover={{
              bg: '#704BEA',
            }}
            w="290px"
            borderRadius="10px"
            fontSize="20px"
            fontWeight="900"
            h="66px"
            color="#fff"
            bg="#704BEA">
            Get it for free
          </Button>
        }
        onClose={onClose}>
        <Box>
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

          {isNormalLicense && (
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
                What you should pay attention to is that after you purchase the
                license, when other users bid higher, you need to consider
                whether to transfer it. If you choose to continue to hold, you
                need to pay the subscription fee according to the highest bid.
              </Text>
            </Flex>
          )}
          {isFixedTermLicense && (
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
                The purchase of a Fixed-term license only requires a one-time
                payment and can be held stably for a fixed period.
              </Text>
            </Flex>
          )}
          {!isFixedTermLicense && !isNormalLicense && (
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
                It should be noted that after purchasing a common license, you
                need to consider whether to transfer it when other users bid
                higher. If you choose to continue to hold, you need to pay the
                subscription fee according to the highest bid. If you purchase a
                Fixed-term license, you only need a one-time payment to hold it
                stably for a fixed period.
              </Text>
            </Flex>
          )}
        </Box>
      </BaseModal>
      <SuccessfullyObtainedModal
        collectionInfo={collectionInfo}
        isOpen={isOpenSuccessfullyObtainedModal}
        onClose={onCloseSuccessfullyObtainedModal}
      />
    </>
  )
}

export default GetFreeLicenseModal
