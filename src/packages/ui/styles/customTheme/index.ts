import { extendTheme } from '@chakra-ui/react'

import { checkboxTheme } from './checkbox'
import { modalTheme } from './modal'
import { tabsTheme } from './tabs'

const customTheme = extendTheme({
  components: { Checkbox: checkboxTheme, Tabs: tabsTheme, Modal: modalTheme },
  fonts: {
    // heading: `'Open Sans', sans-serif`,
    heading: `'Poppins', 'Rubik', sans-serif;`,
    body: `'Poppins', 'Rubik', sans-serif;`,
  },
  colors: {
    primary: {
      500: '#00DAB3'
    }
  }
})

export default customTheme
