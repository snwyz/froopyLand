import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Flex,
  Stack,
} from '@chakra-ui/react'

export default function Attributes() {
  const attributes = [
    {
      key: 1,
      title: 'Background',
      number: 8,
      properties: [
        {
          key: 1,
          title: 'Red',
        },
        {
          key: 2,
          title: 'Blue',
        },

        {
          key: 3,
          title: 'Green',
        },
      ],
    },
    {
      key: 2,
      title: 'Clothes',
      number: 6,
      properties: [
        {
          key: 1,
          title: 'clothes 1',
        },
        {
          key: 2,
          title: 'clothes 2',
        },

        {
          key: 3,
          title: 'clothes 3',
        },
      ],
    },

    {
      key: 3,
      title: 'Earring',
      number: 43,
      properties: [
        {
          key: 1,
          title: 'Earing 1',
        },
        {
          key: 2,
          title: 'Earing 2',
        },

        {
          key: 3,
          title: 'Earing 3',
        },
      ],
    },

    {
      key: 4,
      title: 'Eyes',
      number: 76,
      properties: [
        {
          key: 1,
          title: ' Eyes 1',
        },
        {
          key: 2,
          title: ' Eyes 2',
        },

        {
          key: 3,
          title: 'Eyes 3',
        },
      ],
    },
    {
      key: 5,
      title: 'Fur',
      number: 19,
      properties: [
        {
          key: 1,
          title: 'Fur 1',
        },
        {
          key: 2,
          title: 'Fur 2',
        },

        {
          key: 3,
          title: 'Fur 3',
        },
      ],
    },

    {
      key: 6,
      title: 'Hat',
      number: 36,
      properties: [
        {
          key: 1,
          title: 'Hat 1',
        },
        {
          key: 2,
          title: 'Hat 2',
        },

        {
          key: 3,
          title: 'Hat 3',
        },
      ],
    },

    {
      key: 7,
      title: 'Mouth',
      number: 21,
      properties: [
        {
          key: 1,
          title: 'Mouth 3',
        },
        {
          key: 2,
          title: 'Mouth 3',
        },

        {
          key: 3,
          title: 'Mouth 3',
        },
      ],
    },
  ]

  return (
    <Box borderTop="1px solid #704BEA80" px="40px">
      <Flex mt="40px" flexDir="column">
        <Flex color="#FFF" justifyContent="space-between">
          <Box>
            <Box fontWeight="700" mb="20px" fontSize="16px">
              Attributes
            </Box>

            <Accordion
              sx={{
                scrollbarWidth: 'none',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              h="calc(100vh - 485px)"
              overflow="auto"
              defaultIndex={[0]}
              allowMultiple>
              {attributes.map((item, idx) => {
                return (
                  <AccordionItem borderStyle="hidden" key={idx}>
                    <Flex
                      alignItems="center"
                      mb="12px"
                      justifyContent="space-between">
                      <Box
                        color="rgba(255,255,255,0.8)"
                        mr="148px"
                        fontSize="14px"
                        fontWeight="400">
                        {item.title}
                      </Box>
                      <Flex justifyContent="center" alignItems="center">
                        <Box fontSize="12px" fontWeight="400">
                          {item.number}
                        </Box>
                        <AccordionButton p="0px">
                          <AccordionIcon color="rgba(255,255,255,0.6)" />
                        </AccordionButton>
                      </Flex>
                    </Flex>
                    <AccordionPanel p="0px 0px 12px 0px">
                      <Stack direction="column">
                        {item.properties.map((i, idx) => (
                          <Checkbox key={idx}>{i.title}</Checkbox>
                        ))}
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
