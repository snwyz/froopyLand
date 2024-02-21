import { Button, Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react'

import BaseModal from '@components/Modal'

import { Themes } from '@ts'

type AddPoolSuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

const AddPoolSuccessModal = ({ isOpen, onClose }: AddPoolSuccessModalProps) => {
  return (
    <BaseModal
      typeModal={Themes.SUCCESS_SECONDARY}
      size="5xl"
      isOpen={isOpen}
      buttons={
        <Button
          m="20px 0px 75px"
          w="322px"
          borderRadius="10px"
          fontSize="20px"
          fontWeight="700"
          h="66px"
          color="#2A0668"
          bg="#00DAB3">
          Return to pool
        </Button>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack spacing="24px" mt="61px">
        <Flex flexDirection="column" lineHeight="55px">
          <Text
            fontSize="40px"
            fontWeight="900"
            justifyContent="center"
            display="flex"
            textShadow="2px -2px #FF6BFF"
            textColor="#FFF">
            ADDED SUCCESSFULLY!
          </Text>
        </Flex>
      </VStack>
    </BaseModal>
  )
}

export default AddPoolSuccessModal
