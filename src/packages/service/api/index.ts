import http from '../index'
import { ApiResponse, IProfit, IUserDividends } from './types'

export const getAuctionInfo = () => http.get<Promise<any>>('/game/getAuctionInfo')


/**
 * @description: Get the user's profit
 * @param {string} userAddress user address
 * @return {*}
 */
export const getMyProfit = (userAddress: string) => http.get<ApiResponse<IProfit>>(`/user/myProfit/${userAddress}`)


/**
 * @description: Get historical dividends and prize
 * @param {string} userAddress user address
 * @param {number} pageNum page number start from 1
 * @param {number} status 0 unclaimed 1 claimed
 * @return {*}
 */
export const getHistoricalDividendsAndPrize = (userAddress: string, pageNum: number, status: number) => http.get<ApiResponse<IUserDividends>>(`/user/historicalDividendsAndPrize/${userAddress}/${pageNum}/${status}`)
