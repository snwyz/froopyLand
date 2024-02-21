import { useState } from 'react'

import { Box } from '@chakra-ui/react'

import Attributes from './Attributes'
import Status from './Status'

export default function SideBarLeft() {
  const [value, setValue] = useState('1')
  return (
    <Box borderRight="1px solid rgba(112,75,234,0.5)">
      <Status value={value} setValue={setValue} />
      <Attributes />
    </Box>
  )
}
