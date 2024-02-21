import { memo, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Flex,
  Hide,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'

import GridAndList from '@components/GridAndList'

type RenderTabsType = {
  id: number
  title: string
  render: JSX.Element
  value: string
  length?: number
}

type TabsCommonProps = {
  renderTabs: RenderTabsType[]
  initTab?: string
  variant?: string
  length?: number
}
function TabsDetailPool({
  renderTabs,
  initTab,
  variant,
  length,
}: TabsCommonProps) {
  const [selectedTab, setSelectedTab] = useState(initTab)

  const router = useRouter()

  const onChangeTab = (index: number) => {
    if (renderTabs.length > 1) {
      const selectedTab = renderTabs[index]?.value || initTab
      setSelectedTab(selectedTab)
      if (index === 0) {
        router.push({ query: { ...router.query, tab: initTab } }, undefined, {
          shallow: true,
        })
      } else {
        router.push(
          { query: { ...router.query, tab: selectedTab } },
          undefined,
          {
            shallow: true,
          },
        )
      }
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (router.query?.tab) {
        setSelectedTab(router.query.tab as string)
      }
    }
  }, [initTab, router.isReady, router.query.tab])

  return (
    <>
      <Tabs
        variant="tabsDetailPool"
        w="100%"
        index={renderTabs.findIndex((it) => it.value === selectedTab)}
        onChange={onChangeTab}>
        <TabList
          p={{
            base: '0px 20px',
            md: '0px 40px',
            lg: '0px 40px',
            xl: '5px 12px',
          }}
          borderBottom="1px solid #704BEA80"
          alignItems="center"
          justifyContent="space-between"
          fontWeight="700"
          fontSize="14px">
          <Flex w="100%" justify="space-between" align="center">
            <Flex align="center" gap="10px">
              {renderTabs?.map((item) => (
                <Tab px={0} key={item.title}>
                  {item.title}
                </Tab>
              ))}
            </Flex>
            <Hide below="xl">
              <GridAndList />
            </Hide>
          </Flex>
        </TabList>
        <TabPanels>
          {renderTabs?.map((item) => {
            return (
              <TabPanel mb="12px" key={item.id} p="0.5rem">
                <Box
                  key={item.id}
                  borderBottom="1px solid rgba(112,75,234,0.5)"
                  pl={{ base: '12px', md: '30px', lg: '30px', xl: '16px' }}
                  pb="8px"
                  fontSize="12px"
                  color="rgba(255,255,255,0.6)"
                  textAlign="start">
                  {item.length} {item.length > 1 ? 'items' : 'item'}
                </Box>
                {item.render}
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>
    </>
  )
}

export default memo(TabsDetailPool)
