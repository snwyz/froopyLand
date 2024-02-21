import {
  Box,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

import { buyOrderOfferMade } from './FakeData'

export default function TableBuyOffer() {
  const textColor = useColorModeValue('#fff', '#fff')
  const borderBottomColor = useColorModeValue('#704BEA4D', '#704BEA4D')

  return (
    <>
      {buyOrderOfferMade.map((item, idx) => (
        <Tr _hover={{ background: '#bab9b929' }} key={idx}>
          <Td
            minW="210px"
            maxW="300px"
            lineHeight="16px"
            fontSize="14px"
            fontWeight="500"
            color={textColor}
            borderBottomColor={borderBottomColor}
            borderBottom="1px solid"
            borderColor="#E8E8E8"
            background="unset">
            <Flex alignItems="center">
              <Box borderRadius="4px" w="32px" h="32px" overflow="hidden">
                <Image
                  w="32px"
                  h="32px"
                  objectFit="cover"
                  alt=""
                  src="/static/fake/detail.svg"
                  fallbackSrc="/static/license-template/template.png"
                />
              </Box>
              <Text
                cursor="pointer"
                fontWeight="700"
                pl="8px"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap">
                {item.poolName}
              </Text>
            </Flex>
          </Td>
          <Td
            lineHeight="16px"
            fontSize="14px"
            fontWeight="500"
            color={textColor}
            borderBottomColor={borderBottomColor}
            borderBottom="1px solid"
            borderColor="#E8E8E8">
            <Flex gridGap="6px" color="#00DAB3">
              <Text
                lineHeight="16px"
                fontSize="12px"
                fontWeight="500"
                textColor="#00DAB3">
                {item.nftInPool}
              </Text>
              <Image src="/static/modals/triangle_up.svg" alt="triangle_up" />
            </Flex>
          </Td>
          <Td borderBottomColor={borderBottomColor} borderBottom="1px solid">
            <Flex alignItems="center" gridGap="6px">
              <Text lineHeight="16px" fontSize="12px" color={textColor}>
                {item.subScriptionFee}
              </Text>
            </Flex>
          </Td>
          <Td
            fontSize="14px"
            borderBottom="1px solid"
            borderBottomColor={borderBottomColor}>
            <Flex gridGap="6px" color="#00DAB3">
              <Text
                lineHeight="16px"
                fontSize="12px"
                fontWeight="500"
                textColor="#00DAB3">
                {item.currentLowestBid}
              </Text>
              <Image src="/static/modals/triangle_up.svg" alt="triangle_up" />
            </Flex>
          </Td>
          <Td
            fontSize="12px"
            borderBottom="1px solid"
            borderBottomColor={borderBottomColor}>
            {item.highestOffer}
          </Td>
          <Td
            fontSize="12px"
            borderBottom="1px solid"
            borderBottomColor={borderBottomColor}>
            {item.myOffer}
          </Td>
          <Td
            py={0}
            isNumeric
            minW="100px"
            borderBottom="1px solid"
            borderBottomColor={borderBottomColor}>
            <Flex gap="20px" align="center" h="100%">
              <Button
                border="1px solid"
                borderColor="#704BEA"
                variant="outline"
                fontSize="13px"
                _hover={{
                  bg: 'unset',
                }}
                fontWeight="400"
                w="85px"
                h="35px">
                Delete
              </Button>
            </Flex>
          </Td>
        </Tr>
      ))}
    </>
  )
}
