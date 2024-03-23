import { Button, useColorModeValue, VStack, Heading, Flex, Text, Box, Image, Input  } from '@chakra-ui/react'

import BaseModal from '@components/Modal'
import { ellipseAddress } from '@utils'
import { toastError } from '@utils/toast'
import { ethers } from 'ethers'
import { web3Modal } from 'packages/web3'
import { useEffect, useMemo, useRef, useState } from 'react'
import FroopyABI from 'packages/abis/demo/fl323.json'
import useStore from 'packages/store'

const FL_CONTRACT_ADR = process.env.NEXT_PUBLIC_FL_CONTRACT_ADR

type SubmitOfferModalProps = {
  isOpen: boolean
  onClose: () => void
}

type NFTItem = {
  address: string;
  bidAmount: number;
  isMine: boolean;
};

// 数组数据
const nftItems: NFTItem[] = [
  {
    address: "0x34d85c9C79B777399AaAAe42f7c769c7b59793D0", // CryptoPunks #7842
    bidAmount: 100,
    isMine: false,
  },
  {
    address: "0x7f88082855B543a96735b6f773D94bF39a383614", // Bored Ape Yacht Club #420
    bidAmount: 200,
    isMine: false,
  },
  {
    address: "0x60E4d787612f4b442e2144f775c94717c7832a1b", // Azuki #4469
    bidAmount: 300,
    isMine: false,
  },
  {
    address: "0x8a90CAb2b38bA80c048a774907777712D232c411", // Doodles #4957
    bidAmount: 400,
    isMine: false,
  },
  {
    address: "0x495f9f574c77f9604b8335739c7f8a4d83b79b77", // Art Blocks Curated #152
    bidAmount: 500,
    isMine: false,
  },
]

const BidModal = ({ isOpen, onClose }: SubmitOfferModalProps) => {
  const [value, setValue] = useState(undefined)
  const [list, setList] = useState<NFTItem[]>(nftItems)
  const scrollRef = useRef(null)
  const available = 10000

  const { address } = useStore()
  
  const isLowPrice = useMemo(() => list.some(k => Number(value) <= Number(k.bidAmount)), [list, value])
  
  const bidList = useMemo(() => list.slice().sort((a, b) => b.bidAmount - a.bidAmount), [list])

  const handleBid = () => {
    if (!value) return toastError('Please bid the price.')
  

    if (isLowPrice) return toastError('Bid must be higher than the current highest bid.')
    
    if (value > available) return toastError('Bid must be lower than the current available $FL Token')

    const existingItemIndex = bidList.findIndex(item => item.isMine)

    if (existingItemIndex !== -1) {
      const updatedBidList = [...bidList]
      updatedBidList[existingItemIndex].bidAmount = value
      setList(updatedBidList)
    } else {
      setList(prevList => [...prevList, {
        bidAmount: value,
        address,
        isMine: true,
      }])
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }

    setValue(null)
  }


  const getAvailableFL = async () => {
    const provider = await web3Modal.connect()    
    const library = new ethers.providers.Web3Provider(provider)
    const signer = library.getSigner()

    const contract = new ethers.Contract(FL_CONTRACT_ADR, FroopyABI, signer)

    const address = await signer.getAddress()

    if (!address) return toastError('Please connect wallet first.')
    
    const [tx] = await contract.bidderInfos(address)
  }


  useEffect(() => {
    getAvailableFL()
  }, [])

  return (
    <BaseModal
      variant="bidModal"
      size="2xl"
      isOpen={isOpen}
      title={<Heading fontSize="22px" lineHeight="32px" textAlign="left">Bid on this Plot of FroopyLand</Heading>}
      buttons={
        <Flex align="baseline">
            <Box mr="14px">
              <Flex w="264px" p="16px" borderRadius="10px" alignItems="center" bg="#F4F4F4">
                <Text>Bid:</Text>
                <Input
                  _focusVisible={{
                    borderWidth: '0px',
                  }}
                  type="number"
                  fontWeight={700}
                  fontSize="20px"
                  border="none"
                  defaultValue={value}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
                <Text color="#333" fontSize="14px" lineHeight="24px">$FLT</Text>
              </Flex>
              <Text mt="8px" fontSize="12px" lineHeight="18px" color="#4F4F4F">Available：10,000 $FL Token</Text>
            </Box>
          <Button
            w="298px"
            borderRadius="10px"
            fontSize="20px"
            fontWeight="700"
            h="66px"
            color="#fff"
            bg="#704BEA"
            _hover={{ bg: "#704BEA" }}
            onClick={handleBid}
          >
            Bid
          </Button>
        </Flex>
      }
      onClose={onClose}
      bgColor={useColorModeValue ? '#fff' : '#fff'}>
      <VStack align="left">
        <Text fontSize="14px" lineHeight="20px" color="rgba(0, 0, 0, 0.7)" mb="40px">The highest bidder will have the opportunity to auction their NFT in the next round.</Text>
        <Box>
          <Flex p="10px 20px">
            <Text w="178px" align="left" mr="60px" fontSize="13px" color="rgba(0, 0, 0, 0.6)">BIDDER</Text>
            <Text fontSize="13px" color="rgba(0, 0, 0, 0.6)">BID</Text>
          </Flex>
         <Box overflowY="auto" height="360px" ref={scrollRef}>
         {
          bidList.map((item,v) => (
            <Flex key={item.address} p="10px 20px" border="1px solid #F2F2F2" borderRadius="10px" align="center" mb="10px">
              <Flex align="center" mr="60px">
                <Image mr="10px" borderRadius="37px" border="1px solid #F2F2F2" src="/static/account/sidebar/avatar.svg" alt='avatar' w="37px" h="37px"></Image>
                <Box fontSize="16px" w="160px">
                  {ellipseAddress(item.address, 6)}
                </Box>
              </Flex>
              <Text align="left" w="200px" fontSize="16px" color="rgb(0, 0, 0)" mr="164px">{item.bidAmount} $FL Token</Text>
              {
                item.isMine && (<Text fontSize="14px" color="#7E4AF1">ME</Text>)
              }
            </Flex>
          ))
         }
         </Box>
        </Box>
      </VStack>
    </BaseModal>
  )
}

export default BidModal
