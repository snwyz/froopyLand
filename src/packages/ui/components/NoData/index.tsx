import { Box, Image, Text } from "@chakra-ui/react"

export default function NoData() {
  return (
    <Box w="100px" mx="auto" mt="40px">
      <Image
        alt="Empty data"
        objectFit="contain"
        src="/static/common/no-data.png"
      />
      <Text
        whiteSpace="nowrap"
        textAlign="center"
        mt="10px"
      >
        No data
      </Text>
    </Box>
  )
}
