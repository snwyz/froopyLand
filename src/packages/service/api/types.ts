export interface IProfit {
  keys: string;
  flTokens: string;
  keyDividends: string;
  unclaimedKeyDividends: string;
  unclaimedKeyGameIds: number[];
  finalWinPrice: string;
  unclaimedFinalWinPrice: string;
  unclaimedFinalWinnerGameIds: number[];
  nftDividends: string;
  unclaimedNftDividends: string;
  unclaimedNftGameIds: number[];
}

export interface IGameNft {
  gameId: number;
  name: string;
  tokenId: string;
  imageUrl: string;
  tx: string;
}

export interface IHistoricalDividendsList {
  gameNft: IGameNft;
  type: number;
  amount: string;
  status: string;
}

export interface IUserDividends {
  total: number;
  historicalDividendsList: IHistoricalDividendsList[];
}

export interface ApiResponse<T> {
  msg: string;
  code: string;
  data: T;
}
