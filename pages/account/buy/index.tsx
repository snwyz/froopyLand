import { FC, memo } from 'react'

import Head from 'next/head'

import Main from '@modules/Account/Buy'

const Buy: FC = () => {
  return (
    <>
      <Head>
        <title>PoolZ</title>
        <meta name="description" content="PoolZ." />
        <meta name="keywords" content="poolz, froppyLand, crypto, nft, eth, " />
      </Head>

      <Main />
    </>
  )
}

export default memo(Buy)
