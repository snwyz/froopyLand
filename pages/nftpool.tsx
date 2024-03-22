import { Flex, Text, Box, SimpleGrid } from '@chakra-ui/react'
import ItemGrid from '@components/ListItems/ItemGrid'
import useFomoStore from 'packages/store/fomo'
import { web3Modal } from 'packages/web3'
import { ethers } from 'ethers'
import { useEffect } from 'react'


const NFTpool = () => {


  const { gameList, setGameList } = useFomoStore()

  const fetchList = async () => {
    const provider = await web3Modal.connect()
    const library = new ethers.providers.Web3Provider(provider)
    setGameList(library)
  }

  useEffect(() => {
    fetchList()
  }, [])

    return (
        <Box p="0 40px">
            <Flex mt="40px" mb="20px" fontSize="20px" align="center" color="#00DAB3">
                <Text fontSize="24px" lineHeight="36px" textShadow='0px 0px 10px rgba(0, 218, 179, 1)'>NFT Pool </Text>
                <Text ml="8px" fontSize="18px" lineHeight="27px"> - {gameList.length} NFTs available</Text>
            </Flex>
            <Box mb="24px" w="100%" height="1px" bg="rgba(112, 75, 234, 0.5)"></Box>
            <SimpleGrid
            mt='20px'
            columns={[1, 2, 3, 4, 5]}
            spacing="20px">
            {gameList.map((item, idx) => {
                return <ItemGrid gridName='ongoing' item={item} key={idx} />
            })}
            </SimpleGrid>
        </Box>
    )
}


export default NFTpool