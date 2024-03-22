import { Button, useColorModeValue, VStack, Heading, Flex, Input, Text  } from '@chakra-ui/react'

import BaseModal from '@components/Modal'

type SubmitOfferModalProps = {
  isOpen: boolean
  onClose: () => void
}

const PurchaseNFTModal = ({ isOpen, onClose }: SubmitOfferModalProps) => {
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
          Purchase
        </Button>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack align="left">
        <Heading fontSize="22px" lineHeight="32px" mb="22px">Purchase NFT</Heading>
        <Text fontSize="12px" mt="10px" color="#4F4F4F" mb="8px" pl="10px">Information:</Text>
        <Flex w="100%" p="12px 20px" borderRadius="10px" alignItems="center" bg="#F4F4F4">
          <Text fontSize="12px" color="#4F4F4F">Price:</Text>
          <Input
            _focusVisible={{
              borderWidth: '0px',
            }}
            type="number"
            fontWeight={700}
            fontSize="20px"
            border="none"
          />
          <Text color="#333333" fontSize="14px" lineHeight="24px" w="80px">FL Token</Text>
        </Flex>
        <Text mt="20px" fontSize="12px" lineHeight="18px" color="#4F4F4F" align="end">available：10,000 FL Token</Text>
      </VStack>
    </BaseModal>
  )
}

export default PurchaseNFTModal
