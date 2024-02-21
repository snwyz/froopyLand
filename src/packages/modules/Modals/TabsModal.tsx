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

type TabsModalProps = {
  renderTabs: RenderTabsType[]
  initTab?: string | undefined
  variant?: string
  gridAndListMode?: boolean
}
function TabsModals({
  renderTabs,
  initTab,
  variant,
  gridAndListMode = true,
}: TabsModalProps) {
  const [selectedTab, setSelectedTab] = useState(undefined)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      if (router.query?.tab) {
        setSelectedTab(router.query.tab as string)
      }
    }
  }, [router.isReady, router.query.tab])

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
                fontSize={{ base: '14px', md: '16px' }}>
                {item.title}
              </Tab>
            ))}
          </Flex>
          {gridAndListMode && <GridAndList />}
        </Flex>
      </TabList>

      <TabPanels>
        {renderTabs?.map((item) => {
          return (
            <TabPanel px={0} key={item.id}>
              {item.render}
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}

export default memo(TabsModals)
