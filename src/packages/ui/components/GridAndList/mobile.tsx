import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'
import IconGridMode from '@static/market/IconGridMode'
import IconListMode from '@static/market/IconListMode'
import useStore from 'packages/store'

import { ViewMode } from '@ts'

const GridListMobile = () => {
  const { isGridMode, setIsGridMode } = useStore()
  const handleChangeMode = (mode: ViewMode) => {
    const isGrid = mode === ViewMode.GRID
    setIsGridMode(isGrid)
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Button onClick={() => onOpen()} background="none" pr={0} minW={0}>
          {isGridMode ? (
            <IconGridMode color="#FFF" />
          ) : (
            <IconListMode color="#FFF" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent w="130px">
        <PopoverArrow bgColor="#FFF" />
        <PopoverBody borderRadius="12px" bgColor="#FFF">
          <Button
            background="none"
            mr="6px"
            cursor="pointer"
            onClick={() => {
              onClose()
              handleChangeMode(ViewMode.GRID)
            }}>
            <IconGridMode color={isGridMode ? '#704BEA' : 'rgba(0,0,0,0.3)'} />
          </Button>
          <Button
            background="none"
            cursor="pointer"
            onClick={() => {
              onClose()
              handleChangeMode(ViewMode.LIST)
            }}>
            <IconListMode color={!isGridMode ? '#704BEA' : 'rgba(0,0,0,0.3)'} />
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default GridListMobile
