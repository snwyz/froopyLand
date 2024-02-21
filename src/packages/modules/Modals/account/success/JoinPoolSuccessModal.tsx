import { useRouter } from 'next/router'

import { Button, Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react'

import BaseModal from '@components/Modal'

import { DetailItemTabs, Themes } from '@ts'

type JoinPoolSuccessModalProps = {
  item?: any
  isOpen: boolean
  onClose: () => void
}

const JoinPoolSuccessModal = ({
  item,
  isOpen,
  onClose,
}: JoinPoolSuccessModalProps) => {
  const router = useRouter()
  const { pool, collection } = router.query

  const checkIfAlreadyInDetailPool = async () => {
    if (pool && collection) {
      onClose()
    } else {
      router.push(
        `/${item.poolAddress}?collection=${item.contractAddress}&tab=${DetailItemTabs.STAKED}`,
      )
    }
  }
  return (
    <BaseModal
      typeModal={Themes.SUCCESS_SECONDARY}
      size="5xl"
      isOpen={isOpen}
      buttons={
        <Button
          cursor="pointer"
          onClick={() =>
            router.push(
              `/${item.poolAddress}?collection=${item.contractAddress}&tab=${DetailItemTabs.STAKED}`,
            )
          }
          m="20px 0px 60px"
          w="322px"
          borderRadius="10px"
          fontSize="20px"
          fontWeight="700"
          h="66px"
          color="#2A0668"
          bg="#00DAB3">
          View The Pool
        </Button>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack spacing="24px" mt="60px">
        <Flex flexDirection="column" lineHeight="55px" px="50px" ml="88px">
          <Text
            fontSize="55px"
            fontWeight="900"
            justifyContent="center"
            display="flex"
            textShadow="2px -5px #FF6BFF"
            textColor="#FFF">
            HAS SUCCESSFULLY JOINED THE POOL !
          </Text>
        </Flex>
      </VStack>
    </BaseModal>
  )
}

export default JoinPoolSuccessModal
