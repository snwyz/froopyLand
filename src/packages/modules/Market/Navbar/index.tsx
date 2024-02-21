import { useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import JoinPoolSuccessModal from '@modules/Modals/account/success/JoinPoolSuccessModal'
import IconMarket from '@static/market/IconMarket'
import useStore from 'packages/store'

import { MarketType } from '@ts'

export default function Market() {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1025px)')
  const { marketType, setMarketType, resetAllFilterMarket } = useStore()
  const router = useRouter()
  const { type } = router.query
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue('#000!important', '#704BEA!important')

  const handleClickCollection = () => {
    router.push(`/?type=${MarketType.COLLECTIONS}`, undefined, {
      shallow: true,
    })
    setMarketType(MarketType.COLLECTIONS)
    resetAllFilterMarket()
  }
  const handleClickLicense = () => {
    router.push(`/?type=${MarketType.MINION}`, undefined, {
      shallow: true,
    })
    setMarketType(MarketType.MINION)
    resetAllFilterMarket()
  }

  useEffect(() => {
    resetAllFilterMarket()
    if (type == MarketType.MINION) {
      setMarketType(MarketType.MINION)
    } else {
      setMarketType(MarketType.COLLECTIONS)
    }
  }, [resetAllFilterMarket, setMarketType, type])

  return (
    <Flex
      flexWrap="wrap"
      alignItems="center"
      p={isLargerThan1024 ? '50px 0px 40px' : '32px 0px'}
      justifyContent={{ sm: 'center', md: 'space-between' }}>
      <Flex display={{ base: 'none', md: 'none', lg: 'flex' }}>
        <IconMarket />
      </Flex>

      <Flex
        w={{ base: '100%', sm: '100%', md: '100%', lg: 'unset' }}
        gridGap="24px">
        <Button
          p={{ sm: '12px 20px', md: '20px 48px' }}
          w={{ base: '50%', md: '50%', lg: 'unset' }}
          lineHeight="23px"
          fontWeight="900"
          fontSize={{ sm: '16px', md: '20px' }}
          bg={
            marketType === MarketType.COLLECTIONS
              ? '#00DAB3!important'
              : bgColor
          }
          color={marketType === MarketType.COLLECTIONS ? '#000' : '#fff'}
          boxShadow={
            marketType === MarketType.COLLECTIONS ? '0px 0px 25px #00DAB3' : ''
          }
          borderRadius="15px"
          h={{ base: '60px', sm: '90px', md: '64px' }}
          onClick={onOpen}>
          Collections
        </Button>
        <Button
          p={{ base: '12px 20px', sm: '12px 20px', md: '20px 48px' }}
          w={{ base: '50%', md: '50%', lg: 'unset' }}
          lineHeight="23px"
          fontWeight="900"
          fontSize={{ sm: '16px', md: '20px' }}
          bg={marketType === MarketType.MINION ? '#00DAB3!important' : bgColor}
          color={marketType === MarketType.MINION ? '#000' : '#fff'}
          boxShadow={
            marketType === MarketType.MINION ? '0px 0px 25px #00DAB3' : ''
          }
          onClick={handleClickLicense}
          borderRadius="15px"
          h={{ base: '60px', sm: '90px', md: '64px' }}>
          Minion
        </Button>
      </Flex>
      <JoinPoolSuccessModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
