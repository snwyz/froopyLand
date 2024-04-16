import http from '../index'

export const getAuctionInfo = () => http.get<Promise<any>>('/getAuctionInfo')