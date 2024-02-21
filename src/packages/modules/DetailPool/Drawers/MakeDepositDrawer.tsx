import { useCallback, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRouter } from 'next/router'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import useStore from 'packages/store'
import { depositFunc, getBalanceFunc, withdrawFunc } from 'packages/web3'

import { getTitleErrorMetamask } from '@utils'
import { toastError, toastSuccess } from '@utils/toast'

type MakeDepositModalProps = {
  isDeposit?: boolean
  isOpen: boolean
  onClose: () => void
}

type MakeDepositFormValue = {
  amount: number
}

const MakeDepositDrawer = ({
  isOpen,
  onClose,
  isDeposit = true,
}: MakeDepositModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MakeDepositFormValue>()
  const onSubmit: SubmitHandler<MakeDepositFormValue> = (data) => {
    const { amount } = data
    isDeposit ? deposit(amount) : withdraw(amount)
  }
  const { address, balance, setBalance } = useStore()
  const firstField = useRef()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { pool } = router.query

  const getBalance = useCallback(
    async (walletAddress: string) => {
      try {
        if (!pool) return
        const numberOfBalance = await getBalanceFunc(
          String(pool),
          walletAddress,
        )
        setBalance(numberOfBalance)
      } catch (error) {
        console.log(error)
      }
    },
    [pool, setBalance],
  )

  const deposit = useCallback(
    async (amount: number) => {
      try {
        setIsLoading(true)
        if (!pool) return
        await depositFunc(String(pool), amount)
        await getBalance(address)
        toastSuccess('Deposit successfully')
        onClose()
      } catch (error) {
        console.log(error)
        toastError(
          getTitleErrorMetamask(error) || error.message || 'Deposit failed',
        )
      } finally {
        setIsLoading(false)
      }
    },
    [address, getBalance, onClose, pool],
  )

  const withdraw = useCallback(
    async (amount: number) => {
      try {
        setIsLoading(true)
        if (!pool) return
        await withdrawFunc(String(pool), amount)
        await getBalance(address)
        onClose()
        toastSuccess('Withdraw successfully')
      } catch (error) {
        toastError(
          getTitleErrorMetamask(error) || error.message || 'Withdraw failed',
        )
      } finally {
        setIsLoading(false)
      }
    },
    [address, getBalance, onClose, pool],
  )

  useEffect(() => {
    if (address) {
      getBalance(address)
    }
  }, [address, getBalance])
  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      isOpen={isOpen}
      initialFocusRef={firstField}>
      <DrawerContent
        bg="#fff"
        h="calc(100vh - 70%)"
        w="full"
        pos="absolute"
        borderTopRadius="20px">
        <DrawerCloseButton color="#000" />
        <DrawerBody px="40px">
          <Flex flexDir="column" gap="20px">
            <Text
              display="flex"
              fontSize="24px"
              fontWeight="400"
              textColor="#000"
              justifyContent="center">
              {isDeposit
                ? 'Deposit to your balance.'
                : 'Withdraw from your balance.'}
            </Text>
            <Flex gap="10px">
              <Text
                fontSize="16px"
                bgClip="text"
                fontWeight="500"
                bgGradient="linear(to-b,#000000 6.48%, #401EAF 100%)">
                Balance:
              </Text>
              <Flex gap="10px">
                <Image src="/static/modals/ether_icon.svg" alt="icon" />
                <Text fontSize="18px" fontWeight="700">
                  {balance}
                </Text>
              </Flex>
            </Flex>
            <FormControl isInvalid={errors.amount ? true : false}>
              <Flex flexDir="column" gap="10px">
                <Text fontSize="16px" fontWeight="500">
                  {isDeposit ? 'Deposit Amount' : 'Withdraw Amount'}
                </Text>
                <Input
                  _focusVisible={{
                    borderWidth: '0px',
                  }}
                  type="number"
                  borderWidth={0}
                  bg="#F4F3F9"
                  h="52px"
                  {...register('amount', {
                    required: true,
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      message: 'Please enter number on this field',
                    },
                  })}
                />
              </Flex>
              {errors.amount && (
                <FormErrorMessage>
                  {` ${isDeposit ? 'Deposit' : 'Withdraw'} amount is required.`}
                </FormErrorMessage>
              )}
              <ErrorMessage
                errors={errors}
                name="amount"
                render={({ message }) => (
                  <Text textColor="#E53E3E" fontSize="14px">
                    {message}
                  </Text>
                )}
              />
            </FormControl>
          </Flex>
        </DrawerBody>
        <DrawerFooter justifyContent="center">
          <Button
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
            type="submit"
            w="200px"
            _hover={{
              opacity: 0.7,
            }}
            borderRadius="10px"
            fontSize="16px"
            fontWeight="900"
            h="46px"
            border="1px solid #704BEA"
            color="#fff"
            bg="#704BEA">
            {isDeposit ? 'Deposit' : 'Withdraw'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MakeDepositDrawer
