import { useCallback, useState } from 'react'

import {
  Button,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { approveFunc } from 'packages/web3'

import BaseModal from '@components/Modal'

import { toastError } from '@utils/toast'

import StakeToPoolModal from './account/unlicensedNFT/StakeToPoolModal'

type ApproveLicenseContractModalProps = {
  isOpen?: boolean
  onClose?: () => void
  item?: any
  isApproved?: boolean
  setIsApproved?: (item: boolean) => void
}

const ApproveLicenseContractModal = ({
  isOpen,
  item,
  onClose,
  setIsApproved,
}: ApproveLicenseContractModalProps) => {
  const {
    isOpen: isOpenStakeToPoolModal,
    onOpen: onOpenStakeToPoolModal,
    onClose: onCloseStakeToPoolModal,
  } = useDisclosure()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isLargerThan768] = useMediaQuery('(min-width: 769px)')
  const approvePoolToStake = useCallback(async () => {
    try {
      setIsLoading(true)
      await approveFunc(item?.poolAddress, item?.contractAddress)
      setIsApproved(true)
      onClose()
      onOpenStakeToPoolModal()
    } catch (error) {
      setIsLoading(false)
      toastError(error)
    }
  }, [
    item?.contractAddress,
    item?.poolAddress,
    onClose,
    onOpenStakeToPoolModal,
    setIsApproved,
  ])

  return (
    <>
      <BaseModal
        size={{ base: 'xs', sm: 'md', md: 'lg', xl: '5xl' }}
        isOpen={isOpen}
        buttons={
          <Button
            isLoading={isLoading}
            onClick={approvePoolToStake}
            m="auto"
            my="20px"
            w="290px"
            borderRadius="10px"
            fontSize="20px"
            fontWeight="700"
            h="66px"
            color="#fff"
            bg="#704BEA"
            _hover={{ bg: '#704BEA' }}>
            Approve
          </Button>
        }
        onClose={onClose}
        bgColor={useColorModeValue ? '#fff' : '#fff'}>
        <VStack mb="15px" spacing="24px">
          {isLargerThan768 ? (
            <Flex
              flexDirection="column"
              lineHeight={{ base: 'unset', md: '55px' }}>
              <Text
                fontSize={{ base: '24px', md: '40px' }}
                fontWeight="900"
                justifyContent="center"
                display="flex"
                textColor="#704BEA">
                WE NEED ACCESS TO YOUR NFT
              </Text>
              <Text
                fontSize={{ base: '24px', md: '40px' }}
                textColor="#704BEA"
                fontWeight="900"
                justifyContent="center"
                display="flex">
                DO YOU APPROVE
              </Text>
            </Flex>
          ) : (
            <Flex
              flexDirection="column"
              lineHeight={{ base: 'unset', md: '55px' }}>
              <Text
                fontSize={{ base: '24px', md: '40px' }}
                fontWeight="900"
                justifyContent="center"
                display="flex"
                textColor="#704BEA">
                WE NEED ACCESS TO YOUR NFT - DO YOU APPROVE ?
              </Text>
            </Flex>
          )}

          <Text
            fontSize={{ base: '13px', md: '16px' }}
            textColor="#704BEA"
            fontWeight="400"
            lineHeight="155.99%"
            justifyContent="center"
            display="flex">
            To setup license sales, we need the abilty to stake your NFT to the
            pool. We&apos;re setting up a smart contract for your NFT. By
            clicking approve, you are enabling us to continue the licensing
            process. You can revoke this permission at any time.
          </Text>
        </VStack>
      </BaseModal>
      <StakeToPoolModal
        isOpen={isOpenStakeToPoolModal}
        onClose={onCloseStakeToPoolModal}
        item={item}
      />
    </>
  )
}

export default ApproveLicenseContractModal
