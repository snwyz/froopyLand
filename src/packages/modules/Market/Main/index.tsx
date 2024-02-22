import { lazy, Suspense } from 'react'

import { Box, Spinner } from '@chakra-ui/react'

// import { sleep } from '@utils'
import TabsCommon from '@components/TabsCommon'

import { MarketTabs } from '@ts'

import { Space, Table } from 'antd'

import type { TableProps } from 'antd'

import styled from '@emotion/styled'

// const ListItems = lazy(() => import('@components/ListItems'))
interface DataType {
  key: string
  item: string
  price: number
  owner: string
  startTime: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Current Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>View Game</a>
      </Space>
    ),
  },
]

const data: DataType[] = [
  {
    key: '1',
    item: 'John Brown',
    price: 32,
    owner: 'John Brown',
    startTime: '9min',
  },
  {
    key: '2',
    item: 'John Brown',
    price: 32,
    owner: 'John Brown',
    startTime: '9min',
  },
  {
    key: '3',
    item: 'John Brown',
    price: 32,
    owner: 'John Brown',
    startTime: '9min',
  },
]

const StyledTable = styled(Table)`
  .ant-table {
    background-color: transparent;
  }
`

export default function Main() {
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [pools, setPools] = useState([])

  // // Iterates all collections and returns their info.
  // const fetchAllCollectionsInfo = useCallback(async (collectionAddresses) => {
  //   const requests = collectionAddresses.map(async (address, index) => {
  //     const DELAY = 200
  //     await sleep(index * DELAY)
  //     let info
  //     try {
  //       info = await getNFTCollectionMetadata(address)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     return info
  //   })
  //   return Promise.all(requests)
  //   //Waiting for all the requests to get resolved.
  // }, [])

  // const newGetALlNFTAndLicense = useCallback(async () => {
  //   try {
  //     setIsLoading(true)
  //     const factoryContract = getFactoryContract()
  //     const pools = await factoryContract.methods.getNFTPoolInfo().call()
  //     const collectionsInfo = await fetchAllCollectionsInfo(
  //       pools.map((pool) => pool.originalContractAddress),
  //     )
  //     setPools(
  //       pools.map((pool, index) => ({
  //         ...pool,
  //         ...collectionsInfo[index],
  //       })),
  //     )
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [fetchAllCollectionsInfo])

  // useEffect(() => {
  //   newGetALlNFTAndLicense()
  // }, [newGetALlNFTAndLicense])

  const renderTabs = [
    {
      id: 0,
      title: 'Game List',
      value: MarketTabs.PUBLIC,
      render: (
        <StyledTable columns={columns} dataSource={data} pagination={false} />
        // <ListItems
        //   isLoading={isLoading}
        //   items={pools}
        //   columnsList={[
        //     'Pool name',
        //     'NFTs in pool',
        //     'Current highest bid',
        //     'Licenses supply',
        //   ]}
        // />
      ),
    },
  ]

  return (
    <Box alignItems="center" mb="50px">
      <Suspense
        fallback={
          <Box mt="300px">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        }>
        <TabsCommon
          variant="mainTabs"
          initTab={MarketTabs.PUBLIC}
          renderTabs={renderTabs}
        />
      </Suspense>
    </Box>
  )
}
