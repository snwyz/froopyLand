import { Box, Image } from '@chakra-ui/react'

type AvatarProps = {
  src: string
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Box
      w="142px"
      h="142px"
      bg="black"
      overflow="hidden"
      mx="auto"
      borderWidth="6px"
      borderColor="white"
      borderRadius="50%">
      <Image w="130px" h="130px" borderRadius="50%" src={src} alt="avatar" />
    </Box>
  )
}

export default Avatar
