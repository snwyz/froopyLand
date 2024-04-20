import { ToastContainer } from 'react-toastify'
import useVH from 'react-vh'

import { ChakraProvider } from '@chakra-ui/react'

import customTheme from '@styles/customTheme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Web3ModalProvider } from '../src/packages/web3/Web3Modal'

import { isProd } from 'packages/constants'

import 'react-toastify/dist/ReactToastify.css'
import '@styles/_globals.scss'

import DefaultLayout from '../src/layout/default'
// import useAuctions from 'packages/store/auctions'

// replace console.* for disable log on production
if (isProd) {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: any) => {
  useVH()
  // const { setStartTimeByContract } = useAuctions()

  // useEffect(() => {
  //   setStartTimeByContract()
  // }, [])

  return (
    <ChakraProvider theme={customTheme}>
      <DefaultLayout>
        <QueryClientProvider client={queryClient}>
          <Web3ModalProvider>
            <Component {...pageProps} />
          </Web3ModalProvider>
        </QueryClientProvider>
      </DefaultLayout>
      <ToastContainer autoClose={3000} theme="colored" />
    </ChakraProvider>
  )
}

export default App
