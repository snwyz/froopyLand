import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Collapse,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { PriceHistoryChart } from '@modules/MarketDetail/ItemNftDetail/PriceHistory/PriceHistoryChart'

export default function PriceHistory({
  description,
}: {
  description?: string
}) {
  const { isOpen, onToggle } = useDisclosure()
  const textColor = useColorModeValue('#FFA8FE', 'rgba(255,255,255,0.6)')
  const borderColor = useColorModeValue('#FFA8FE', 'rgba(255,255,255,0.2)')
  const bgColor = useColorModeValue(
    'rgba(112, 75, 234, 0.1)',
    'rgba(65, 65, 65, 0.3)',
  )
  return (
    <Box
      blur={{ base: '5px', md: 'unset' }}
      borderRadius="10px"
      bg={{ base: bgColor, md: 'none' }}>
      <Flex
        justifyContent="space-between"
        onClick={onToggle}
        cursor="pointer"
        h="40px"
        m={{ md: '10px 0px', lg: '0px' }}
        px={{ base: '12px', md: '16px' }}
        borderTop="1px solid #704BEA80"
        borderBottom={{ base: !isOpen ? '1px solid' : '', md: 'none' }}
        _hover={{ opacity: '0.7' }}
        align="center">
        <Flex align="center" gap="12px">
          <Text
            fontSize={{ base: '14px', md: '14px', lg: '14px' }}
            lineHeight="23px"
            fontWeight="900"
            color="#fff">
            Price History
          </Text>
        </Flex>
        {!isOpen ? (
          <ChevronUpIcon w={5} h={5} color="#fff" />
        ) : (
          <ChevronDownIcon w={5} h={5} color="#fff" />
        )}
      </Flex>
      <Collapse in={!isOpen} animateOpacity>
        <PriceHistoryChart contractAddress="" />
      </Collapse>
    </Box>
  )
}
