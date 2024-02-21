import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

// default base style from the Checkbox theme
// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  tab: {
    fontWeight: 900,
    marginRight: '20px',

    _selected: {
      textColor: '#00DAB3',
      opacity: '1',
    },
  },
})

// define a custom variant
const tabsOnModal = definePartsStyle({
  tab: {
    width: '279px',
    color: 'rgba(0, 0, 0, 0.6)',
    height: '52px',
    marginRight: '0px',
    border: '1px solid',
    borderRadius: '10px',
    borderColor: 'transparent',
    bg: '#F4F3F9',
    _selected: {
      borderColor: '#704BEA',
      color: '#704BEA',
    },
  },
  tablist: {
    justifyContent: 'space-between',
  },
})
const tabsDetailPool = definePartsStyle({
  tablist: {
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
  },
})

const tabsMyAccount = definePartsStyle({
  tab: {
    fontSize: '14px',
    fontWeight: 500,
    marginRight: '20px',
    textColor: 'rgba(255, 255, 255, 0.8)',

    _selected: {
      fontWeight: 900,
      textColor: '#fff',
      borderBottom: '2px solid',
      borderColor: '#fff',
      opacity: '1',
    },
  },
  tablist: {
    borderBottom: '1px solid',
    borderColor: 'rgba(112, 75, 234, 0.5)',
  },
})
const nonTabs = definePartsStyle({
  tab: {
    display: 'none',
  },
  tablist: {
    display: 'none',
  },
})

const mainTabs = definePartsStyle({
  tab: {
    fontSize: '14px',
    fontWeight: 500,
    marginLeft: '8px',
    textColor: '#00DAB3',

    _selected: {
      fontWeight: 900,
      textColor: '#00DAB3',
      borderBottom: '2px solid #00DAB3',
      borderColor: '#00DAB3',
      opacity: '1',
    },
  },
  tablist: {
    borderBottom: '1px solid',
    borderColor: 'rgba(112, 75, 234, 0.5)',
  },
})

export const tabsTheme = defineMultiStyleConfig({
  variants: { tabsOnModal, tabsMyAccount, nonTabs, mainTabs, tabsDetailPool },
  baseStyle,
})
