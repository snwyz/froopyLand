import {
  Box,
  Button,
  chakra,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import UpdateSuccessedModal from './UpdateSuccessedModal'

type ConfirmUpgradeModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ConfirmUpgradeModal = ({ isOpen, onClose }: ConfirmUpgradeModalProps) => {
  const {
    isOpen: isOpenUpdateSuccessModal,
    onOpen: onOpenUpdateSuccessModal,
    onClose: onCloseUpdateSuccessModal,
  } = useDisclosure()
  return (
    <>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        variant="upgradeModal">
        <ModalOverlay
          bg="rgba(19, 2, 48, 0.8)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          backdropFilter="blur(5px)"
        />
        <ModalContent
          bgColor={useColorModeValue ? '#fff' : '#fff'}
          borderRadius="16px">
          <ModalCloseButton
            size="3xl"
            color="#606062"
            pos="absolute"
            top="18px"
            right="24px"
          />

          <ModalBody>
            <VStack mb="15px" spacing="24px">
              <Flex flexDirection="column" lineHeight="55px">
                <Text
                  fontSize="40px"
                  fontWeight="900"
                  justifyContent="center"
                  display="flex"
                  textColor="#704BEA">
                  ARE YOU SURE TO UPGRADE ?
                </Text>
              </Flex>

              <Box p="0px 100px">
                <Text
                  fontSize="18px"
                  fontWeight="400"
                  textColor="#606062"
                  letterSpacing="0.025em">
                  As long as you prepay{' '}
                  <chakra.span textColor="#704BEA" fontWeight="700">
                    100ETH
                  </chakra.span>{' '}
                  at a time, you can be guaranteed to have a stable license for{' '}
                  <chakra.span textColor="#704BEA" fontWeight="700">
                    one year.{' '}
                  </chakra.span>
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Button
              onClick={onOpenUpdateSuccessModal}
              m="auto"
              w="245px"
              borderRadius="10px"
              fontSize="20px"
              fontWeight="700"
              h="66px"
              color="#2A0668"
              bg=" #00DAB3">
              Upgrade now
            </Button>
          </ModalFooter>
          <Flex
            mt="10px"
            mx="60px"
            gap="8px"
            p="14px 20px 18px"
            bg="rgba(255, 168, 254, 0.1)"
            borderRadius="10px">
            <Image src="/static/modals/question_icon.svg" alt="icon" h="17px" />
            <Text textColor="#704bea" fontSize="12px" fontWeight="400">
              After clicking the button, we will deduct your advance payment
              from the wallet, please make sure the wallet has enough ETH to pay
              the advance payment.
            </Text>
          </Flex>
        </ModalContent>
      </Modal>
      <UpdateSuccessedModal
        isOpen={isOpenUpdateSuccessModal}
        onClose={onCloseUpdateSuccessModal}
      />
    </>
  )
}

export default ConfirmUpgradeModal
