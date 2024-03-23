import { faker } from '@faker-js/faker'
import { ethers } from 'ethers'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import FroopyABI from 'packages/abis/demo/fl323.json'
import { generateTimestamp } from '@modules/Market/Main'


interface IState {
    loading: boolean
    gameList: any[]
    upcomingList: any[]
    ongoingList: any[]
    finishedList: any[]
    setGameList: (web3Provider: ethers.providers.Web3Provider) => void
}

const FL_CONTRACT_ADR = process.env.NEXT_PUBLIC_FL_CONTRACT_ADR
const useFomoStore = create(immer<IState>(((set) => ({
    gameList: [],
    upcomingList: [],
    ongoingList: [],
    finishedList: [],
    loading: false,
    async setGameList (web3Provider: ethers.providers.Web3Provider) {
        try {
          const signer = web3Provider.getSigner()
          const contract = new ethers.Contract(FL_CONTRACT_ADR, FroopyABI, signer)
            
          const imageUrls = [
            'https://i.seadn.io/s/raw/files/1c27508d0d3016e1d18e63b81c861c81.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/gcs/files/1877dff2c72f4e338d7c1200c925e718.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/gcs/files/bff9ff793f644326c6bb8891803d1fbd.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/s/raw/files/7c50c8ce58d8976aaf8d9097a5568e20.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/s/raw/files/f404c42f90ab3d63d5f7d43eeb97d583.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/s/raw/files/3bf515fc55478ba57bf56ada5a02031a.png?auto=format&dpr=1&w=1000'
          ]

          // const gamesByIds = [0,1,2,3,4,5] // 合约小伙伴暂时还未统一 list 接口，遂通过组合 ids 来请求。
          const gamesByIds = [0]
          const gameList = []
          
          for (const id of gamesByIds) {
            try {
              const tx = await contract.getGameInfoOfGameIds(id)
              // const [state] = await contract.getGameStateOfGameIds([id])
              // const [endTime] = await contract.getGameEndTimestampOfGameIds([id])
              console.log(tx, '<===tx')
              
              gameList.push({
                ...tx,
                id,
                nftImage: imageUrls[id],
                nftName: faker.internet.userName(),
                endTime: tx.endTimestamp.toNumber(),
                startTimestamp: tx.startTimestamp.toNumber()
              })
              
            } catch (error) {
              console.error(`Error fetching data for game ID ${id}:`, error)
              gameList.push({
                gameId: id,
                error: true,
              })
            }
          }

          const generateMockData = (list, state) => {
            const num = 6
            const len = num - list.length
            if (len <= 0) return []
            return Array.from({ length: len }, (_) => {
              const clonedItem = { ...list[0] }
              delete clonedItem.state
              delete clonedItem.id
              const total = faker.number.int({ min: 100, max: 500 })

              const totalKeyMinted = ethers.BigNumber.from(total.toString())
              // const salesRevenue = totalKeyMinted.mul(clonedItem.price)
              return {
                ...clonedItem,
                id: faker.number.int(),
                endTime: generateTimestamp(),
                startTimestamp: generateTimestamp(),
                isClone: true,
                totalKeyMinted: state === 0 ? null:totalKeyMinted,
                state,
                nftName: faker.internet.userName() + '-' + faker.number.int({ min: 1, max: 100 }),
                nftImage: imageUrls[faker.number.int({ min: 0, max: 5 })]
              }
            })
          }
        
          const upcomingList = gameList.filter(v => v.state === 0)
          const ongoingList = gameList.filter(v => v.state === 1)
          const finishedList = gameList.filter(v => v.state === 2)

          const renderList = () => {
            return [
              ...upcomingList.concat(generateMockData(upcomingList, 0)), 
              ...ongoingList.concat(generateMockData(ongoingList, 1)), 
              ...finishedList.concat(generateMockData(finishedList, 2))
            ]
          }
          const data = renderList()
          set({
            gameList: data,
            upcomingList: [...upcomingList.concat(generateMockData(upcomingList, 0))],
            ongoingList: [...ongoingList.concat(generateMockData(ongoingList, 1))],
            finishedList: [...finishedList.concat(generateMockData(finishedList, 2))]
          })
        } catch (error) {
          console.error('Error initializing contract:', error.message)
        }
      }
}))))


export default useFomoStore