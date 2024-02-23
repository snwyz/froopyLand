import { Suspense, lazy, useState } from 'react'

import { Box, Spinner } from '@chakra-ui/react'
import styled from '@emotion/styled'
import type { TableProps } from 'antd'
import { Space, Table } from 'antd'

// import { sleep } from '@utils'
import TabsCommon from '@components/TabsCommon'

import { MarketTabs } from '@ts'

interface Item {
  derivativeContractAddress: string
  originalContractAddress: string
  image: string
  currentNFTInPool: string
  LicenseSupply: string
  name: string
  currentHighestOffer: string
}

const ListItems = lazy(() => import('@components/ListItems'))
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

const iData = [
  {
    derivativeContractAddress: 'string',
    originalContractAddress: 'string',
    image: 'https://api.our-metaverse.xyz/ourms/4_pnghash_a660da5ab5d19878015e8a5f7a7da3c196b834eb50ac65a62f1dbf339cd96ef5_73222158.webp',
    currentNFTInPool: 'string',
    LicenseSupply: 'string',
    name: 'NNNNN',
    currentHighestOffer: '2000',
    owner: 'Xxxx',
    startTime: '10:29',
  }
]

export default function Main() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pools, setPools] = useState([])

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
        // <StyledTable columns={columns} dataSource={data} pagination={false} />
        <ListItems
          isLoading={isLoading}
          items={iData}
          columnsList={[
            'NFT name',
            'Owner',
            'Current Price',
            'Start time'
          ]}
        />
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
