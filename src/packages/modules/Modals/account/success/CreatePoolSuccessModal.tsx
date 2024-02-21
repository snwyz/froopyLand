import { useRouter } from 'next/router'

import { Button, Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import useStore from 'packages/store'

import BaseModal from '@components/Modal'

import { Themes } from '@ts'

type CreatePoolSuccessModalProps = {
  item?: any
  isOpen: boolean
  onClose: () => void
}

const CreatePoolSuccessModal = ({
  item,
  isOpen,
  onClose,
}: CreatePoolSuccessModalProps) => {
  const router = useRouter()
  const { poolAddress } = useStore()
  return (
    <BaseModal
      typeModal={Themes.SUCCESS_PRIMARY}
      size="5xl"
      isOpen={isOpen}
      buttons={
        <Button
          onClick={() =>
            router.push(`/${poolAddress}?collection=${item?.contractAddress}`)
          }
          m="20px 0px 100px"
          w="322px"
          borderRadius="10px"
          fontSize="20px"
          fontWeight="700"
          h="66px"
          color="#2A0668"
          bg="#00DAB3">
          Go to pool
        </Button>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack spacing="24px" mt="90px">
        <Flex flexDirection="column" lineHeight="55px">
          <Text
            fontSize="40px"
            fontWeight="900"
            justifyContent="center"
            display="flex"
            textShadow="2px -2px #FF6BFF"
            textColor="#FFF">
            CREATE SUCCESSFULLY!
          </Text>
        </Flex>
      </VStack>
    </BaseModal>
  )
}

export default CreatePoolSuccessModal
