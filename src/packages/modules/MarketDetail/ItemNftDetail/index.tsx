import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import {
  convertUrlImage,
  getAssetOpenSeaURL,
  getPublicEtherscanUrl,
} from 'packages/lib/utilities'

import { ellipseAddress, validVideoUrl } from '@utils'

import { MetadataType } from '@ts'

import Description from './Description'
import Details from './Details'
import Properties from './Properties'

export default function ItemNftDetail({
  metadata,
  owner,
}: {
  metadata: MetadataType
  owner: string
}) {
  const isVideo = validVideoUrl(metadata.image)
  const [isLargerThan1018] = useMediaQuery('(min-width: 1018px)')
  const textColor = useColorModeValue('#FFA8FE', 'rgba(255,255,255,0.6)')

  return (
    <>
      <Flex
        gridGap={{ base: '20px', lg: '44px' }}
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={{ base: 'none', md: 'space-around', lg: 'none' }}>
        <Box display={{ base: 'block', md: 'none' }}>
          <Flex alignItems="flex-end">
            <Text
              lineHeight="36px"
              fontSize={{ base: '22px', sm: '25px' }}
              fontWeight="900"
              textColor="#fff">
              {`${metadata.title ? metadata.title : 'No title'} #${
                metadata.details.tokenId
              }`}
            </Text>
            <Box
              mt={{ base: '10px', sm: 'none' }}
              ml={{ base: '12px', lg: '34px' }}
              mb="7px"
              onClick={() =>
                window.open(
                  getAssetOpenSeaURL({
                    ...metadata.details,
                  }),
                  '_blank',
                )
              }>
              <Image
                src="/static/common/opensea-logo.svg"
                alt="opensea"
                w={{ base: '35px', md: '28px', lg: '35px' }}
                h={{ base: '35px', md: '28px', lg: '35px' }}
              />
            </Box>
            {/* <Flex gridGap="20px">
                <Image
                  cursor="pointer"
                  alt=""
                  src="./static/market/iconStar.svg"
                />
                <Image
                  cursor="pointer"
                  alt=""
                  src="./static/market/iconShare.svg"
                />
                <Image
                  cursor="pointer"
                  alt=""
                  src="./static/market/iconShowMore.svg"
                />
              </Flex> */}
          </Flex>

          {owner && (
            <Flex
              p={{ base: '7px 0px 2px 0px', md: '15px 0px 27px 0px' }}
              alignItems={{ base: 'left', lg: 'center' }}>
              <Text
                fontWeight="400"
                fontSize={{ base: '14px' }}
                color={textColor}
                pr="8px">
                Owned by
              </Text>
              <Link
                fontWeight="400"
                textColor="white"
                fontSize={{ base: '14px' }}
                color="#000"
                href={getPublicEtherscanUrl(owner)}
                isExternal>
                {ellipseAddress(owner)}
              </Link>
            </Flex>
          )}
        </Box>
        <AspectRatio
          w={{ base: 'full', md: '280px', lg: '360px' }}
          h={{ base: 'full', md: '280px', lg: '360px' }}
          ratio={1 / 1}>
          {isVideo ? (
            <video
              src={metadata.image}
              autoPlay
              loop
              muted
              style={{ borderRadius: '10px' }}
            />
          ) : (
            <Image
              src={convertUrlImage(metadata.image)}
              alt=""
              objectFit="cover"
              borderRadius="10px"
              fallbackSrc="/static/license-template/template.png"
            />
          )}
        </AspectRatio>

        <Box w={{ base: '100%', md: '50%', lg: 'calc(100% - 400px)' }}>
          <Box display={{ base: 'none', md: 'block' }}>
            <Flex alignItems="flex-end">
              <Text
                lineHeight="36px"
                fontSize={{ base: '28px', md: '25px', lg: '32px' }}
                fontWeight="900"
                textColor="#fff">
                {`${metadata.title ? metadata.title : 'No title'} #${
                  metadata.details.tokenId
                }`}
              </Text>
              <Box
                mt={{ base: '10px', sm: 'none' }}
                ml={{ base: '12px', lg: '34px' }}
                mb="7px"
                onClick={() =>
                  window.open(
                    getAssetOpenSeaURL({
                      ...metadata.details,
                    }),
                    '_blank',
                  )
                }>
                <Image
                  src="/static/common/opensea-logo.svg"
                  alt="opensea"
                  w={{ base: '35px', md: '28px', lg: '35px' }}
                  h={{ base: '35px', md: '28px', lg: '35px' }}
                />
              </Box>
              {/* <Flex gridGap="20px">
                <Image
                  cursor="pointer"
                  alt=""
                  src="./static/market/iconStar.svg"
                />
                <Image
                  cursor="pointer"
                  alt=""
                  src="./static/market/iconShare.svg"
                />
                <Image
                  cursor="pointer"
                  alt=""
                  src="./static/market/iconShowMore.svg"
                />
              </Flex> */}
            </Flex>

            {owner && (
              <Flex
                p={{ base: '7px 0px 36px 0px', sm: '15px 0px 36px 0px' }}
                alignItems={{ base: 'left', lg: 'center' }}>
                <Text
                  fontWeight="400"
                  fontSize={{ base: '14px' }}
                  color={textColor}
                  pr="8px">
                  Owned by:
                </Text>
                <Link
                  fontWeight="400"
                  textColor="white"
                  fontSize={{ base: '14px' }}
                  color="#000"
                  href={getPublicEtherscanUrl(owner)}
                  isExternal>
                  {!isLargerThan1018 ? ellipseAddress(owner) : owner}
                </Link>
              </Flex>
            )}
          </Box>
          <Flex
            flexDirection={{ base: 'column', xl: 'row' }}
            gridGap={{ base: 'unset', xl: '44px' }}>
            <Box w={{ base: '100%', xl: '60%' }}>
              <Description description={metadata.description} />
              <Properties attributes={metadata.properties} />
            </Box>
            <Box w={{ base: '100%', xl: '45%' }}>
              <Details details={metadata.details} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}
