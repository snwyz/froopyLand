import {
  Box,
  Button,
  chakra,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import BaseModal from '@components/Modal'

import { Themes } from '@ts'

type PurchaseSuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

const PurchaseSuccessModal = ({
  isOpen,
  onClose,
}: PurchaseSuccessModalProps) => {
  return (
    <BaseModal
      typeModal={Themes.SUCCESS_PRIMARY}
      size="5xl"
      isOpen={isOpen}
      buttons={
        <Button
          m="20px 0px 30px"
          w="322px"
          borderRadius="10px"
          fontSize="20px"
          fontWeight="700"
          h="66px"
          color="#2A0668"
          bg="#00DAB3">
          Go to view
        </Button>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <Flex flexDir="column">
        <Flex flexDirection="column" lineHeight="55px">
          <Text
            fontSize="55px"
            fontWeight="900"
            justifyContent="center"
            display="flex"
            textShadow="2px -3px #FF6BFF"
            textColor="#FFF">
            SUCCESSFULL PURCHASE!
          </Text>
        </Flex>

        <Box m="31px 100px 0 120px">
          <Text
            fontSize="20px"
            fontWeight="400"
            textColor="white"
            letterSpacing="0.025em">
            Congratulations on successfully obtaining a license for the{' '}
            <chakra.span textColor="#00DAB3" fontWeight="700">
              【My Little Piggie】
            </chakra.span>{' '}
            pool , come and choose the NFT in the pool and use it for commercial
            use.
          </Text>
          <Flex gap="40px" mt="40px">
            <Box>
              <Text fontSize="24px" fontWeight="500" textColor="#fff">
                Price:{' '}
                <chakra.span
                  fontSize="24px"
                  fontWeight="700"
                  textColor="#00DAB3">
                  54 ETH
                </chakra.span>
              </Text>
            </Box>
            <Box>
              <Text fontSize="24px" fontWeight="500" textColor="#fff">
                Supscription fee:{' '}
                <chakra.span
                  fontSize="24px"
                  fontWeight="500"
                  textColor="#00DAB3">
                  5.4 ETH
                </chakra.span>
              </Text>
            </Box>
          </Flex>
          <Box mt="10px">
            <Text fontSize="24px" fontWeight="500" textColor="#fff">
              Effective time:{' '}
              <chakra.span fontSize="24px" fontWeight="500" textColor="#00DAB3">
                30d 00m 26s
              </chakra.span>
            </Text>
          </Box>
        </Box>
      </Flex>
    </BaseModal>
  )
}

export default PurchaseSuccessModal
