import { checkboxAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Checkbox theme
const baseStyle = definePartsStyle({
  control: {
    // borderRadius: '4px',
    // borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: '1px',
    _checked: {
      bg: '#fff',
      _hover: 'none',
      // borderColor: '#6423F1',
    },
  },
  icon: {
    color: '#000',
  },
})

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
})
