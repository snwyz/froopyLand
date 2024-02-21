import { Box, Flex } from '@chakra-ui/react'
import IconGridMode from '@static/market/IconGridMode'
import IconListMode from '@static/market/IconListMode'
import useStore from 'packages/store'

import { ViewMode } from '@ts'

const GridAndList = () => {
  const { isGridMode, setIsGridMode } = useStore()
  const handleChangeMode = (mode: ViewMode) => {
    const isGrid = mode === ViewMode.GRID
    setIsGridMode(isGrid)
  }
  return (
    <Flex
      gap={{ base: '10px', md: '14px' }}
      align="center"
      pr="15px"
      justifyContent={{ base: 'center', md: 'unset' }}>
      <Box
        opacity={isGridMode ? '1' : '0.6'}
        cursor="pointer"
        onClick={() => handleChangeMode(ViewMode.GRID)}>
        <IconGridMode color={isGridMode ? '#fff' : '#704BEA'} />
      </Box>
      <Box
        opacity={isGridMode ? '0.6' : '1'}
        cursor="pointer"
        onClick={() => handleChangeMode(ViewMode.LIST)}>
        <IconListMode color={!isGridMode ? '#fff' : '#704BEA'} />
      </Box>
    </Flex>
  )
}

export default GridAndList
