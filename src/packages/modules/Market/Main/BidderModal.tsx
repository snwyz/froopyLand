import { Button, useColorModeValue, VStack, Heading, Flex, Text, Box, Image, Input  } from '@chakra-ui/react'

import BaseModal from '@components/Modal'
import { ellipseAddress } from '@utils'

type SubmitOfferModalProps = {
  isOpen: boolean
  onClose: () => void
}

const BidModal = ({ isOpen, onClose }: SubmitOfferModalProps) => {
  return (
    <BaseModal
      variant="bidModal"
      size="2xl"
      isOpen={isOpen}
      title={<Heading fontSize="22px" lineHeight="32px" textAlign="left">Bid on this Plot of FroopyLand</Heading>}
      buttons={
        <Flex align="baseline">
            <Box mr="14px">
              <Flex w="264px" p="16px" borderRadius="10px" alignItems="center" bg="#F4F4F4">
                <Text>Bid:</Text>
                <Input
                  _focusVisible={{
                    borderWidth: '0px',
                  }}
                  type="number"
                  fontWeight={700}
                  fontSize="20px"
                  border="none"
                />
                <Text color="#333" fontSize="14px" lineHeight="24px">$FLT</Text>
              </Flex>
              <Text mt="8px" fontSize="12px" lineHeight="18px" color="#4F4F4F">Available：10,000 $FL Token</Text>
            </Box>
          <Button
            w="298px"
            borderRadius="10px"
            fontSize="20px"
            fontWeight="700"
            h="66px"
            color="#fff"
            bg="#704BEA"
            _hover={{ bg: "#704BEA" }}
          >
            Bid & Register
          </Button>
        </Flex>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack align="left">
        <Text fontSize="14px" lineHeight="20px" color="rgba(0, 0, 0, 0.7)" mb="40px">The highest bidder will have the opportunity to auction their NFT in the next round.</Text>
        <Box>
          <Flex p="10px 20px">
            <Text w="178px" align="left" mr="60px" fontSize="13px" color="rgba(0, 0, 0, 0.6)">BIDDER</Text>
            <Text fontSize="13px" color="rgba(0, 0, 0, 0.6)">BID</Text>
          </Flex>
         {
          new Array(10).fill('').map((i,v) => (
            <Flex key={v} p="10px 20px" border="1px solid #F2F2F2" borderRadius="10px" align="center" mb="10px">
              <Flex align="center" mr="60px">
                <Image mr="10px" borderRadius="37px" border="1px solid #F2F2F2" src="/static/account/sidebar/avatar.svg" alt='avatar' w="37px" h="37px"></Image>
                <Box fontSize="16px" w="131px">
                  {ellipseAddress('dadasdasdasdasdaaddress', 6)}
                </Box>
              </Flex>
              <Text align="left" fontSize="16px" color="rgb(0, 0, 0)" mr="164px">200 $FL Token</Text>
              <Text fontSize="14px" color="#7E4AF1">ME</Text>
            </Flex>
          ))
         }
        </Box>
      </VStack>
    </BaseModal>
  )
}

export default BidModal
