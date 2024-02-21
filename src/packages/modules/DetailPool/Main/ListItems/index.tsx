import { memo } from 'react'

import { Box, SimpleGrid, Spinner } from '@chakra-ui/react'
import useStore from 'packages/store'

import CommonTable from '@components/CommonTable'
import NoData from '@components/NoData'

import ItemGrid from './ItemGrid'
import ListTable from './ListTable'

interface ListItemsProps {
  isLoading: boolean
  items: any[]
  columnsGrid?: number[]
  columnsList?: Array<string>
  border?: string
  isApproved?: boolean
  setIsApproved?: (item: boolean) => void
  myNftStakedInPool?: any[]
  setMyNftStakedInPool?: (item: any[]) => void
  myNftExistInPool?: any[]
  setMyNftExistInPool?: (item: any[]) => void
}

function ListItems({
  isLoading,
  items,
  columnsGrid = [1, 2, 3, 3, 3, 4],
  columnsList,
  border,
  isApproved,
  setIsApproved,
  myNftStakedInPool,
  setMyNftStakedInPool,
  myNftExistInPool,
  setMyNftExistInPool,
}: ListItemsProps) {
  const { isGridMode } = useStore()

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

  return (
    <Box>
      <Box>
        {isGridMode ? (
          <SimpleGrid
            p={{
              base: '25px 10px 60px',
              md: '25px 32px 60px',
              xl: '25px 20px 60px',
            }}
            columns={columnsGrid}
            spacing="20px">
            {items?.map((item, idx) => {
              return (
                <ItemGrid
                  myNftExistInPool={myNftExistInPool}
                  setMyNftExistInPool={setMyNftExistInPool}
                  myNftStakedInPool={myNftStakedInPool}
                  setMyNftStakedInPool={setMyNftStakedInPool}
                  setIsApproved={setIsApproved}
                  isApproved={isApproved}
                  item={item}
                  key={idx}
                />
              )
            })}
          </SimpleGrid>
        ) : (
          <CommonTable
            border={border}
            columns={columnsList}
            renderItem={<ListTable items={items} />}
          />
        )}
      </Box>
    </Box>
  )
}

export default memo(ListItems)
