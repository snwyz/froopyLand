import { faker } from '@faker-js/faker'
import { ethers } from 'ethers'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import FroopyABI from 'packages/abis/demo/FroopyLand.json'


interface IState {
    loading: boolean
    gameList: any[]
    setGameList: (web3Provider: ethers.providers.Web3Provider) => void
}


const useFomoStore = create(immer<IState>(((set) => ({
    gameList: [],
    loading: false,
    async setGameList (web3Provider: ethers.providers.Web3Provider) {
        try {
          const signer = web3Provider.getSigner()
          const contract = new ethers.Contract('0x49b775262e272bED00B6Cf0d07a5083a7eeFe19E', FroopyABI, signer)
            
          const imageUrls = [
            'https://i.seadn.io/s/raw/files/1c27508d0d3016e1d18e63b81c861c81.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/gcs/files/1877dff2c72f4e338d7c1200c925e718.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/gcs/files/bff9ff793f644326c6bb8891803d1fbd.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/s/raw/files/7c50c8ce58d8976aaf8d9097a5568e20.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/s/raw/files/f404c42f90ab3d63d5f7d43eeb97d583.png?auto=format&dpr=1&w=1000',
            'https://i.seadn.io/s/raw/files/3bf515fc55478ba57bf56ada5a02031a.png?auto=format&dpr=1&w=1000'
          ]
          const gamesByIds = [0, 1, 2, 3, 4, 5]
          const gameList = []
          
          for (const id of gamesByIds) {
            try {
              const tx = await contract.games(id)
              const [state] = await contract.getGameStateOfGameIds([id])
              const [endTime] = await contract.getGameEndTimestampOfGameIds([id])
              
              gameList.push({
                ...tx,
                id,
                nftImage: imageUrls[id],
                nftName: faker.internet.userName(),
                state,
                endTime: endTime.toNumber()
              })
            } catch (error) {
              console.error(`Error fetching data for game ID ${id}:`, error)
              gameList.push({
                gameId: id,
                error: true,
              })
            }
          }
          set({
            gameList
          })
          console.log(gameList, '<===59')
        } catch (error) {
          console.error('Error initializing contract:', error.message)
        }
      }
}))))


export default useFomoStore