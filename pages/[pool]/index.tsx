import { FC, memo } from 'react'

import Head from 'next/head'

import { Box } from '@chakra-ui/react'
import DetailPool from '@modules/DetailPool'

const DetailPage: FC = () => {
  return (
    <>
      <Head>
        <title>PoolZ details page</title>
        <meta name="description" content="PoolZ." />
        <meta name="keywords" content="Pool, froppyLand, crypto, nft, eth, " />
      </Head>

      <Box p={0}>
        <DetailPool />
      </Box>
    </>
  )
}

export default memo(DetailPage)
