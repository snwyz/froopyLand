import breakpoints from '@styles/scale/variables/_breakpoints.module.scss'

import useMedia from './useMedia'

const useMediaXS = () => {
  const xs = +breakpoints['breakpoint-xs']
  const matchUpXs = useMedia({ minWidth: 0 })
  const matchDownXs = useMedia({ maxWidth: xs - 1 })
  return { xs, matchUpXs, matchDownXs }
}

export default useMediaXS
