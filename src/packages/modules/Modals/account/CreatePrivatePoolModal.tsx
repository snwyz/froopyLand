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
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'

type CreatePrivatePoolModalProps = {
  isOpen: boolean
  onClose: () => void
}

type CreatePrivatePoolFormValue = {
  poolName: string
  nftInPool: string
  licenseSupply: string
  floorPrice: string
  floorPriceUnit: string
  subscriptionFee: string
  describe: string
}

const CreatePrivatePoolModal = ({
  isOpen,
  onClose,
}: CreatePrivatePoolModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePrivatePoolFormValue>()
  const onSubmit: SubmitHandler<CreatePrivatePoolFormValue> = (data) => {}

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
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
                  placeholder="Pool Name"
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
                  <FormControl isInvalid={errors.nftInPool ? true : false}>
                    <FormLabel fontSize="18px" fontWeight="700">
                      NFT in pool
                    </FormLabel>
                    <Select
                      placeholder="Select nft in pool"
                      _focusVisible={{
                        borderWidth: '0px',
                      }}
                      h="52px"
                      bg="#F4F3F9"
                      {...register('nftInPool', { required: true })}
                      borderWidth={0}>
                      <option>5 - 100</option>
                      <option>100 - 200</option>
                    </Select>
                    {errors.nftInPool && (
                      <FormErrorMessage>
                        Nft in pool is required.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.licenseSupply ? true : false}>
                    <FormLabel fontSize="18px" fontWeight="700">
                      Licenses Supply
                    </FormLabel>
                    <Input
                      _focusVisible={{
                        borderWidth: '0px',
                      }}
                      type="number"
                      placeholder="0"
                      borderWidth={0}
                      bg="#F4F3F9"
                      h="52px"
                      {...register('licenseSupply', {
                        required: true,
                        pattern: {
                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                          message: 'Please enter number on this field',
                        },
                      })}
                    />
                    {errors.licenseSupply && (
                      <FormErrorMessage>
                        License supply is required.
                      </FormErrorMessage>
                    )}
                    <ErrorMessage
                      errors={errors}
                      name="licenseSupply"
                      render={({ message }) => (
                        <Text textColor="#E53E3E" fontSize="14px">
                          {message}
                        </Text>
                      )}
                    />
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
                          placeholder="0"
                          type="number"
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

                      <Flex
                        w="20%"
                        align="center"
                        justify="center"
                        h="52px"
                        ml="16px">
                        ETH
                      </Flex>
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
                    isInvalid={errors.subscriptionFee ? true : false}>
                    <FormLabel fontSize="18px" fontWeight="700">
                      Subscription fee
                    </FormLabel>
                    <Input
                      type="number"
                      _focusVisible={{
                        borderWidth: '0px',
                      }}
                      placeholder="0"
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
                </Flex>
              </Flex>
              <FormControl isInvalid={errors.describe ? true : false}>
                <FormLabel fontSize="18px" fontWeight="700">
                  Describe
                </FormLabel>
                <Textarea
                  h="100px"
                  borderWidth={0}
                  resize="none"
                  bg="#F4F3F9"
                  _focusVisible={{
                    borderWidth: '0px',
                  }}
                  {...register('describe', { required: true })}
                />
                {errors.describe && (
                  <FormErrorMessage>Describe is required.</FormErrorMessage>
                )}
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button
              type="submit"
              m="auto"
              mt="8px"
              w="290px"
              borderRadius="10px"
              fontSize="20px"
              fontWeight="700"
              h="66px"
              color="#fff"
              bg="#704BEA">
              Create Private Pool
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default CreatePrivatePoolModal
