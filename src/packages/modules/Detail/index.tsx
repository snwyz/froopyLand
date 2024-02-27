import { iData } from '@modules/Market/Main'
import styles from './index.module.scss'
import {
  Box,
  Image,
  List,
  ListItem,
  Link,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Flex,
  Text,
  Progress,
  Input,
  Button,
  useNumberInput
} from '@chakra-ui/react'
import useCountDown from '@hooks/useCountDown'

const Details = () => {
  const time = useCountDown('2024-02-28')
  const { days, hours, minutes, seconds } = time

  const { getInputProps } =
    useNumberInput({
      defaultValue: 0
    })

  const input = getInputProps()


  return (
    <Box className={styles.box}>
      <Box className={styles.nft}>
        <Box>
          <Image
            w="720px"
            h="720px"
            objectFit="cover"
            borderRadius="8px"
            alt=""
            src={iData[0].image}
            fallbackSrc="/static/license-template/template.png"
          />
        </Box>
        <Text className={styles.desc}>Description</Text>
        <List spacing={3}>
          <ListItem>
            <span className={styles.name}>NFT Name：</span>
            {iData[0].name}
          </ListItem>
          <ListItem>
            <span className={styles.name}>NFT Address：</span>
            <Link color="#00DAB3">{iData[0].derivativeContractAddress}</Link>
          </ListItem>
          <ListItem>
            <span className={styles.name}>NFT ID：</span>
            {iData[0].id}
          </ListItem>
        </List>
      </Box>
      <Box className={styles.info}>
        <Card
          color="#fff"
          boxShadow="0 1px 3px 0 rgb(255, 255, 255),0 1px 2px 0 rgb(255, 255, 255)">
          <CardHeader>
            <Heading size="lg">Game Info</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="md">Sale ends at</Heading>
                <div className={styles.time}>
                  <div className={styles.unit}>{days}</div>
                  <div className={styles.symbol}>天</div>
                  <div className={styles.unit}>{hours}</div>
                  <div className={styles.symbol}>时</div>
                  <div className={styles.unit}>{minutes}</div>
                  <div className={styles.symbol}>分</div>
                  <div className={styles.unit}>{seconds}</div>
                  <div className={styles.symbol}>秒</div>
                </div>
              </Box>
            </Stack>
            <Box>
              <Heading size="md" marginBottom='10px'>Sale information</Heading>
              <StatGroup>
                <Stat>
                  <StatLabel>UnClaim Bonus</StatLabel>
                  <StatNumber>29,000</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Key Num</StatLabel>
                  <StatNumber>29,000</StatNumber>
                </Stat>
              </StatGroup>
            </Box>
          </CardBody>
        </Card>
        <Card
          marginTop='20px'
          color="#fff"
          boxShadow="0 1px 3px 0 rgb(255, 255, 255),0 1px 2px 0 rgb(255, 255, 255)">
          <CardHeader>
            <Heading size="lg">Fomo information</Heading>
          </CardHeader>
          <CardBody>
            <Box>
                <Flex
                    flexDirection={{ base: 'column', lg: 'row' }}
                    gap={{ base: '10px', lg: '30px', xl: '110px' }}
                    alignItems={{ xl: 'center' }}
                    justifyContent='space-between'
                    py={{ base: '5px', lg: 'none' }}>
                    <Text fontSize="20px" fontWeight="500" textColor="#fff">51.2% claimed</Text>
                    <Text fontSize="20px" fontWeight="500" textColor="#fff">65/127</Text>
                </Flex>
                <Progress colorScheme="green" borderRadius='5px' marginTop='8px' size='sm' value={20} />
            </Box>
            <Box marginTop='20px'>
                <Text fontSize='20px'>Current income：8000 ETH</Text>
            </Box>
            <Box marginTop='20px' color='#fff' padding='0'>
                <Text fontSize='20px' fontWeight='bold'>Public Stage</Text>
                <Flex marginTop='20px'>Current Price: <Text marginLeft='10px' fontWeight='600'>200</Text></Flex>
                <Stack marginTop='20px'>
                    <Flex alignItems='center'>
                        <Input {...input} w='200px' marginRight='20px' /><Text>ETH</Text>
                    </Flex>
                </Stack>
                <Button fontSize="20px" colorScheme='teal' w='400px' marginTop="20px">Claim</Button>
            </Box>
            
          </CardBody>
        </Card>
      </Box>
    </Box>
  )
}

export default Details
