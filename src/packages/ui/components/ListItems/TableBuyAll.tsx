import { ChevronDownIcon, InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tooltip,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

import { useWindowSize } from '@hooks/useWindowSize'

import { buyOrderLicensedData } from './FakeData'

export default function TableBuyAll() {
  const textColor = useColorModeValue('#fff', '#fff')
  const borderBottomColor = useColorModeValue('#704BEA4D', '#704BEA4D')
  const { width } = useWindowSize()
  return (
    <>
      {buyOrderLicensedData.map((item, idx) => (
        <Tr _hover={{ background: '#bab9b929' }} key={idx}>
          <Td
            minW={`${width > 768 ? '210px' : '60px'}`}
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
              {width > 768 ? (
                <Text
                  cursor="pointer"
                  fontWeight="700"
                  pl="8px"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap">
                  {item.poolName}
                </Text>
              ) : (
                <Tooltip label={item.poolName} fontSize="sm">
                  <InfoIcon marginLeft={3} />
                </Tooltip>
              )}
            </Flex>
          </Td>
          {width > 768 && (
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
              </Flex>
            </Td>
          )}

          <Td
            fontSize="14px"
            borderBottom="1px solid"
            borderBottomColor={borderBottomColor}>
            <Flex color="#00DAB3">
              <Text
                lineHeight="16px"
                fontSize="12px"
                fontWeight="500"
                textColor="#00DAB3">
                {item.currentHighestBid}
              </Text>
            </Flex>
          </Td>
          {width > 768 && (
            <Td
              fontSize="12px"
              borderBottom="1px solid"
              borderBottomColor={borderBottomColor}>
              {item.highestOffer}
            </Td>
          )}

          <Td
            fontWeight="500"
            fontSize="12px"
            borderBottom="1px solid"
            borderBottomColor={borderBottomColor}>
            {item.duration}
          </Td>
          {width > 768 && (
            <Td
              fontSize="12px"
              borderBottom="1px solid"
              borderBottomColor={borderBottomColor}>
              {item.balance}
            </Td>
          )}

          <Td
            color="#00D39D"
            fontSize="12px"
            maxW={width > 768 ? 'unset' : '50px'}
            textOverflow={width > 768 ? 'unset' : 'ellipsis'}
            borderBottom="1px solid"
            borderBottomColor={borderBottomColor}>
            {item.status}
          </Td>
          {width > 768 ? (
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
                  Accept
                  <Tooltip
                    label="a cool label explaining what this button does"
                    fontSize="sm">
                    <InfoIcon marginLeft={1} />
                  </Tooltip>
                </Button>
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
                  Upgrade
                  <Tooltip
                    label="a cool label explaining what this button does"
                    fontSize="sm">
                    <InfoIcon marginLeft={1} />
                  </Tooltip>
                </Button>
                <Button
                  background="rgba(112, 75, 234, 0.5)"
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
                  Deposit
                  <Tooltip
                    label="a cool label explaining what this button does"
                    fontSize="sm">
                    <InfoIcon marginLeft={1} />
                  </Tooltip>
                </Button>
              </Flex>
            </Td>
          ) : (
            <Td
              py={0}
              isNumeric
              minW="100px"
              borderBottom="1px solid"
              borderBottomColor={borderBottomColor}>
              <Menu direction="rtl" gutter={-150}>
                <MenuButton
                  background="rgba(112, 75, 234, 0.5)"
                  border="1px solid"
                  borderColor="#704BEA"
                  variant="outline"
                  fontSize="13px"
                  _hover={{
                    bg: 'unset',
                  }}
                  _active={{ background: 'unset' }}
                  fontWeight="400"
                  w="85px"
                  h="35px"
                  as={Button}
                  rightIcon={<ChevronDownIcon />}>
                  Action
                </MenuButton>
                <MenuList padding={0} background="rgba(112, 75, 234, 0.8)">
                  <MenuItem
                    paddingTop={2}
                    _hover={{ background: '#bab9b929' }}
                    background="rgba(112, 75, 234, 0.5)"
                    fontSize="16px">
                    Accept
                    <Tooltip
                      label="a cool label explaining what this button does"
                      fontSize="14px">
                      <InfoIcon marginLeft={1} fontSize="14px" />
                    </Tooltip>
                  </MenuItem>
                  <MenuItem
                    paddingTop={2}
                    _hover={{ background: '#bab9b929' }}
                    background="rgba(112, 75, 234, 0.5)"
                    fontSize="16px">
                    Upgrade
                    <Tooltip
                      label="a cool label explaining what this button does"
                      fontSize="14px">
                      <InfoIcon marginLeft={1} fontSize="14px" />
                    </Tooltip>
                  </MenuItem>
                  <MenuItem
                    paddingTop={2}
                    _hover={{ background: '#bab9b929' }}
                    background="rgba(112, 75, 234, 0.5)"
                    fontSize="16px">
                    Deposit
                    <Tooltip
                      label="a cool label explaining what this button does"
                      fontSize="14px">
                      <InfoIcon marginLeft={1} fontSize="14px" />
                    </Tooltip>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          )}
        </Tr>
      ))}
    </>
  )
}
