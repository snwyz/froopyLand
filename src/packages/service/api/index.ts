import http from '../index'
import { INftList, IProfit, IUserDividends, IUserRetrieved } from './types'

/**
 * @description: Get the user's profit
 * @param {string} userAddress user address
 * @return {*}
 */
export const getMyProfit = (userAddress: string) => http.get<IProfit>(`/user/myProfit/${userAddress}`)


/**
 * @description: Get historical dividends and prize
 * @param {string} userAddress user address
 * @param {number} pageNum page number start from 1
 * @param {number} status 0 unclaimed 1 claimed
 * @return {*}
 */
export const getHistoricalDividendsAndPrize = (userAddress: string, pageNum: number, status: number) => http.get<IUserDividends>(`/user/historicalDividendsAndPrize/${userAddress}/${pageNum}/${status}`)

/**
 * @description: Get the user's NFT
 * @param {string} userAddress
 * @param {number} pageNum
 * @return {*}
 */
export const getMyPurchasedNfts = (userAddress: string, pageNum: number) => http.get<IUserRetrieved>(`/user/myPurchasedNfts/${userAddress}/${pageNum}`)

/**
 * @description: Get the user's participation games
 * @param {string} userAddress user address
 * @param {number} status 1 ongoing 2 ended 3 all
 * @return {*}
 */
export const getMyParticipationGames = (userAddress: string, status: number) => http.get<INftList>(`/user/myParticipationGames/${userAddress}/${status}`)

/**
 * @description: Get the user's auctions
 * @param {string} userAddress user address
 * @param {number} status 0 upcoming 1 ongoing 2 ended 3 all
 * @return {*}
 */
export const getMyAuctions = (userAddress: string, status: number) => http.get<INftList>(`/user/myAuctions/${userAddress}/${status}`)

export const getAuctionInfo = () => http.get<Promise<any>>('/fl/game/getAuctionInfo')

export const getUserNftList = (address: string) => http.get<Promise<any>>(`/fl/game/getUserNftList/${address}/1`) // /walletAddress/pageNumber

export const getBidderForm = () => http.get<Promise<any>>('/fl/game/getBidderForm')

export const getNftAuctions = () => http.get<Promise<any>>('/fl/nft/getNftAuctions/1')

