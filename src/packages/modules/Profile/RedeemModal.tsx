import { Button, useColorModeValue, VStack, Heading, Flex, Input, Text, Box  } from '@chakra-ui/react'

import BaseModal from '@components/Modal'

type SubmitOfferModalProps = {
  isOpen: boolean
  onClose: () => void
}

const RedeemModal = ({ isOpen, onClose }: SubmitOfferModalProps) => {
  return (
    <BaseModal
      variant="redeemModal"
      size="2xl"
      isOpen={isOpen}
      buttons={
        <Button
          m="auto"
          my="20px"
          w="576px"
          borderRadius="10px"
          fontSize="20px"
          fontWeight="700"
          h="66px"
          color="#fff"
          bg="#704BEA"
          _hover={{ bg: "#704BEA" }}
        >
          Redeem
        </Button>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack align="left">
        <Heading fontSize="22px" lineHeight="32px" mb="60px">Redeem Keys</Heading>
        <Flex alignItems="center">
            <Box>
              <Flex w="328px" p="12px 20px" borderRadius="10px" alignItems="center" bg="#F4F4F4">
                <Text>Keys:</Text>
                <Input
                  _focusVisible={{
                    borderWidth: '0px',
                  }}
                  type="number"
                  fontWeight={700}
                  fontSize="20px"
                  border="none"
                />
                {/* <Text color="#7E4AF1" fontSize="16px" lineHeight="24px" fontWeight="600">Max</Text> */}
              </Flex>
              <Text mt="8px" fontSize="12px" lineHeight="18px" color="#4F4F4F" align="end">10,000 Available</Text>
            </Box>
            <Text color="#828282" position="relative" top="-12px" fontSize="14px" lineHeight="20px" m="0 12px">to</Text>
            <Box>
              <Input
                w="212px"
                h="57px"
                borderColor="#F2F2F2"
                readOnly
                textAlign="center"
                value="1 Key"
              />
              <Text mt="8px" fontSize="12px" lineHeight="18px" color="#4F4F4F" align="center">1.23 Key=1 $FLT</Text>
            </Box>
        </Flex>
      </VStack>
    </BaseModal>
  )
}

export default RedeemModal
