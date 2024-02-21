import {
  Box,
  Flex,
  Image,
  Link,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'

import { ellipseAddress } from '@utils'

function TableBuy({ item }: { item: any }) {
  const textColor = useColorModeValue('#fff', '#fff')
  const borderBottomColor = useColorModeValue(
    '#704BEA4D',
    'rgba(255,255,255,0.3)',
  )
  return (
    <Tr _hover={{ background: '#bab9b929' }}>
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
              src={item.image}
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
            {item.name} #{item.tokenId}
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
        <Link
          mt="5px"
          fontSize="14px"
          color={textColor}
          // href={getPublicEtherscanUrl(item.contractAddress)}
          isExternal>
          {ellipseAddress(item.staker)}
        </Link>
      </Td>
    </Tr>
  )
}

export default TableBuy
