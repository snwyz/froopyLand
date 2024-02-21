import {
  OpenSeaContractType,
  VerifiedType,
} from '@modules/MarketDetail/ItemNftDetail/Verified/type'
import { useQuery } from '@tanstack/react-query'

export const useOpenseaCollectionDetails = ({
  contractAddress,
}: VerifiedType) => {
  return useQuery({
    queryKey: ['isVerified', contractAddress],
    queryFn: async () => {
      const response = await fetch(
        `https://api.opensea.io/api/v1/asset_contract/${contractAddress}`,
      )
      const {
        name,
        schema_name: tokenStandard,
        symbol,
        image: image,
        collection: {
          slug,
          external_url: website,
          discord_url: discord,
          twitter_username: twitter,
          telegram_url: telegram,
          instagram_username: instagram,
        },
      } = await response.json()

      const collectionDetails: OpenSeaContractType = {
        contractAddress,
        links: {
          website,
          discord,
          twitter: twitter && `https://twitter.com/${twitter}`,
          telegram,
          instagram: instagram && `https://instagram.com/${instagram}`,
        },
        image,
        slug,
        name,
        tokenInfo: {
          symbol,
          tokenStandard,
        },
      }

      return collectionDetails
    },
  })
}
