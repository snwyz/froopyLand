import { ChangeEventHandler } from 'react'

import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'

type SearchProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Search = ({ onChange }: SearchProps) => {
  const placeholderColor = useColorModeValue('#999', '#999')

  const [isLargerThan768] = useMediaQuery('(min-width: 769px)')
  const bgColorInputMobile = useColorModeValue('#F4F4F4', '#F4F4F4')
  const bgColorInputMD = useColorModeValue(
    '#F4F4F4',
    'rgba(255, 255, 255, 0.1)',
  )
  const bgColorInput = isLargerThan768 ? bgColorInputMD : bgColorInputMobile
  const colorSearchIconMoblie = useColorModeValue('#000000CC', '#000000CC')
  const colorSearchIconMD = useColorModeValue(
    '#000000CC',
    'rgba(255, 255, 255, 0.8)',
  )
  const colorSearchIcon = isLargerThan768
    ? colorSearchIconMD
    : colorSearchIconMoblie

  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none" mt="3px" ml="5px">
          <SearchIcon w="12px" h="12px" color={colorSearchIcon} />
        </InputLeftElement>
        <Input
          w="100%"
          h="46px"
          borderRadius="10px"
          bg={bgColorInput}
          _focus={{
            border: 'unset',
          }}
          _focusVisible={{
            border: 'unset',
          }}
          border="unset"
          color="gray.400"
          placeholder="Search"
          _placeholder={{
            color: placeholderColor,
          }}
          onChange={onChange}
          textColor="black"
        />
      </InputGroup>
    </Box>
  )
}

export default Search
