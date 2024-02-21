import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Collapse,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

export default function Description({ description }: { description?: string }) {
  const { isOpen, onToggle } = useDisclosure()
  const textColor = useColorModeValue('#FFA8FE', 'rgba(255,255,255,0.6)')
  const borderColor = useColorModeValue('#FFA8FE', 'rgba(255,255,255,0.2)')
  const bgColor = useColorModeValue(
    'rgba(255, 168, 254, 0.2)',
    'rgba(65, 65, 65, 0.3)',
  )
  return (
    <Box
      blur={{ base: '5px', md: 'unset' }}
      border={{ base: '2px solid', md: 'none' }}
      borderColor={{ base: borderColor, md: 'none' }}
      borderRadius="10px"
      bg={{ base: bgColor, md: 'none' }}>
      <Flex
        justifyContent="space-between"
        onClick={onToggle}
        cursor="pointer"
        h="40px"
        px={{ base: '12px', md: 'unset' }}
        borderBottom={{ base: !isOpen ? '1px solid' : '', md: 'none' }}
        borderColor={{ base: borderColor, md: 'none' }}
        _hover={{ opacity: '0.7' }}
        align="center">
        <Flex align="center" gap="12px">
          <Text
            fontSize={{ base: '16px', md: '16px', lg: '20px' }}
            lineHeight="23px"
            fontWeight="900">
            Description
          </Text>
        </Flex>
        {!isOpen ? (
          <ChevronUpIcon w={5} h={5} />
        ) : (
          <ChevronDownIcon w={5} h={5} />
        )}
      </Flex>
      <Collapse in={!isOpen} animateOpacity>
        <Text
          fontWeight="400"
          fontSize={{ base: '14px', lg: '16px' }}
          p={{ base: '15px 12px', md: '15px 0px' }}
          color={textColor}>
          {description ? description : 'No description'}
        </Text>
      </Collapse>
    </Box>
  )
}
