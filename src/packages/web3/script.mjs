import { Alchemy, Network } from 'alchemy-sdk'
import { ethers } from 'ethers'
import moment from 'moment'

import { isProd } from '../constants'
import { weiToEtherString } from '../lib/utilities'

const network = isProd ? Network.ETH_MAINNET : Network.ETH_GOERLI

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY, // Replace with your Alchemy API Key.
  network,
}

const alchemy = new Alchemy(settings)

export async function retrieveHistoryData(smartContractAddress, wallet) {
  let topics = []
  topics.push(
    ethers.utils.id('MintItem(address,uint256,uint256,uint256,uint256)'),
  )
  if (wallet != null) {
    topics.push(ethers.utils.hexlify(wallet))
  }
  const result = await alchemy.core.getLogs({
    fromBlock: '0x0',
    addresses: smartContractAddress,
    topics: [
      ethers.utils.id('MintItem(address,uint256,uint256,uint256,uint256)'),
    ],
  })

  const tableData = []

  await Promise.allSettled(
    result
      .filter(function (element) {
        return smartContractAddress.includes(element.address)
      })
      .map(async (element, index) => {
        let { topics } = element
        let to = ethers.utils.defaultAbiCoder.decode(['address'], topics[1])
        let price = parseInt(topics[3]).toString()
        price = weiToEtherString(price)
        let { data } = element
        let exp = new Date(
          parseInt(data.substring(0, 66)) * 1000,
        ).toLocaleDateString('en-US')

        const timeStamp = await alchemy.core.getBlock(element.blockNumber)
        const date = moment.unix(timeStamp.timestamp).format('MM/DD/YYYY')
        const object = {
          Event: 'MintItem',
          Price: price,
          From: to,
          Date: date,
        }
        tableData.push(object)
      }),
  )

  return tableData
}

export async function retrieveItemHistoryData(smartContractAddress) {
  const result1 = await alchemy.core.getLogs({
    fromBlock: '0x0',
    address: smartContractAddress,
    topics: [
      ethers.utils.id('MintItem(address,uint256,uint256,uint256,uint256)'),
    ],
  })

  const result2 = await alchemy.core.getLogs({
    fromBlock: '0x0',
    address: smartContractAddress,
    topics: [ethers.utils.id('Transfer(address,address,uint256)')],
  })
  const tableData1 = []
  const tableData2 = []

  await Promise.allSettled(
    result1.map(async (element, index) => {
      tableData1
      let { topics } = element

      const timeStamp = await alchemy.core.getBlock(element.blockNumber)

      const date = moment.unix(timeStamp.timestamp).format('MM/DD/YYYY')
      const object = {
        Event: 'MintItem',
        Price: parseInt(element.topics[3]),
        From: ethers.constants.AddressZero,
        To: ethers.utils.defaultAbiCoder.decode(['address'], topics[1]),
        Date: date,
      }
      tableData1.push(object)
    }),
  )

  await Promise.allSettled(
    result2.map(async (element, index) => {
      tableData1
      let { topics } = element

      const timeStamp = await alchemy.core.getBlock(element.blockNumber)

      const date = moment.unix(timeStamp.timestamp).format('MM/DD/YYYY')

      const object = {
        Event: 'Transfer',
        Price: parseInt(element.topics[3]),
        From: ethers.utils.defaultAbiCoder.decode(['address'], topics[1]),
        To: ethers.utils.defaultAbiCoder.decode(['address'], topics[2]),
        Date: date,
      }
      tableData2.push(object)
    }),
  )

  return [...tableData1, ...tableData2]
}
