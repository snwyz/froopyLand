import { memo, useMemo } from 'react'

import {
  Box,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react'
import useStore from 'packages/store'

import CommonTable from '@components/CommonTable'
import NoData from '@components/NoData'

import Table from '@components/ListItems/Table'

interface ListItemsProps {
  isLoading: boolean
  isCustom?: boolean
  items: any[]
  haveGridMode?: boolean
  columnsGrid?: number[]
  columnsList?: Array<string>
}

function ListItems({
  isLoading,
  isCustom,
  items,
  haveGridMode = true,
  columnsGrid = [1, 2, 3, 4, 5, 6],
  columnsList,
}: ListItemsProps) {
  const { isGridMode, currentPage, itemOffset, setItemOffset, setCurrentPage } =
    useStore()

  const itemsPerPage =
    useBreakpointValue(
      {
        base: 4,
        sm: 4,
        md: 9,
        lg: 12,
        xl: 15,
        '2xl': 18,
      },
      {
        fallback: 'md',
      },
    ) ?? 15

  const endOffset = useMemo(() => {
    return itemOffset + itemsPerPage
  }, [itemOffset, itemsPerPage])

  const pageCount = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage)
  }, [items.length, itemsPerPage])

  const currentItems = useMemo(() => {
    return items.slice(itemOffset, endOffset)
  }, [endOffset, itemOffset, items])
  if (isLoading) {
    return (
      <Box textAlign="center" mt="300px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    )
  }

  if (items?.length === 0) {
    return <NoData />
  }
  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage)
    const newOffset = (selectedPage * itemsPerPage) % items.length

    setItemOffset(newOffset)
  }

  return (
    <Box>
        <CommonTable
          paddingTopHeader="12px"
          borderLeftWidth="0px"
          borderTopWidth="0px"
          fontWeightHeaderTable="400"
          fontSizeHeaderTable="12px"
          columns={columnsList}
          renderItem={<Table isCustom={isCustom} items={currentItems} />}
        />
      {/* <Flex my="30px" justify="flex-end" mr="40px">
        <ReactPaginate
          forcePage={currentPage}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination_dark"
          activeClassName="active_dark"
        />
      </Flex> */}
    </Box>
  )
}

export default memo(ListItems)
