import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

export const usePriceHistory = ({
  contractAddress,
}: {
  contractAddress: string
}) => {
  return useQuery({
    queryKey: ['priceHistory', contractAddress],
    queryFn: async () => {
      const response = await fetch(
        `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/getNFTSales?fromBlock=0&toBlock=latest&order=desc&marketplace=seaport&contractAddress=${contractAddress}&taker=seller&limit=40`,
      )
      const data = await response.json()
      const { nftSales } = data

      const blockToDate = async ({ block }: { block: number }) => {
        const blockToHex = '0x' + block.toString(16)
        const response = await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
          {
            method: 'POST',
            body: JSON.stringify({
              id: 1,
              jsonrpc: '2.0',
              method: 'eth_getBlockByNumber',
              params: [blockToHex, false],
            }),
          },
        )
        const data = await response.json()
        const { result } = data
        const timestamp = Number(ethers.utils.hexlify(result.timestamp))
        return new Date(timestamp * 1000).toLocaleString('en-US', {
          dateStyle: 'short',
        })
      }

      const nftData = async () => {
        const newData = await Promise.all(
          nftSales.map(async (sale: any) => {
            return {
              price: ethers.utils.formatEther(sale.sellerFee.amount).toString(),
              date: await blockToDate({ block: sale.blockNumber }),
              hash: sale.transactionHash,
              block: sale.blockNumber,
            }
          }),
        )
        return newData
      }

      return {
        nftData: await nftData(),
      }
    },
  })
}
