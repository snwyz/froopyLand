import { useQuery } from '@tanstack/react-query'

export const useIsVerifiedCollection = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ['isVerified', slug],
    queryFn: async () => {
      const response = await fetch(
        `https://api.opensea.io/api/v1/collection/${slug}`,
      )

      const data = await response.json()
      const { safelist_request_status } = data?.collection
      if (safelist_request_status !== 'verified') return false
      return safelist_request_status === 'verified'
    },
  })
}
