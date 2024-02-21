import { Box, Flex, Radio, RadioGroup } from '@chakra-ui/react'
export default function Status({
  value = '1',
  setValue,
}: {
  value: string
  setValue: (value: string) => void
}) {
  return (
    <Flex flexDir="column" color="#fff" px="40px">
      <Flex flexDir="column">
        <Flex mt="22px" pb="30px" flexDir="column">
          <Box fontWeight="700" fontSize="16px" mb="22px">
            Display
          </Box>
          <RadioGroup onChange={setValue} value={value}>
            <Flex
              color="rgba(255,255,255,0.8)"
              flexDir="column"
              fontSize="14px">
              <Radio value="1" mb="10px">
                Show All NFTs
              </Radio>
              <Radio value="2">Show My NFTs</Radio>
            </Flex>
          </RadioGroup>
        </Flex>
      </Flex>
    </Flex>
  )
}
