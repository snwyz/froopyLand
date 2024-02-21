import { Box } from '@chakra-ui/react'

import { useIsVerifiedCollection } from '@hooks/useIsVerifiedCollection'
import { useOpenseaCollectionDetails } from '@hooks/useOpenseCollectionDetails'

import { VerifiedType } from './type'

export const Verified = ({ contractAddress }: VerifiedType) => {
  const { data: collectionDetails, isLoading } = useOpenseaCollectionDetails({
    contractAddress,
  })
  const { slug } = collectionDetails!
  const { data: isVerifiedCollection } = useIsVerifiedCollection({ slug })
  return (
    <Box>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente fuga non
      aliquam molestiae mollitia nisi repellendus iste, fugiat quam rem, ex
      eligendi est, velit inventore facilis. Culpa ea id a quisquam fuga, quidem
      explicabo veritatis blanditiis sit quo autem minima voluptates? Magnam
      earum quam asperiores harum perspiciatis quia autem molestiae.
    </Box>
  )
}
