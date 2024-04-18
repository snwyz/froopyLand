import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'

import BaseModal from '@components/Modal'
import { ethers } from 'ethers'
import useStore from 'packages/store'
import {
  approveBidTokenFunc,
  depositBidTokenFunc,
  getBalanceOfFunc,
  withdrawBidTokenFunc,
} from 'packages/web3'
import { useEffect, useState } from 'react'

type SubmitOfferModalProps = {
  type: number
  omoAmount: string
  withdrawalAmount: string
  isApproval: boolean
  isOpen: boolean
  onClose: () => void
}

const OmoModal = ({
  type,
  omoAmount,
  withdrawalAmount,
  isApproval,
  isOpen,
  onClose,
}: SubmitOfferModalProps) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const { address, balance, setBalance } = useStore()
  const [amount, setAmount] = useState(null)
  const [useAmount, setUseAmount] = useState(0)
  const [approve, setApprove] = useState(false)

  const handleAmountChange = (type: number) => {
    setLoading(true)
    if (type === 1 && !approve) {
      approveBidTokenFunc()
        .then((res) => {
          if (res) {
            setApprove(true)
            toast({
              title: `Success to approve $OMO.`,
              status: 'success',
              duration: 3000,
              isClosable: false,
              position: 'top',
            })
          } else {
            toast({
              title: `Failed to approve $OMO.`,
              status: 'error',
              duration: 3000,
              isClosable: false,
              position: 'top',
            })
          }
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          toast({
            title: `Failed to approve $OMO.`,
            status: 'error',
            duration: 3000,
            isClosable: false,
            position: 'top',
          })
          setLoading(false)
        })
    } else if (type === 1 && approve) {
      depositBidTokenFunc(amount)
        .then((res) => {
          if (res) {
            toast({
              title: `You have successfully deposited $OMO.`,
              status: 'success',
              duration: 3000,
              isClosable: false,
              position: 'top',
            })
            setUseAmount(amount)
          } else {
            toast({
              title: `You failed to deposited $OMO due to some error.`,
              status: 'error',
              duration: 3000,
              isClosable: false,
              position: 'top',
            })
          }
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          toast({
            title: `You failed to deposited $OMO due to some error.`,
            status: 'error',
            duration: 3000,
            isClosable: false,
            position: 'top',
          })
          setLoading(false)
        })
    } else {
      withdrawBidTokenFunc(amount)
        .then((res) => {
          if (res) {
            toast({
              title: `You have successfully withdrew $OMO.`,
              status: 'success',
              duration: 3000,
              isClosable: false,
              position: 'top',
            })
            setUseAmount(amount)
          } else {
            toast({
              title: `You failed to withdrew $OMO due to some error.`,
              status: 'error',
              duration: 3000,
              isClosable: false,
              position: 'top',
            })
          }
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          toast({
            title: `You failed to withdrew $OMO due to some error.`,
            status: 'error',
            duration: 3000,
            isClosable: false,
            position: 'top',
          })
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    getBalanceOfFunc()
      .then((res) => {
        setBalance(Number(ethers.utils.formatEther(res)))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [address, balance, setBalance])

  useEffect(() => {
    setApprove(isApproval)
  }, [isApproval])

  return (
    <BaseModal
      variant="redeemModal"
      size="2xl"
      isOpen={isOpen}
      title={
        <Heading
          textAlign="left"
          fontSize="22px"
          lineHeight="32px"
          fontWeight="700"
          mb="80px"
          color="#000">
          {type === 1 ? 'Deposit' : 'Withdraw'} $OMO
        </Heading>
      }
      buttons={
        <Button
          onClick={() => handleAmountChange(type)}
          isLoading={loading}
          m="auto"
          my="20px"
          w="100%"
          borderRadius="10px"
          fontSize="20px"
          fontWeight="700"
          h="66px"
          color="#fff"
          bg="#704BEA"
          _hover={{ bg: '#704BEA' }}>
          {type === 1 ? (approve ? 'Deposit' : 'Approve') : 'Withdraw'}
        </Button>
      }
      onClose={() => {
        if (loading) {
          return
        }
        setUseAmount(0)
        onClose()
      }}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack align="left">
        <Box mb="12px">
          {type === 0 ? (
            <Flex alignItems="center" w="100%" justifyContent="flex-end">
              <Text>
                Locked to bid FROMO plot:{' '}
                {Number(omoAmount) - Number(withdrawalAmount)} $OMO
              </Text>
            </Flex>
          ) : null}
          <Flex alignItems="center" w="100%" justifyContent="flex-end">
            <Text>Available: {balance - useAmount} $OMO</Text>
          </Flex>
        </Box>
        <Flex alignItems="center" w="100%">
          <Flex
            flex={1}
            p="12px 20px"
            borderRadius="10px"
            alignItems="center"
            bg="#F4F4F4">
            <Text>$OMO:</Text>
            <Input
              _focusVisible={{
                borderWidth: '0px',
              }}
              type="number"
              fontWeight={700}
              fontSize="20px"
              border="none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Text
              onClick={() => setAmount(balance)}
              cursor="pointer"
              color="#7E4AF1"
              fontSize="16px"
              lineHeight="24px"
              fontWeight="600">
              Max
            </Text>
          </Flex>
        </Flex>
      </VStack>
    </BaseModal>
  )
}

export default OmoModal
