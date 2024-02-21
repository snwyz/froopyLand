import { SubmitHandler, useForm } from 'react-hook-form'

import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'

import WaitingCreatePublicPoolModal from './WaitingCreatePublicPoolModal'

type CreatePublicPoolModalProps = {
  isOpen: boolean
  onClose: () => void
}

type CreatePublicPoolFormValue = {
  poolName: string
  subscriptionFee: string
  billingCycle: string
  floorPrice: string
  floorPriceUnit: string
  licensesSupply: string
}

const CreatePublicPoolModal = ({
  isOpen,
  onClose,
}: CreatePublicPoolModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePublicPoolFormValue>()
  const onSubmit: SubmitHandler<CreatePublicPoolFormValue> = (data) => {
  }

  const handleClickCreatePublicPool = () => {
    onOpenWaitingCreatePublicPoolModal()
  }

  const {
    isOpen: isOpenWaitingCreatePublicPoolModal,
    onOpen: onOpenWaitingCreatePublicPoolModal,
    onClose: onCloseWaitingCreatePublicPoolModal,
  } = useDisclosure()
  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
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
            <ModalBody p="0px">
              <Flex flexDir="column" justify="center" flex="1" gap="33px">
                <FormControl isInvalid={errors.poolName ? true : false}>
                  <FormLabel fontSize="18px" fontWeight="700">
                    Pool name
                  </FormLabel>
                  <Input
                    _focusVisible={{
                      borderWidth: '0px',
                    }}
                    placeholder="name"
                    borderWidth={0}
                    bg="#F4F3F9"
                    h="52px"
                    {...register('poolName', { required: true })}
                  />
                  {errors.poolName && (
                    <FormErrorMessage>Pool name is required.</FormErrorMessage>
                  )}
                </FormControl>

                <Flex>
                  <Flex flexDir="row" justify="left" flex="1" gap="12px">
                    <FormControl
                      isInvalid={errors.subscriptionFee ? true : false}>
                      <FormLabel fontSize="18px" fontWeight="700">
                        Subscription fee
                      </FormLabel>
                      <Input
                        _focusVisible={{
                          borderWidth: '0px',
                        }}
                        placeholder="100"
                        borderWidth={0}
                        bg="#F4F3F9"
                        h="52px"
                        {...register('subscriptionFee', {
                          required: true,
                          pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: 'Please enter number on this field',
                          },
                        })}
                      />
                      {errors.subscriptionFee && (
                        <FormErrorMessage>
                          Subscription fee is required.
                        </FormErrorMessage>
                      )}
                      <ErrorMessage
                        errors={errors}
                        name="subscriptionFee"
                        render={({ message }) => (
                          <Text textColor="#E53E3E" fontSize="14px">
                            {message}
                          </Text>
                        )}
                      />
                    </FormControl>
                    <FormControl isInvalid={errors.billingCycle ? true : false}>
                      <FormLabel fontSize="18px" fontWeight="700">
                        Billing Cycle
                      </FormLabel>
                      <Input
                        _focusVisible={{
                          borderWidth: '0px',
                        }}
                        placeholder="1 month"
                        borderWidth={0}
                        bg="#F4F3F9"
                        h="52px"
                        {...register('billingCycle', { required: true })}
                      />
                      {errors.billingCycle && (
                        <FormErrorMessage>
                          Billing cycle is required.
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex flexDir="row" justify="left" flex="1" gap="12px">
                    <FormControl>
                      <FormLabel fontSize="18px" fontWeight="700">
                        Floor price
                      </FormLabel>
                      <HStack bg="#F4F3F9" borderRadius="0.375rem">
                        <FormControl
                          w="70%"
                          isInvalid={errors.floorPrice ? true : false}>
                          <Input
                            type="number"
                            placeholder="0.045"
                            borderWidth={0}
                            _focusVisible={{
                              borderWidth: '0px',
                            }}
                            {...register('floorPrice', {
                              required: true,
                              pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                message: 'Please enter number on this field',
                              },
                            })}
                          />
                        </FormControl>

                        <Divider
                          orientation="vertical"
                          borderWidth="1px"
                          h="36px"
                          borderColor="#DFE2E6"
                        />

                        <FormControl
                          w="30%"
                          isInvalid={errors.floorPriceUnit ? true : false}>
                          <Select
                            placeholder="Select"
                            _focusVisible={{
                              borderWidth: '0px',
                            }}
                            fontSize="14px"
                            fontWeight="400"
                            h="52px"
                            bg="#F4F3F9"
                            {...register('floorPriceUnit', { required: true })}
                            borderWidth={0}>
                            <option value="ETH">ETH</option>
                            <option value="BTC">BTC</option>
                            <option value="LINK">LINK</option>
                          </Select>
                        </FormControl>
                      </HStack>
                      <ErrorMessage
                        errors={errors}
                        name="floorPrice"
                        render={() => (
                          <Text textColor="#E53E3E" fontSize="14px">
                            Floor price is required
                          </Text>
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="floorPriceUnit"
                        render={() => (
                          <Text textColor="#E53E3E" fontSize="14px">
                            Floor price unit is required
                          </Text>
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="floorPrice"
                        render={({ message }) => (
                          <Text textColor="#E53E3E" fontSize="14px">
                            {message}
                          </Text>
                        )}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={errors.licensesSupply ? true : false}>
                      <FormLabel fontSize="18px" fontWeight="700">
                        Licenses Supply
                      </FormLabel>
                      <Input
                        _focusVisible={{
                          borderWidth: '0px',
                        }}
                        placeholder="100"
                        borderWidth={0}
                        bg="#F4F3F9"
                        h="52px"
                        {...register('licensesSupply', {
                          required: true,
                          pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: 'Please enter number on this field',
                          },
                        })}
                      />
                      {errors.licensesSupply && (
                        <FormErrorMessage>
                          Licenses supply is required.
                        </FormErrorMessage>
                      )}
                      <ErrorMessage
                        errors={errors}
                        name="licensesSupply"
                        render={({ message }) => (
                          <Text textColor="#E53E3E" fontSize="14px">
                            {message}
                          </Text>
                        )}
                      />
                    </FormControl>
                  </Flex>
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter display="flex" justifyContent="center">
              <Button
                // onClick={handleClickCreatePublicPool}
                type="submit"
                m="auto"
                my="20px"
                w="290px"
                borderRadius="10px"
                fontSize="20px"
                fontWeight="700"
                h="66px"
                color="#fff"
                bg="#704BEA">
                Create Public Pool
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <WaitingCreatePublicPoolModal
        isOpen={isOpenWaitingCreatePublicPoolModal}
        onClose={onCloseWaitingCreatePublicPoolModal}
      />
    </>
  )
}

export default CreatePublicPoolModal
