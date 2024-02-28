# Builder pack

# vanila
# vanila


# 部署测试
 OKEX test
  RPC
   https://chainlist.org/chain/195
   好像不需要申请
  FL
   FLaddress =0x49b775262e272bED00B6Cf0d07a5083a7eeFe19E
  测试用NFT
   NFTaddress = 0xdbA0702f1BeaB36e9fFB6f7efF79A626C835EDc7
   调用     function awardItem(address to)
        public
        returns (uint256)
    即可mint测试用NFT
   批准NFT给FL合约
    ERC721(NFTaddress).approve(FLaddress, nftId);


ERC721.json -> NFT资产



