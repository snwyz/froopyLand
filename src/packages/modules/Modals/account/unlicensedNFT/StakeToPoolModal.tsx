import { useCallback, useEffect, useState } from 'react'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import useStore from 'packages/store'
import {
  getNFTCollectionMetadata,
  hexToDecimal,
  stakeFunc,
} from 'packages/web3'

import BaseModal from '@components/Modal'

import { toastError } from '@utils/toast'

import JoinPoolSuccessModal from '../success/JoinPoolSuccessModal'

type StakeToPoolModalProps = {
  isOpen?: boolean
  onClose?: () => void
  item?: any
  myNftStakedInPool?: any[]
  setMyNftStakedInPool?: (item: any[]) => void
  myNftExistInPool?: any[]
  setMyNftExistInPool?: (item: any[]) => void
}

const StakeToPoolModal = ({
  isOpen,
  onClose,
  item,
  myNftStakedInPool,
  setMyNftStakedInPool,
  myNftExistInPool,
  setMyNftExistInPool,
}: StakeToPoolModalProps) => {
  const {
    isOpen: isOpenJoinPoolSuccessModal,
    onOpen: onOpenJoinPoolSuccessModal,
    onClose: onCloseJoinPoolSuccessModal,
  } = useDisclosure()
  const { address } = useStore()

  const [isLoading, setIsLoading] = useState<boolean>()
  const [nftInfo, setNftInfo] = useState<any>()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const handleCheckbox = () => {
    setIsDisabled((current: boolean) => !current)
  }

  const getNftInfo = useCallback(async () => {
    const inf = await getNFTCollectionMetadata(String(item?.contractAddress))
    setNftInfo(inf)
  }, [item?.contractAddress])

  const stakeToPool = useCallback(async () => {
    try {
      setIsChecked(true)
      setIsLoading(true)
      const stake = await stakeFunc(item?.poolAddress, item?.tokenId)

      const tokenIdNFtStaked = hexToDecimal(
        stake?.events?.slice(-1)[0]?.args?.tokenId?._hex,
      )
      const listNftAfterStaked = myNftExistInPool.filter(
        (item) => Number(item?.tokenId) !== tokenIdNFtStaked,
      )
      const nftStaked = myNftExistInPool.filter(
        (item) => Number(item?.tokenId) === tokenIdNFtStaked,
      )
      setMyNftExistInPool(listNftAfterStaked)
      setMyNftStakedInPool([
        ...myNftStakedInPool,
        {
          description: '',
          image: nftStaked[0].image,
          name: nftStaked[0].title,
          staker: address,
          tokenId: String(
            hexToDecimal(stake?.events?.slice(-1)[0]?.args?.tokenId?._hex),
          ),
        },
      ])
      onClose()
      onOpenJoinPoolSuccessModal()
    } catch (error) {
      setIsChecked(false)
      setIsLoading(false)
      toastError(error)
    }
  }, [
    address,
    item?.poolAddress,
    item?.tokenId,
    myNftExistInPool,
    myNftStakedInPool,
    onClose,
    onOpenJoinPoolSuccessModal,
    setMyNftExistInPool,
    setMyNftStakedInPool,
  ])

  useEffect(() => {
    if (item?.contractAddress) {
      getNftInfo()
    }
  }, [getNftInfo, item?.contractAddress])
  return (
    <>
      <BaseModal
        size={{ base: 'xs', sm: 'md', md: 'lg', lg: '5xl' }}
        isOpen={isOpen}
        buttons={
          <Button
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={stakeToPool}
            m="auto"
            my="20px"
            w="290px"
            borderRadius="10px"
            fontSize="20px"
            fontWeight="700"
            h="66px"
            color="#fff"
            bg="#704BEA"
            _hover={{ bg: '"#704BEA"' }}>
            Stake
          </Button>
        }
        onClose={onClose}
        bgColor={useColorModeValue ? '#fff' : '#fff'}>
        <Flex
          mb={{ base: '5px', lg: '15px' }}
          mx={{ base: '10px', lg: '90px' }}
          flexDir="column">
          <Flex flexDirection="column">
            <Text
              fontSize={{ base: '24px', lg: '32px' }}
              fontWeight={{ base: '900', lg: '900' }}
              justifyContent="center"
              display="flex"
              textColor="#704BEA">
              STAKE YOUR NFT
            </Text>
          </Flex>
          <Flex
            mt={{ base: '12px', lg: '32px' }}
            alignItems="center"
            gap="15px">
            <Text
              fontSize={{ base: '14px', lg: '18px' }}
              fontWeight="700"
              mb="10px"
              textColor="#000">
              Pool Name
            </Text>
            <Text fontSize="16px" fontWeight="400" mb="10px" textColor="#000">
              {nftInfo?.name}
            </Text>
          </Flex>

          <Text
            textColor="#606062"
            mt={{ base: '5px', lg: '35px' }}
            fontSize={{ base: '14px', lg: '16px' }}>
            TERMS OF SERVICE FOR CREATING A LICENSE GOES HERE. By staking your
            NFT, you will unlock the ability to sell licenses for your NFT. Your
            NFT will transfer to the pool smart contract upon approval. To view
            your staked NFTs, navigate to the &apos;licensed NFTs&apos; tab. You
            can unstake at any time.
          </Text>
          <Checkbox
            isDisabled={isChecked}
            defaultChecked={isChecked}
            onChange={handleCheckbox}
            borderRadius="5px"
            mt={{ base: '30px', lg: '61px' }}>
            <Text fontSize={{ base: '12px', lg: '16px' }} color="#000">
              {' '}
              Agree to the terms of the license agreement
            </Text>
          </Checkbox>
        </Flex>
      </BaseModal>

      <JoinPoolSuccessModal
        item={item}
        isOpen={isOpenJoinPoolSuccessModal}
        onClose={onCloseJoinPoolSuccessModal}
      />
    </>
  )
}

export default StakeToPoolModal
