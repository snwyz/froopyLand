import breakpoints from '@styles/scale/variables/_breakpoints.module.scss'

import useMedia from './useMedia'

const useMediaLG = () => {
  const lg = +breakpoints['breakpoint-lg']
  const matchUpLg = useMedia({ minWidth: lg })
  const matchDownLg = useMedia({ maxWidth: lg - 1 })
  return { lg, matchUpLg, matchDownLg }
}

export default useMediaLG
