import { Box, chakra, Flex, Text, useColorModeValue } from '@chakra-ui/react'

import BaseModal from '@components/Modal'

import { Themes } from '@ts'

type SuccessfullyObtainedModalProps = {
  isOpen: boolean
  onClose: () => void
  collectionInfo: any
}

const SuccessfullyObtainedModal = ({
  isOpen,
  onClose,
  collectionInfo,
}: SuccessfullyObtainedModalProps) => {
  return (
    <BaseModal
      typeModal={Themes.SUCCESS_PRIMARY}
      size={{ base: 'xs', sm: 'md', md: 'lg', xl: '5xl' }}
      isOpen={isOpen}
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <Flex flexDir="column">
        <Flex flexDirection="column" lineHeight="55px" mt="10px">
          <Text
            fontSize={{ base: '36px', sm: '42px', md: '55px' }}
            fontWeight="900"
            justifyContent="center"
            display="flex"
            textShadow="2px -3px #FF6BFF"
            textColor="#FFF">
            SUCCESSFULLY OBTAINED !
          </Text>
        </Flex>

        <Box m={{ base: '31px 20px 20px', md: '31px 30px 20px' }}>
          <Text
            fontSize={{ base: '14px', md: '20px' }}
            fontWeight="400"
            textColor="white"
            letterSpacing="0.025em">
            Congratulations! You have successfully obtained a
            <chakra.span textColor="#00DAB3" fontWeight="700">
              {collectionInfo?.name}
            </chakra.span>{' '}
            pool license! You can now use any NFT in the pool for commercial
            use.
          </Text>
        </Box>
      </Flex>
    </BaseModal>
  )
}

export default SuccessfullyObtainedModal
