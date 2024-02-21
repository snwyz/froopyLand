import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Collapse,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import { Attribute } from './type'

export default function Properties({
  attributes,
}: {
  attributes?: Attribute[]
}) {
  const textContent3 = useColorModeValue('primary.300', 'text.100')
  const { isOpen, onToggle } = useDisclosure()
  const textColor = useColorModeValue('#FFA8FE', 'rgba(255,255,255,0.6)')
  const borderColor = useColorModeValue('#FFA8FE', 'rgba(255,255,255,0.2)')
  const bgColor = useColorModeValue(
    'rgba(255, 168, 254, 0.2)',
    'rgba(65, 65, 65, 0.3)',
  )
  const bgColorTab = useColorModeValue(
    'rgba(255, 168, 254, 0.2)',
    'rgba(112, 75, 234, 0.2)',
  )

  return (
    <Box
      mt={{ base: '32px', md: 'unset' }}
      blur={{ base: '5px', md: 'unset' }}
      border={{ base: '2px solid', md: 'none' }}
      borderColor={{ base: borderColor, md: 'none' }}
      borderRadius="10px"
      bg={{ base: bgColor, md: 'none' }}>
      <Flex
        px={{ base: '12px', md: 'unset' }}
        borderBottom={{ base: !isOpen ? '1px solid' : '', md: 'none' }}
        borderColor={{ base: borderColor, md: 'none' }}
        justifyContent="space-between"
        onClick={onToggle}
        cursor="pointer"
        h="40px"
        _hover={{ opacity: '0.7' }}
        align="center">
        <Flex align="center" gap="12px">
          <Text
            fontSize={{ base: '16px', md: '16px', lg: '20px' }}
            lineHeight="23px"
            fontWeight="900">
            Properties
          </Text>
        </Flex>
        {!isOpen ? (
          <ChevronUpIcon w={5} h={5} />
        ) : (
          <ChevronDownIcon w={5} h={5} />
        )}
      </Flex>
      <Collapse in={!isOpen} animateOpacity>
        <Flex
          p={{ base: '15px 12px', md: '12px 0px 0px' }}
          flexWrap="wrap"
          gridGap="10px">
          {attributes?.length > 0 ? (
            attributes.map((item, idx) => (
              <Flex
                align="center"
                gap="6px"
                key={idx}
                bg={bgColorTab}
                borderRadius="80px"
                p={{ base: '4px 8px', md: '5px 9px', lg: '8px 12px' }}>
                <Text
                  fontSize={{ base: '12px', md: '14px', xl: '14px' }}
                  lineHeight="16px"
                  fontWeight="400"
                  color={textColor}>
                  {item.trait_type}
                </Text>
                <Text
                  fontSize={{ base: '12px', md: '14px', xl: '14px' }}
                  lineHeight="16px"
                  fontWeight="400"
                  color="#FFFFFF">
                  {item.value}
                </Text>
                {item.percentTrait && (
                  <Text
                    fontSize="12px"
                    lineHeight="14px"
                    fontWeight="400"
                    color={textContent3}>
                    {item.percentTrait}
                  </Text>
                )}
              </Flex>
            ))
          ) : (
            <span>No properties</span>
          )}
        </Flex>
      </Collapse>
    </Box>
  )
}
