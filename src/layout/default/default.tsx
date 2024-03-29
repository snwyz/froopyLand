import { PropsWithChildren } from 'react'
import { memo } from 'react'

import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from '@components/Container'

const DefaultLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
      </Head>
      <Container>{children}</Container>
    </>
  )
}

export default memo(DefaultLayout)
