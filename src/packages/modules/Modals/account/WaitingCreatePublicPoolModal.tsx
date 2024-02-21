import {
  Divider,
  Flex,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

import BaseModal from '@components/Modal'

type WaitingCreatePublicPoolModalProps = {
  isOpen: boolean
  onClose: () => void
}

const WaitingCreatePublicPoolModal = ({
  isOpen,
  onClose,
}: WaitingCreatePublicPoolModalProps) => {
  return (
    <>
      <BaseModal
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
        bgColor={useColorModeValue ? '#fff' : '#fff'}>
        <VStack mb="15px" spacing="24px">
          <Flex flexDirection="column" lineHeight="55px">
            <Text
              fontSize="40px"
              fontWeight="900"
              justifyContent="center"
              display="flex"
              textColor="#704BEA">
              WAIT A MOMENT,
            </Text>
            <Text
              fontSize="40px"
              textColor="#704BEA"
              fontWeight="900"
              justifyContent="center"
              display="flex">
              THE PUBLIC POOL IS BEING CREATED...
            </Text>
          </Flex>

          {/* <Text
            fontSize="16px"
            textColor="#704BEA"
            fontWeight="400"
            lineHeight="155.99%"
            justifyContent="center"
            display="flex">
            Congratulations!
          </Text> */}
          <Flex alignItems="center">
            <Flex gap="12px">
              <Text fontWeight="500" fontSize="14px" textColor="#000">
                Pool name
              </Text>
              <Text
                textColor="rgba(0, 0, 0, 0.5)"
                fontWeight="500"
                fontSize="14px">
                My Little Piggie
              </Text>
            </Flex>
            <Divider
              mx="25px"
              orientation="vertical"
              border="1px solid rgba(0, 0, 0, 0.2)"
              height="15px"
            />
            <Flex gap="12px">
              <Text fontWeight="500" fontSize="14px" textColor="#000">
                Licenses Supply
              </Text>
              <Text
                textColor="rgba(0, 0, 0, 0.5)"
                fontWeight="500"
                fontSize="14px">
                100
              </Text>
            </Flex>
            <Divider
              mx="25px"
              orientation="vertical"
              border="1px solid rgba(0, 0, 0, 0.2)"
              height="15px"
            />
            <Flex gap="12px">
              <Text fontWeight="500" fontSize="14px" textColor="#000">
                Starting price
              </Text>
              <Text
                textColor="rgba(0, 0, 0, 0.5)"
                fontWeight="500"
                fontSize="14px">
                0.00 ETH
              </Text>
            </Flex>
          </Flex>
        </VStack>
      </BaseModal>
    </>
  )
}

export default WaitingCreatePublicPoolModal
