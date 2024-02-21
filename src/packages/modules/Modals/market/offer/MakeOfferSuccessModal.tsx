import { Button, Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react'

import BaseModal from '@components/Modal'

type MakeOfferSuccessModalProps = {
  isOpen?: boolean
  onClose?: () => void
}

const MakeOfferSuccessModal = ({
  isOpen,
  onClose,
}: MakeOfferSuccessModalProps) => {
  return (
    <>
      <BaseModal
        variant="offerSuccess"
        size="lg"
        isOpen={isOpen}
        buttons={
          <Button
            onClick={onClose}
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
            Go to view
          </Button>
        }
        onClose={onClose}
        bgColor={useColorModeValue ? '#fff' : '#fff'}>
        <VStack mb="15px" spacing="24px">
          <Flex flexDirection="column">
            <Text
              fontSize="32px"
              fontWeight="900"
              justifyContent="center"
              display="flex"
              textColor="#704BEA">
              YOU HAVE SUCCESSFULLY
            </Text>
            <Text
              fontSize="32px"
              textColor="#704BEA"
              fontWeight="900"
              justifyContent="center"
              display="flex">
              SUBMITTED AN OFFER
            </Text>
          </Flex>

          <Text
            fontSize="16px"
            textColor="#606062"
            fontWeight="400"
            lineHeight="155.99%"
            justifyContent="center"
            display="flex">
            Wait for the response from the license holder, if the holder accepts
            your offer, the license will be successfully transferred to you.
          </Text>
        </VStack>
      </BaseModal>
    </>
  )
}

export default MakeOfferSuccessModal
