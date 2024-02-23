import { ToastContainer } from 'react-toastify'
import useVH from 'react-vh'

import { ChakraProvider } from '@chakra-ui/react'

import customTheme from '@styles/customTheme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ConfigProvider, theme } from 'antd'

import { isProd } from 'packages/constants'

import 'react-toastify/dist/ReactToastify.css'
import '@styles/_globals.scss'

import DefaultLayout from '../src/layout/default'

// replace console.* for disable log on production
if (isProd) {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: any) => {
  useVH()

  return (
    <ChakraProvider theme={customTheme}>
      <ConfigProvider
        theme={{
          // 1. 单独使用暗色算法
          algorithm: [theme.darkAlgorithm],
          token: {
            colorLink: '#bb86fc',
            colorText: '#fff',
          },
        }}>
        <DefaultLayout>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </DefaultLayout>
        <ToastContainer autoClose={3000} theme="colored" />
      </ConfigProvider>
    </ChakraProvider>
  )
}

export default App
