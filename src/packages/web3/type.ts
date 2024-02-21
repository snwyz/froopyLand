export type NFT = {
  contractAddress?: string;
  tokenId?: string;
  image?: string;
  title?: string;
  derivativeContract?: string;
  tokenUri?: {
    gateway?: string;
  };
};
