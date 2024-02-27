import { useState } from 'react'

import { useRouter } from 'next/router'

import { TriangleUpIcon } from '@chakra-ui/icons'
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import ApproveLicenseContractModal from '@modules/Modals/ApproveLicenseContractModal'

import { ellipseAddress } from '@utils'

import { DetailItemTabs, PathnameType } from '@ts'

import { myNFTUnlicensedData } from './FakeData'

function ItemGrid({ item }: { item: any }) {
  const router = useRouter()
  const { pathname } = router
  const [isDetail, setIsGetDetail] = useState()

  const {
    isOpen: isOpenApproveLicenseContractModal,
    onOpen: onOpenApproveLicenseContractModal,
    onClose: onCloseApproveLicenseContractModal,
  } = useDisclosure()

  const handleOpenDetailPool = (item: any) => {
    setIsGetDetail(item)
    onOpenApproveLicenseContractModal()
  }

  console.log(item, '<==')
  
  if (pathname === PathnameType.MARKET) {
    return (
      <Box
        cursor="pointer"
        onClickCapture={() =>
          router.push(
            `/${item.derivativeContractAddress}?collection=${item.originalContractAddress}&tab=${DetailItemTabs.STAKED}`,
          )
        }
        border="1px solid #704BEA"
        borderRadius="20px"
        p="10px"
        position="relative"
        onClick={() => router}>
        <AspectRatio ratio={1 / 1}>
          <Box className="image-effect">
            <Image
                borderRadius="15px"
                alt=""
                src={item.image}
                fallbackSrc="/static/license-template/template.png"
              />
          </Box>
        </AspectRatio>
        {/* <Flex
          p="6px 12px"
          gap="4px"
          borderRadius="20px"
          position="absolute"
          top="16px"
          left="16px"
          bgColor="facebook.100">
          <Text fontSize="12px" color="#2A0668">
            {item.currentNFTInPool}
          </Text>
          <Text fontSize="12px" color="#606062">
            items
          </Text>
        </Flex> */}
        {/* <Flex
          position="absolute"
          top="16px"
          right="16px"
          p="6px 12px"
          gap="4px"
          borderRadius="20px"
          bgColor="facebook.100">
          <Text fontSize="12px" color="#606062">
            Supply
          </Text>
          <Text fontSize="12px" color="#2A0668">
            {item.LicenseSupply}
          </Text>
        </Flex> */}
        <Box m="16px 8px 0px 8px">
          <Flex justifyContent="space-between" align="center">
            <Box fontWeight="700" fontSize="14px">
              {item?.name?.length > 25
                ? `${item?.name.substring(0, 25)}...`
                : item?.name}
            </Box>
            {/* <Image cursor="pointer" alt="" src="./static/market/iconStar.svg" /> */}
          </Flex>
          <Flex
            m="6px 0px"
            justifyContent="space-between"
            align="center"
            fontSize="12px"
            fontWeight="500"
            color="#FFA8FE">
            <Box>Key Sold</Box>
            <Box fontSize="14px" mr="6px" color="#00DAB3">2000</Box>
          </Flex>
        </Box>
      </Box>
    )
  }
  if (pathname === PathnameType.MY_NFT) {
    return (
      <>
        {myNFTUnlicensedData.map((item, idx) => (
          <Box
            key={idx}
            border="1px solid #704BEA"
            borderRadius="20px"
            overflow="hidden"
            p="10px 10px 16px"
            position="relative">
            <Box className="image-effect">
              <Image borderRadius="15px" alt="" src={item.avatar} />
            </Box>
            <Box m="16px 8px 40px 8px">
              <Flex justifyContent="space-between" align="center">
                <Box fontWeight="700" fontSize="14px">
                  {item.name}
                </Box>
                <Image
                  cursor="pointer"
                  alt=""
                  src="./static/market/iconStar.svg"
                />
              </Flex>
              <Flex
                m="6px 0px"
                align="center"
                fontSize="12px"
                fontWeight="500"
                color="rgba(255,255,255,0.8)">
                <Box mr="4px">Public pool:</Box>
                <Box>{item.pool === undefined ? 'none' : item.pool}</Box>
              </Flex>
              <Flex
                m="6px 0px"
                align="center"
                fontSize="12px"
                fontWeight="500"
                color="rgba(255,255,255,0.8)">
                <Box mr="4px">Address:</Box>
                <Box>{ellipseAddress(item.address)}</Box>
              </Flex>
              <Flex fontSize="12px" fontWeight="500" align="center">
                <Box mr="6px">Value:</Box>
                <Flex>
                  <Box mr="4px">{item.value}</Box>
                  <Box color="rgba(255,255,255,0.6)">ETH</Box>
                </Flex>
              </Flex>
            </Box>
            <Button
              onClick={() => handleOpenDetailPool(item)}
              bgColor="#704BEA"
              color="#FFF"
              bottom="0"
              left="0"
              position="absolute"
              borderRadius="0px"
              _hover={{ opacity: 0.7 }}
              w="100%">
              Add to pool
            </Button>
            <ApproveLicenseContractModal
              isOpen={isOpenApproveLicenseContractModal}
              onClose={onCloseApproveLicenseContractModal}
              item={isDetail}
            />
          </Box>
        ))}
      </>
    )
  }
  if (pathname === PathnameType.BUY) {
    return (
      <Box
        cursor="pointer"
        border="1px solid #704BEA"
        borderRadius="20px"
        p="10px"
        position="relative">
        <Box className="image-effect">
          <Image borderRadius="15px" alt="" src="/static/fake/detail.svg" />
        </Box>
        <Box m="16px 8px 12px 8px">
          <Flex justifyContent="space-between" align="center">
            <Box fontWeight="700" fontSize="14px">
              My Little Piggie #4594
            </Box>
            <Image cursor="pointer" alt="" src="./static/market/iconStar.svg" />
          </Flex>

          <Flex
            m="10px 0px 20px"
            fontSize="14px"
            fontWeight="500"
            align="center">
            <Box mr="6px">Duration:</Box>
            <Tag size="sm" fontSize="12px" colorScheme="yellow" variant="solid">
              30 days
            </Tag>
          </Flex>
        </Box>
        <Flex justifyContent="space-between" gap="12px">
          <Button
            _hover={{ opacity: 0.7 }}
            borderRadius="4px"
            h="30px"
            bgColor="#704BEA"
            color="#FFF">
            <Text fontSize="14px">Modify offer</Text>
          </Button>
          <Button
            h="30px"
            _hover={{ opacity: 0.7 }}
            borderRadius="4px"
            bgColor="red.500"
            color="#FFF">
            <Text fontSize="14px">Delete</Text>
          </Button>
        </Flex>
      </Box>
    )
  }

  if (pathname === PathnameType.SELL) {
    return (
      <Box
        overflow="hidden"
        cursor="pointer"
        border="1px solid #704BEA"
        borderRadius="20px"
        p="10px 10px 16px"
        position="relative">
        <Box>
          <Box className="image-effect">
            <Image borderRadius="15px" alt="" src="/static/fake/detail.svg" />
          </Box>
          <Box m="16px 8px 40px 8px">
            <Flex justifyContent="space-between" align="center">
              <Box fontWeight="700" fontSize="14px">
                My Little Piggie #4594
              </Box>

              <Image
                cursor="pointer"
                alt=""
                src="./static/market/iconStar.svg"
              />
            </Flex>

            <Flex m="6px 0px" fontSize="12px" fontWeight="500" align="center">
              <Box mr="6px">Current highest bid:</Box>
              <Flex align="center" color="#00DAB3">
                <Box mr="6px">50 ETH</Box>
                <TriangleUpIcon />
              </Flex>
            </Flex>
            <Flex fontSize="12px" fontWeight="500" align="center">
              <Box mr="6px">Lock status:</Box>
              <Tag size="sm" fontSize="12px" colorScheme="red" variant="solid">
                unlock
              </Tag>
            </Flex>
          </Box>

          <Box bottom="0" left="0" position="absolute" w="100%">
            <Button
              _hover={{ opacity: 0.7 }}
              borderRadius="0px"
              bgColor="#704BEA"
              color="#FFF"
              w="100%">
              Out of the pool
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
  return (
    <Box border="1px solid #704BEA" borderRadius="20px" p="10px">
      <AspectRatio ratio={1 / 1}>
        <Box borderRadius="15px">
          <Image
            alt=""
            src="/static/fake/detail.svg"
            w="100%"
            objectFit="cover"
            fallbackSrc="/static/license-template/template.png"
          />
        </Box>
      </AspectRatio>
      <Box ml="4px" mt="12px">
        <Box fontWeight="700" fontSize="14px">
          My Little Piggie 1777
        </Box>
        <Flex fontSize="12px" fontWeight="400">
          <Box>Owner :</Box>
          <Box>0xd2...d04kf0a</Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default ItemGrid
