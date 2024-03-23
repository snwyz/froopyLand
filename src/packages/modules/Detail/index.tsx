import styles from './index.module.scss'
import {
  Box,
  Image,
  List,
  Link,
  Heading,
  Flex,
  Text,
  Progress,
  Button,
  Grid,
  Input
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import useCountDown from '@hooks/useCountDown'
import { web3Modal } from 'packages/web3'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import useFomoStore from 'packages/store/fomo'
import moment from 'moment'
import { memo, useEffect, useMemo, useState } from 'react'
import FroopyABI from 'packages/abis/demo/fl323.json'
import { toastSuccess } from '@utils/toast'
import useStore from 'packages/store'
import { ellipseAddress, weiToEtherString } from '@utils'
import { faker } from '@faker-js/faker'
import PurchaseNFTModal from './PurchaseNFTModal'


export enum State {
  Upcoming = 0,
  Ongoing = 1,
  Finished = 2,
}

const COUNT = faker.number.int({ min: 101, max: 1000 })

const FL_CONTRACT_ADR = process.env.NEXT_PUBLIC_FL_CONTRACT_ADR


const Details = () => {
  const router = useRouter()
  const { gameList, setGameList } = useFomoStore()
  
  const { pool: id, state } = router.query
  const { address } = useStore()
  const [claims, setClaims] = useState(0)
  const [keys, setKeys] = useState(0)
  const [claimLoading, setClaimLoading] = useState(false)
  const [buyLoading, setBuyLoading] = useState(false)


  useEffect(() => {
    fetchGameState()
  }, [id, gameList, router.query])

  const detail = useMemo(() => {
    if (Number(id) > 5) {
      return gameList.find(item => item?.isClone && item.state == state)
    }
    
    return gameList.find(item => item.id == id)
  }, [id, gameList])

  const fetchGameState = async () => {

    if (detail?.isClone) {
      setKeys(COUNT)
      return
    }

    const provider = await web3Modal.connect()
    const library = new ethers.providers.Web3Provider(provider)
    const signer = library.getSigner()
    const contract = new ethers.Contract(FL_CONTRACT_ADR, FroopyABI, signer)
    const address = await signer.getAddress()
    
    try {
      const [[unclaimBonus], [keyAmount]]  = await contract.getPlayerStateOfGameIds(address, [id])
      setClaims(unclaimBonus.toNumber())
      setKeys(keyAmount.toNumber())
    } catch (error) {
      console.log(error, '<=-===fetchGameState')
    }
  }

  const memoPercent = useMemo(() => {
    if (!detail?.totalKeyMinted || keys === 0) return 0
  
    const percentage = (keys / (detail.isClone ? COUNT : detail.totalKeyMinted.toNumber())) * 100
    const formattedPercent = Number(percentage.toFixed(2)).toString().replace(/(\.\d*?[1-9])0+$|\.0*$/, '$1')
  
    return formattedPercent
  }, [detail, keys])

  const localTimeFormatted = useMemo(() => {
    if (!detail) return null
    const date =  detail.state === State.Upcoming ? detail['startTimestamp'] : detail['endTime']
    return moment(date*1000).format('YYYY-MM-DD HH:mm:ss')
  }, [detail])

  const time = useCountDown(localTimeFormatted)

  const buyKey = async () => {
    // if (detail.isClone) return
    const provider = await web3Modal.connect()
    const library = new ethers.providers.Web3Provider(provider)
    const signer = library.getSigner()
    const contract = new ethers.Contract(FL_CONTRACT_ADR, FroopyABI, signer)
    try {
      setBuyLoading(true)
      const tx = await contract.purchaseKeyOfGameId('0', {
        value: ethers.utils.parseUnits(`${16}`, "wei"),
        gasLimit: BigInt(500000)
      })
      await tx.wait()
      // await setGameList(library)
      toastSuccess('Buy success')
    } catch (error) {
      console.log(error, 'buyKey')
    } finally {
      setBuyLoading(false)
    }
  }

  const claim = async () => {
    if (detail.isClone) return
    const provider = await web3Modal.connect()
    const library = new ethers.providers.Web3Provider(provider)
    const signer = library.getSigner()
    const contract = new ethers.Contract(FL_CONTRACT_ADR, FroopyABI, signer)
    const address = await signer.getAddress()
    setClaimLoading(true)
    try {
      const tx = await contract.claimBonus([id], address)
      await tx.wait()
      await setGameList(library)
      toastSuccess('Claim success')
    } catch (error) {
      console.log(error, 'claim')
    } finally {
      setClaimLoading(false)
    }
  }

  const { days, hours, minutes, seconds } = time

  const CountDown = () => (
    <div className={styles.time}>
      <div className={styles.unit}>0</div>
      <div className={styles.symbol}>Days</div>
      <div className={styles.unit}>{hours || '0'}</div>
      <div className={styles.symbol}>Hrs</div>
      <div className={styles.unit}>{minutes || '0'}</div>
      <div className={styles.symbol}>Mins</div>
      <div className={styles.unit}>{seconds || '0'}</div>
      <div className={styles.symbol}>Secs</div>
    </div>
  )


  if (!detail) return null

  
  return (
    <>
      <Flex
        w="120px"
        m="0 0 16px"
        h="52px"
        cursor="pointer"
        alignItems="center"
        padding="0 42px"
        onClick={() => router.back()}>
        <ArrowBackIcon mr="10px" />
        <Text fontSize="20px">Back</Text>
      </Flex>
      {
        detail.state === State.Finished && (
          <Box
            m="0 auto;"
            borderRadius="20px 20px 0px 0px"
            background="linear-gradient(180deg, #764AF2 0%, #9A4DEE 201.25%)"
            fontSize="28px"
            w={{ lg: '1280px', md: '1120px' }}
            h="80px"
            textAlign="center"
            lineHeight="80px">
            You won the final prize！
          </Box>
        )
      }
        <Box
        borderRadius={
          detail.state === State.Finished ? '0 0 20px 20px' : '20px'
        }
        p="48px"
        w={{ lg: '1280px', md: '1120px' }}
        className={styles.box}>
        {/* <Flex align="center" justify="center" border="1px solid rgba(112, 75, 234, 1)" w="100%" borderRadius="20px" p="24px 32px" mb="20px">
          <Image mr="12px" src='/static/common/finished.svg' alt='f' w="24px" h="24px"></Image>
          <Text fontSize="24px" color="#9A7CFF">NFT sold</Text>
        </Flex> */}
        {/* <Flex border="1px solid rgba(112, 75, 234, 1)" w="100%" borderRadius="20px" p="24px 32px" mb="20px">
            <Flex fontSize="14px" color="#fff" flex={1} mr="40px" align="center">
              You have priority to purchase the NFT within  <Text display="inline-block" color="#00DAB3">12 Hrs  29 Mins  34 Secs</Text>  cause you are the Top Key Holder of this auction.
            </Flex>
            <Flex fontSize="14px" color="#fff" flex={1} mr="40px" align="center">
              <Text fontSize="16px" color="#FFA8FE" mr="20px">NFT Price:</Text>
              <Text fontSize="16px">2500 $FL Token</Text>
            </Flex>

            <Button
                fontSize="20px"
                colorScheme="primary"
                w="272px"
                h="52px"
                ml="24px"
                fontWeight="700"
                color="#000">
                Purchase NFT
              </Button>
        </Flex> */}
        <Flex>
          <Box className={styles.nft}>
            <Image
              w="500px"
              h="500px"
              objectFit="cover"
              borderRadius="15px"
              alt=""
              src={detail?.nftImage}
              fallbackSrc="/static/license-template/template.png"
            />
            <Text className={styles.desc}>{detail.nftName}</Text>
            <List spacing={3}>
              <Flex alignItems="center">
                <Text className={styles.name}>NFT Address：</Text>
                <Link fontWeight={600} color="#00DAB3">
                  {detail.nftAddress || address}
                </Link>
              </Flex>
              <Flex alignItems="center">
                <Text className={styles.name}>NFT ID：</Text>
                <Text fontWeight={600}>{detail?.nftId?.toNumber() || '122'}</Text>
              </Flex>
              <Flex alignItems="center">
                <Text className={styles.name}>Auction Duration：</Text>
                <Text fontWeight={600}>
                  {moment(detail.startTimestamp * 1000).format('hA')}{' '}
                  {moment(detail.startTimestamp * 1000).format(
                    'MMM DD',
                  )}{' '}
                  - {moment(detail.endTime * 1000).format('hA')}{' '}
                  {moment(detail.endTime * 1000).format('MMM DD')}
                </Text>
              </Flex>
            </List>
            <Text
              fontWeight={600}
              m="40px 0 20px"
              fontSize="20px"
              lineHeight="20px">
              Auction Rules
            </Text>
            <List spacing={3}>
              <Flex>
                <Text color="#FFA8FE" fontSize="16px" lineHeight="20px" w="172px">
                  Final Winner prize：
                </Text>
                <Text w="290px" fontSize="16px" lineHeight="24px">
                  The last key holder gets 20% of the total mint fee. The prize
                  can be claimed after the game gets over.
                </Text>
              </Flex>
              <Flex>
                <Text color="#FFA8FE" fontSize="16px" lineHeight="20px" w="172px">
                  Key Holder Dividends：
                </Text>
                <Text w="290px" fontSize="16px" lineHeight="24px">
                  Key holders share 20% of following mint fee depends on held key
                  share. The dividends can be claimed during and after the game.
                </Text>
              </Flex>
              <Flex>
                <Text color="#FFA8FE" fontSize="16px" lineHeight="20px" w="172px">
                  NFT Provider Dividends：
                </Text>
                <Text w="290px" fontSize="16px" lineHeight="24px">
                  The NFT provider shares 50% of the total mint fee. The dividends
                  can be claimed after the game.{' '}
                </Text>
              </Flex>
            </List>
          </Box>
          <Box className={styles.info}>
            <Heading fontSize="24px" lineHeight="36px" fontWeight={700} mb="16px">
              {detail.state === State.Ongoing
                ? 'Auction Count Down'
                : detail.state === State.Upcoming
                ? 'Opening Count Down'
                : 'Auction Status'}
            </Heading>
            <Box
              borderRadius="20px"
              p="16px 0 16px 32px"
              bgColor="rgba(118, 74, 242, 0.5)"
              border="1px solid rgba(112, 75, 234, 1)">
              {[State.Ongoing, State.Upcoming].includes(detail.state) && (
                <CountDown />
              )}
              {State.Finished === detail.state && (
                <Text fontSize="24px" lineHeight="36px">
                  Auction ends {moment(detail.endTime * 1000).format('MMMM DD')}{' '}
                  at {moment(detail.endTime * 1000).format('h:mm A')}
                </Text>
              )}
            </Box>

            <Heading
              mt="36px"
              fontSize="24px"
              lineHeight="36px"
              fontWeight={700}
              mb="16px">
              Bonus Pool
            </Heading>
            <Grid
              gap="32px"
              borderRadius="20px"
              p="32px"
              gridTemplateColumns="1fr 1fr"
              bgColor="rgba(118, 74, 242, 0.5)"
              border="1px solid rgba(112, 75, 234, 1)">
              <Flex flexDir="column">
                <Box
                  w={{ lg: '100%' }}
                  fontSize="16px"
                  lineHeight="24px"
                  color="#FFA8FE">
                  Total Keys Minted
                </Box>
                <Flex alignItems="baseline">
                  <Text
                    mr="8px"
                    fontWeight={900}
                    color="#00DAB3"
                    fontSize="40px"
                    lineHeight="60px">
                    {detail.state === 0 ? '--' : detail.isClone ? COUNT : detail.totalKeyMinted.toString() || '--'}
                  </Text>
                  <Text fontWeight={700} fontSize="16px" lineHeight="24px">
                    KEYS
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDir="column">
                <Box
                  w={{ lg: '100%' }}
                  fontSize="16px"
                  lineHeight="24px"
                  color="#FFA8FE">
                  Total Mint Fee
                </Box>
                <Flex>
                  <Flex>
                    <Image
                      mr="4px"
                      src="./static/market/eth.svg"
                      alt="ethereum"
                      color="#fff"></Image>
                    <Text
                      mr="8px"
                      fontWeight={900}
                      color="#00DAB3"
                      fontSize="40px"
                      lineHeight="60px">
                      {detail.state === 0 ? '--' : detail.isClone ? (COUNT * 0.001).toFixed(3) : weiToEtherString(detail.salesRevenue.toString()) || '--'}
                    </Text>
                  </Flex>
                  <Text
                    fontWeight={700}
                    alignSelf="flex-end"
                    fontSize="16px"
                    lineHeight="40px">
                    ETH
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDir="column">
                <Box
                  w={{ lg: '100%' }}
                  fontSize="16px"
                  lineHeight="24px"
                  color="#FFA8FE">
                  Final Winner Prize
                </Box>
                <Flex>
                  <Flex>
                    <Image
                      mr="4px"
                      src="./static/market/eth.svg"
                      alt="ethereum"
                      color="#fff"></Image>
                    {/* detail.salesRevenue.toNumber()* 0.2  最后一个买入Key的人分红 20% */}
                    <Text
                      mr="8px"
                      fontWeight={900}
                      color="#00DAB3"
                      fontSize="40px"
                      lineHeight="60px">
                      {detail.state === 0 ? '--' : detail.isClone ? (COUNT * 0.001 * 0.2).toFixed(5) : weiToEtherString(
                        `${detail.salesRevenue.mul(2).div(10)}`,
                      ) || '--'}
                    </Text>
                  </Flex>
                  <Text
                    fontWeight={700}
                    alignSelf="flex-end"
                    fontSize="16px"
                    lineHeight="40px">
                    ETH
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDir="column">
                <Box
                  w={{ lg: '100%' }}
                  fontSize="16px"
                  lineHeight="24px"
                  color="#FFA8FE">
                  Final Key Holder
                </Box>
                <Flex mt="20px">
                  <Text color="#00DAB3" fontSize="16px" lineHeight="20px">
                    {detail.state === 0 ? '--': ellipseAddress(detail.lastPlayer)}
                  </Text>
                </Flex>
              </Flex>
            </Grid>

            <Heading
              mt="36px"
              fontSize="24px"
              lineHeight="36px"
              fontWeight={700}
              mb="16px">
              My Keys, Dividends & Prize
            </Heading>
            <Box
              padding="32px"
              borderRadius="20px"
              border="1px solid rgba(112, 75, 234, 1)">
              <Text fontSize="20px" lineHeight="30px" fontWeight={700} mb="16px">
                My Owned Keys
              </Text>
              <Progress
                colorScheme="primary"
                borderRadius="5px"
                bgColor="rgba(42, 6, 104, 0.7)"
                size="sm"
                value={Number(memoPercent)}
              />
              <Flex mt="20px" alignItems="center">
                <Flex mr="32px" alignItems="baseline">
                  <Text
                    fontSize="24px"
                    lineHeight="36px"
                    color="#00DAB3"
                    fontWeight={700}>
                    {detail.state === 0 ? '--' : (keys || '--')}
                  </Text>
                  <Text ml="8px" color="#fff" fontSize="16px" lineHeight="24px">
                    Keys
                  </Text>
                </Flex>
                <Flex
                  mr="32px"
                  alignItems="baseline"
                  fontSize="24px"
                  lineHeight="36px"
                  color="#00DAB3"
                  fontWeight={700}>
                  <Text
                    fontSize="24px"
                    lineHeight="36px"
                    color="#00DAB3"
                    fontWeight={700}>
                    {detail.state === 0 ? '--': memoPercent || '--'}%
                  </Text>
                  <Text ml="8px" color="#fff" fontSize="16px" lineHeight="24px">
                    {' '}
                    of Total Keys Minted
                  </Text>
                </Flex>
              </Flex>

              {detail.state !== State.Finished && (
                <>
                  <Text
                    mt="36px"
                    mb="12px"
                    fontSize="20px"
                    lineHeight="30px"
                    fontWeight={700}>
                    Mint Key
                  </Text>
                  <Flex>
                    <Input
                      w="272px"
                      h="52px"
                      borderColor="#704BEA"
                      placeholder='Maximum: 10 keys'
                    />
                    <Button
                      fontSize="20px"
                      colorScheme="primary"
                      w="272px"
                      h="52px"
                      ml="24px"
                      onClick={buyKey}
                      fontWeight="700"
                      color="#000"
                      disabled={[State.Finished, State.Upcoming].includes(
                        detail.state,
                      )}
                      isLoading={buyLoading}>
                      Mint Key
                    </Button>
                  </Flex>
                  <Text fontSize="14px" lineHeight="20px" mt="12px">
                    Mint Fee：Mint Fee： 0.001 ETH/KEY
                    {/* <span style={{ fontWeight: '700', margin: '0 2px 0 0' }}>
                      {detail.state === 0 ? '--': weiToEtherString(detail.keyPrice?.toString())}
                    </span> */}
                  </Text>
                </>
              )}

              <Flex mt="36px" mb="12px" justifyContent="space-between">
                <Text fontSize="20px" lineHeight="30px" fontWeight={700}>
                  My Key Holder Dividends
                </Text>
                <Text fontSize="16px" lineHeight="24px">
                  Total：
                  <span style={{ fontWeight: '700', margin: '0 2px 0 0' }}>
                    {detail.state === 0 ? '--': detail.isClone ? (COUNT * 0.001*0.2).toFixed(3): weiToEtherString(detail.salesRevenue.toString()) || '--'}
                  </span>
                  ETH
                </Text>
              </Flex>
              <Flex>
                <Input
                  w="272px"
                  h="52px"
                  bgColor="rgba(112, 75, 234, 0.5)"
                  border="none"
                  readOnly
                  value={`Unclaimed: ${
                    detail.state === 0 ? '--': weiToEtherString(claims.toString()) || '--'
                  } ETH`}
                />
                <Button
                  fontSize="20px"
                  colorScheme="primary"
                  w="272px"
                  h="52px"
                  ml="24px"
                  onClick={claim}
                  fontWeight="700"
                  color="#000"
                  disabled={detail.state === State.Upcoming}
                  isLoading={claimLoading}>
                  Claim
                </Button>
              </Flex>

              <Flex mt="36px" mb="12px" justifyContent="space-between">
                <Text fontSize="20px" lineHeight="30px" fontWeight={700}>
                  My NFT Provider Dividends
                </Text>
                <Text fontSize="16px" lineHeight="24px">
                  Total：
                  <span style={{ fontWeight: '700', margin: '0 2px 0 0' }}>
                  {detail.state === 0 ? '--': 10}
                  </span>
                  ETH
                </Text>
              </Flex>
              <Flex>
                <Input
                  w="272px"
                  h="52px"
                  bgColor="rgba(112, 75, 234, 0.5)"
                  border="none"
                  readOnly
                  value={`Unclaimed: ${detail.state === 0 ? '--': '1.23'}ETH`}
                />
                <Button
                  fontSize="20px"
                  colorScheme="primary"
                  w="272px"
                  h="52px"
                  ml="24px"
                  disabled={[State.Upcoming, State.Ongoing].includes(
                    detail.state,
                  )}
                  fontWeight="700"
                  color="#000">
                  Claim
                </Button>
              </Flex>

              {detail.state === State.Finished && (
                <>
                  <Flex mt="36px" mb="12px" justifyContent="space-between">
                    <Text fontSize="20px" lineHeight="30px" fontWeight={700}>
                      My Final Winner Prize
                    </Text>
                    <Text fontSize="16px" lineHeight="24px">
                      Total：
                      <span style={{ fontWeight: '700', margin: '0 2px 0 0' }}>
                        {detail.state === 0 ? '--': (COUNT * 0.001 * 0.2).toFixed(3) }
                      </span>
                      ETH
                    </Text>
                  </Flex>
                  <Flex>
                    <Input
                      w="272px"
                      h="52px"
                      bgColor="rgba(112, 75, 234, 0.5)"
                      border="none"
                      readOnly
                      value="Unclaimed: 1.23 ETH"
                    />
                    <Button
                      fontSize="20px"
                      colorScheme="primary"
                      w="272px"
                      h="52px"
                      ml="24px"
                      fontWeight="700"
                      color="#000">
                      Claim
                    </Button>
                  </Flex>
                </>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
      <PurchaseNFTModal isOpen={false} onClose={null} />
    </>
  )
}

export default memo(Details)
