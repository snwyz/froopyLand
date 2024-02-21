import { memo, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import GridAndList from '@components/GridAndList'

type RenderTabsType = {
  id: number
  title: string
  render: JSX.Element
  value: string
}

type TabsCommonProps = {
  renderTabs: RenderTabsType[]
  initTab?: string
  variant?: string
  gridAndListMode?: boolean
  fontSizeTable?: {
    header: string
    text: string
  }
}
function TabsCommon({
  renderTabs,
  initTab,
  variant,
  gridAndListMode = true,
  fontSizeTable,
}: TabsCommonProps) {
  const [selectedTab, setSelectedTab] = useState(initTab)

  const router = useRouter()
  const { pathname } = router
  const checkAccountPage = pathname.includes('/account/my-nfts')

  useEffect(() => {
    if (router.isReady) {
      if (router.query?.tab) {
        setSelectedTab(router.query.tab as string)
      }
    }
  }, [initTab, router.isReady, router.query.tab])

  const onChangeTab = (index: number) => {
    if (renderTabs.length > 1) {
      const selectedTab = renderTabs[index]?.value || initTab
      setSelectedTab(selectedTab)
      if (index === 0) {
        router.push(`?tab=${initTab}`, undefined, {
          shallow: true,
        })
      } else {
        router.push(`?tab=${selectedTab}`, undefined, { shallow: true })
      }
    }
  }

  return (
    <Tabs
      variant={variant}
      index={renderTabs.findIndex((it) => it.value === selectedTab)}
      onChange={onChangeTab}>
      <TabList
        px={{ base: '20px', md: '30px' }}
        pt="20px"
        sx={{
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}>
        <Flex w="100%" justify="space-between" align="center">
          <Flex align="center" gap="10px">
            {renderTabs?.map((item) => (
              <Tab
                py="8px"
                px={0}
                key={item.title}
                whiteSpace="nowrap"
                fontSize={
                  fontSizeTable
                    ? { base: '12px', md: '12px' }
                    : { base: '14px', md: '16px' }
                }>
                {item.title}
              </Tab>
            ))}
          </Flex>
          {!checkAccountPage && gridAndListMode && <GridAndList />}
        </Flex>
      </TabList>

      <TabPanels>
        {renderTabs?.map((item) => {
          return (
            <TabPanel p={0} key={item.id}>
              {item.render}
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}

export default memo(TabsCommon)
