import { Box, Flex, Text } from '@chakra-ui/react'

import { useWindowSize } from '@hooks/useWindowSize'

type HeaderProps = {
  title: string
  quantity: number
  headers: any
  button?: JSX.Element
}
export default function Header({
  headers,
  button,
  title,
  quantity,
}: HeaderProps) {
  const { width } = useWindowSize()

  return (
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      gap={{ base: '10px', lg: '30px', xl: '110px' }}
      borderBottom="1px solid #704BEA80"
      alignItems={{ xl: 'center' }}
      py={{ base: '5px', lg: 'none' }}
      h={{ base: 'none', lg: '60px', xl: '90px' }}>
      <Flex
        flexDir={{ base: 'column', lg: 'column' }}
        ml={{ base: '20px', lg: 'none' }}>
        <Box fontSize={`${width > 768 ? '20px' : '16px'}`} fontWeight="bold">
          {title}
        </Box>
        <Text
          fontSize={`${width > 768 ? '12px' : '10px'}`}
          color="#FFA8FE"
          justifyContent="center">
          {`${quantity} total`}
        </Text>
      </Flex>
      <Flex
        gap={{ md: '120px', lg: '40px', xl: '60px' }}
        pt={{ base: '5px', lg: 'none' }}
        borderTop={{ base: '1px solid', lg: 'unset' }}
        borderTopColor="#704BEA80">
        {headers.map((item, idx) => (
          <Box key={idx} ml={{ base: '20px', lg: 'none' }}>
            <Box fontSize={`${width > 768 ? '12px' : '10px'}`} color="#FFA8FE">
              {item.name}
            </Box>
            <Box
              fontSize={`${width > 768 ? '14px' : '12px'}`}
              fontWeight="bold">
              {item.number}
            </Box>
          </Box>
        ))}
      </Flex>

      {button}
    </Flex>
  )
}
