import {
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

import BaseModal from '@components/Modal'

import { Themes } from '@ts'

type DepositSuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

const DepositSuccessModal = ({ isOpen, onClose }: DepositSuccessModalProps) => {
  return (
    <BaseModal
      typeModal={Themes.SUCCESS_SECONDARY}
      size="5xl"
      isOpen={isOpen}
      buttons={
        <Button
          m="20px 0px 60px"
          w="322px"
          borderRadius="10px"
          fontSize="20px"
          fontWeight="700"
          h="66px"
          color="#2A0668"
          bg="#00DAB3">
          Go buy
        </Button>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack spacing="24px" mt="60px">
        <Flex flexDirection="column" lineHeight="55px" px="50px">
          <Text
            fontSize="48px"
            fontWeight="900"
            display="flex"
            textShadow="2px -5px #FF6BFF"
            textColor="#FFF">
            DEPOSIT SUCCESSFULLY !
          </Text>
          <Flex gap="10px" justifyContent="center">
            <Text fontSize="24px" fontWeight="700" textColor="#fff">
              Balance :
            </Text>
            <Image src="/static/modals/ether_deposit_icon.svg" alt="icon" />
            <Text fontSize="24px" fontWeight="700" textColor="#fff">
              55.00
            </Text>
          </Flex>
        </Flex>
      </VStack>
    </BaseModal>
  )
}

export default DepositSuccessModal
