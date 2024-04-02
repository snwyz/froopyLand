import { ethers } from 'ethers'
import moment, { Moment } from 'moment'
import { web3Modal } from 'packages/web3'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

// 322的已经开始位置拍卖了，有位置拍卖中的
// import FroopyABI322 from 'packages/abis/demo/fl322.json'
// 323的今天晚上0点开始位置拍卖
import FroopyABI323 from 'packages/abis/demo/fl323.json'



const FL_CONTRACT_ADR_323 = process.env.NEXT_PUBLIC_FL_CONTRACT_ADR //323的今天晚上0点开始位置拍卖

const FL_CONTRACT_ADR_322 = process.env.NEXT_PUBLIC_FL_CONTRACT_ADR_322 //322 拍卖中的

export enum ActivityStatus {
  NotStarted = 'NotStarted',
  Bidding = 'Bidding',
  Staking = 'Staking',
  Playing = 'Playing'
}


interface IState {
  startTime: moment.Moment
  state: ActivityStatus
  roundInfo: any
  setStartTime: (date: moment.Moment) => void
  setState: (state: string) => void
  setStartTimeByContract: () => void
}



const useAuctions = create(immer<IState>(((set, get) => ({
    startTime: moment(),
    state: ActivityStatus.NotStarted,
    roundInfo: null,
    setStartTime(date: moment.Moment) {
      set({
        startTime: date
      })
    },
    setState(state: ActivityStatus) {
      set({
        state
      })
    },

    async setStartTimeByContract() {
      const provider = await web3Modal.connect()    
      const library = new ethers.providers.Web3Provider(provider)
      const signer = library.getSigner()
      // const address = await signer.getAddress()

      const contract = new ethers.Contract(FL_CONTRACT_ADR_323, FroopyABI323, signer)
      const tx = await contract.bidRoundInfo()
      console.log(tx, 'tx')
      
      set({
        roundInfo: tx
      })
    },
}))))


export default useAuctions