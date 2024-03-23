import { lazy, useState } from 'react'

import { Box, Flex, Text, Button, Heading, Image } from '@chakra-ui/react'

import TabsCommon from '@components/TabsCommon'

import { useWindowSize } from '@hooks/useWindowSize'

import { MarketTabs } from '@ts'

const ListItems = lazy(() => import('@modules/Profile/ListItems'))
const Sidebar = lazy(() => import('@modules/Profile/Sidebar'))
const Header = lazy(() => import('@modules/Profile/Header'))
const RedeemModal = lazy(() => import('@modules/Profile/RedeemModal'))

export default function Main() {
  const { width } = useWindowSize()

  const [open, setOpen] = useState(false)

  
  const headers = [
    {
      name: 'FLT Price',
      number: '$ 56',
    },
    {
      name: 'My Key Holder Dividends',
      number: '52 ETH',
    },
    {
      name: 'My NFT Provider Dividends',
      number: '16 ETH',
    },
    {
      name: 'My Final Winner Prize',
      number: '10 ETH',
    },
  ]


  const assetHeaders = [
    {
      name: 'My Key Holder Dividends',
      number: '52 ETH',
    },
    {
      name: 'My NFT Provider Dividends',
      number: '16 ETH',
    },
    {
      name: 'My Final Winner Prize',
      number: '10 ETH',
    },
  ]


  const renderTabs = [
    {
      id: 0,
      title: 'Public pool',
      value: MarketTabs.PUBLIC,
      render: (
        <ListItems
          haveGridMode={false}
          columnsGrid={[1, 2, 3, 4, 5]}
          isLoading={false}
          isCustom={false}
          items={Array.from({ length: 10 })}
          columnsList={['16 Total', 'Duration', 'Type', 'Amount']}
        />
      ),
    },
  ]
  const renderNFTS = [
    {
      id: 0,
      title: 'Public pool',
      value: MarketTabs.PUBLIC,
      render: (
        <ListItems
          haveGridMode={false}
          columnsGrid={[1, 2, 2, 2, 5]}
          isLoading={false}
          items={Array.from({ length: 10 })}
          isCustom
          columnsList={['3 Total', 'NFT ID']}
        />
      ),
    },
  ]
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" minW={{ base: 'full', md: '500px' }}>
        <Header headers={headers} />
        <Box m="0 216px" pb="72px">
            <Text fontSize="24px" color="#fff" mt="24px" mb="24px">My Assets</Text>
            <Flex gap="30px">
                <Box flex={1} p="28px 30px" border="1px solid #704BEA" bgColor='rgba(118, 74, 242, 0.5)' borderRadius="20px"> 
                    <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">My Keys</Text>
                    <Flex alignItems="baseline">
                        <Text color="#00DAB3" lineHeight="54px" fontSize="36px" fontWeight="900" mr="10px">18,000</Text><Text fontSize="16px" lineHeight="24px">keys</Text>
                    </Flex>
                    <Text>$18,000</Text>
                    <Button mt="12px" bgColor="#00DAB3"  w="100%" height="52px" color="#000" fontSize="20px" lineHeight="30px" onClick={() => setOpen(true)}>Redeem</Button>
                </Box>
                <Box flex={1} p="28px 30px" border="1px solid #704BEA" bgColor='rgba(118, 74, 242, 0.5)' borderRadius="20px"> 
                    <Flex justify="space-between" align="center">
                      <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">My $FL Tokens</Text>
                      <Flex align="center">Swap $FLT <Image src='/static/profile/share.svg' ml="10px" alt='share' w="20px" h="20px"></Image></Flex>
                    </Flex>
                    <Flex alignItems="baseline">
                        <Text color="#00DAB3" lineHeight="54px" fontSize="36px" fontWeight="900" mr="10px">18,000</Text><Text fontSize="16px" lineHeight="24px">FL</Text>
                    </Flex>
                    <Text>$18,000</Text>
                    <Flex mt="12px" gap="12px">
                      <Button border="1px solid #704BEA" bg='rgba(118, 74, 242, 0.5)'  w="100%" height="52px" color="#9778FF" fontSize="20px" lineHeight="30px" textShadow="0px 0px 30px 0px #390885;">Withdraw</Button>
                      <Button bgColor="#00DAB3"  w="100%" height="52px" color="#000" fontSize="20px" lineHeight="30px">Deposit</Button>
                    </Flex>
                </Box>
            </Flex>

            <Flex mt="30px" justify="space-between" p="28px 30px" border="1px solid #704BEA" bgColor='rgba(118, 74, 242, 0.5)' borderRadius="20px">
              <Box flexBasis="33.33%" pr="30px">
                <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">My Key Holder Dividends</Text>
                <Flex alignItems="baseline">
                    <Text color="#00DAB3" lineHeight="54px" fontSize="36px" fontWeight="900" mr="10px">22</Text><Text fontSize="16px" lineHeight="24px">ETH</Text>
                </Flex>
                <Text color="rgba(255, 255, 255, 0.8)">Unclaimed: 1.23 ETH</Text>
                <Button mt="12px" bgColor="#00DAB3"  w="100%" height="52px" color="#000" fontSize="20px" lineHeight="30px">Claim</Button>
              </Box>
              <Box borderLeft="1px solid #704BEA" pl="30px" m="0 100px" flexBasis="33.33%">
                <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">My NFT Provider Dividends</Text>
                <Flex alignItems="baseline">
                    <Text color="#00DAB3" lineHeight="54px" fontSize="36px" fontWeight="900" mr="10px">22</Text><Text fontSize="16px" lineHeight="24px">ETH</Text>
                </Flex>
                <Text color="rgba(255, 255, 255, 0.8)">Unclaimed: 1.23 ETH</Text>
                <Button mt="12px" bgColor="#00DAB3"  w="100%" height="52px" color="#000" fontSize="20px" lineHeight="30px">Claim</Button>
              </Box>
              <Box borderLeft="1px solid #704BEA" pl="30px"  flexBasis="33.33%">
                <Text fontSize="16px" color="#FFA8FE" lineHeight="24px">My Final Winner Prize</Text>
                <Flex alignItems="baseline">
                    <Text color="#00DAB3" lineHeight="54px" fontSize="36px" fontWeight="900" mr="10px">22</Text><Text fontSize="16px" lineHeight="24px">ETH</Text>
                </Flex>
                <Text color="rgba(255, 255, 255, 0.8)">Unclaimed: 1.23 ETH</Text>
                <Button mt="12px" bgColor="#00DAB3"  w="100%" height="52px" color="#000" fontSize="20px" lineHeight="30px">Claim</Button>
              </Box>
            </Flex>

            <Heading mt="50px" fontSize="20px" fontWeight={800} lineHeight="24px">My Dividends & Prize</Heading>
            <Box textAlign="center">
                <TabsCommon
                    variant="nonTabs"
                    initTab={MarketTabs.PUBLIC}
                    renderTabs={renderTabs}
                    />
            </Box>
            <Heading mt="50px" fontSize="20px" fontWeight={800} lineHeight="24px">My NFTs</Heading>
            <Box textAlign="center">
            <TabsCommon
                    variant="nonTabs"
                    initTab={MarketTabs.PUBLIC}
                    renderTabs={renderNFTS}
                    />
            </Box>
        </Box>
      </Box>
      <RedeemModal isOpen={open} onClose={() => setOpen(false)} />
    </Flex>
  )
}
