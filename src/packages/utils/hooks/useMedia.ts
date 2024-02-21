import { useEffect, useLayoutEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const useEhchancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const useMedia: typeof useMediaQuery = (settings, device, onChange) => {
  const [isClient, setIsClient] = useState(false)
  const mediaQuery = useMediaQuery(settings, device, onChange)

  useEhchancedEffect(() => {
    setIsClient(true)
  }, [])

  return isClient && mediaQuery
}

export default useMedia
