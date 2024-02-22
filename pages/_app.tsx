import { ToastContainer } from 'react-toastify'
import useVH from 'react-vh'

import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '@styles/customTheme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { isProd } from 'packages/constants'
import { ConfigProvider, theme } from 'antd';

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
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: [theme.darkAlgorithm],
        token: {
          colorLink: '#bb86fc',
          colorText: '#fff'
        },
        components: {
          Table: {
            /* 这里是你的组件 token */
            headerBg: 'transparent'
          },
        }
      }}
    >
      <ChakraProvider theme={customTheme}>
        <DefaultLayout>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </DefaultLayout>
        <ToastContainer autoClose={3000} theme="colored" />
      </ChakraProvider>
    </ConfigProvider>
  )
}

export default App
