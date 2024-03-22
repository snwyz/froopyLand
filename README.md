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




----- 3.19

① FLT的ERC20合约

FLTaddress=

0xE153e162c39b67a5b18a8c5Fa2274C5B3c2E11e7

② Vault 金库

0x103A15A8E46b3E8D6595f66Dee2Dfc36b2AF091D

③ FroopyLand Auction / Game合约

0xD1A807Ea4539fB28d0A22B168C437314a3Ad0C75

暂无位置拍卖功能
