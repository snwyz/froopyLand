import { useCallback, useMemo } from 'react'

import { useRouter } from 'next/router'

import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import StakeToPoolModal from '@modules/Modals/account/unlicensedNFT/StakeToPoolModal'
import ApproveLicenseContractModal from '@modules/Modals/ApproveLicenseContractModal'
import useStore from 'packages/store'
import { hexToDecimal, unstakeFunc } from 'packages/web3'

import { ellipseAddress } from '@utils'

type ItemDetail = {
  item: any
  isApproved?: boolean
  setIsApproved?: (item: boolean) => void
  myNftStakedInPool?: any[]
  ownedStakedNFTInPool?: any[]
  setMyNftStakedInPool: (item: any[]) => void
  myNftExistInPool?: any[]
  setMyNftExistInPool?: (item: any[]) => void
}

function ItemGrid({
  item,
  isApproved,
  setIsApproved,
  myNftStakedInPool,
  setMyNftStakedInPool,
  myNftExistInPool,
  setMyNftExistInPool,
}: ItemDetail) {
  const {
    isOpen: isOpenStakeToPoolModal,
    onOpen: onOpenStakeToPoolModal,
    onClose: onCloseStakeToPoolModal,
  } = useDisclosure()
  const {
    isOpen: isOpenApproveLicenseContractModal,
    onOpen: onOpenApproveLicenseContractModal,
    onClose: onCloseApproveLicenseContractModal,
  } = useDisclosure()
  const { address } = useStore()

  const router = useRouter()
  const { pool, collection, tab } = router.query
  const isMyNFT =
    tab === 'MyNFTs' || item?.staker?.toLowerCase() === address.toLowerCase()

  const stakeBtnText = useMemo(() => {
    if (isApproved) {
      if (tab === 'Staked') {
        return 'Unstake'
      }
      return 'Stake'
    }
    return 'Approve'
  }, [isApproved, tab])

  const ownerAddress = useMemo(() => {
    if (tab === 'Staked') {
      if (item?.staker === address) {
        return 'You'
      }
      return ellipseAddress(item?.staker)
    }
    return 'You'
  }, [address, item?.staker, tab])

  const approveAndStakeToPool = useCallback(async () => {
    try {
      if (isApproved) {
        if (tab === 'Staked') {
          const unstake = await unstakeFunc(String(pool), item?.tokenId)
          const tokenIdAfterUnstaked = hexToDecimal(
            unstake?.events?.slice(-1)[0]?.args?.tokenId?._hex,
          )
          //
          const listNftAfterUnStaked = myNftStakedInPool.filter(
            (item) => Number(item?.tokenId) !== tokenIdAfterUnstaked,
          )
          const listNftExistAfterUnStaked = myNftStakedInPool.filter(
            (item) => Number(item?.tokenId) === tokenIdAfterUnstaked,
          )

          setMyNftStakedInPool(listNftAfterUnStaked)
          setMyNftExistInPool([
            ...myNftExistInPool,
            {
              contractAddress: collection,
              derivativeContract: '',
              image: listNftExistAfterUnStaked[0].image,
              poolAddress: pool,
              title: listNftExistAfterUnStaked[0].name,
              tokenId: String(
                hexToDecimal(
                  unstake?.events?.slice(-1)[0]?.args?.tokenId?._hex,
                ),
              ),
            },
          ])
          return
        }
        return onOpenStakeToPoolModal()
      }
      return onOpenApproveLicenseContractModal()
    } catch (error) {
      console.log(error)
    }
  }, [
    collection,
    isApproved,
    item?.tokenId,
    myNftExistInPool,
    myNftStakedInPool,
    onOpenApproveLicenseContractModal,
    onOpenStakeToPoolModal,
    pool,
    setMyNftExistInPool,
    setMyNftStakedInPool,
    tab,
  ])

  return (
    <Box
      cursor="pointer"
      border="1px solid #704BEA"
      borderRadius="20px"
      p="10px">
      <AspectRatio ratio={1 / 1}>
        {isMyNFT ? (
          <Box borderRadius="15px" className="container">
            <Box className="image">
              <Image
                alt=""
                src={item?.image}
                w="100%"
                objectFit="cover"
                fallbackSrc="/static/license-template/template.png"
              />
            </Box>
            <Box className="overlay">
              <Button
                bg="#00DAB3"
                className="buttonInside"
                _hover={{
                  bg: '#00DAB3',
                }}
                onClick={approveAndStakeToPool}>
                {stakeBtnText}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box borderRadius="15px" className="container">
            <Box className="image">
              <Image
                alt=""
                src={item?.image}
                w="100%"
                objectFit="cover"
                fallbackSrc="/static/license-template/template.png"
              />
            </Box>
          </Box>
        )}
      </AspectRatio>
      <Box ml="4px" mt="12px">
        <Box fontWeight="700" fontSize="12px">
          {item?.name || item?.title} #{item.tokenId}
        </Box>
        <Flex>
          <HStack>
            <Text fontSize="12px" fontWeight="400">
              Owner: {ownerAddress}
            </Text>
          </HStack>
        </Flex>
      </Box>
      <StakeToPoolModal
        myNftStakedInPool={myNftStakedInPool}
        setMyNftStakedInPool={setMyNftStakedInPool}
        myNftExistInPool={myNftExistInPool}
        setMyNftExistInPool={setMyNftExistInPool}
        isOpen={isOpenStakeToPoolModal}
        onClose={onCloseStakeToPoolModal}
        item={item}
      />
      <ApproveLicenseContractModal
        isApproved={isApproved}
        setIsApproved={setIsApproved}
        isOpen={isOpenApproveLicenseContractModal}
        onClose={onCloseApproveLicenseContractModal}
        item={item}
      />
    </Box>
  )
}

export default ItemGrid
