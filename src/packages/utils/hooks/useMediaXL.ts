import breakpoints from '@styles/scale/variables/_breakpoints.module.scss'

import useMedia from './useMedia'

const useMediaXL = () => {
  const xl = +breakpoints['breakpoint-xl']
  const matchUpXl = useMedia({ minWidth: xl + 1 })
  const matchDownXl = useMedia({ maxWidth: xl })
  return { xl, matchUpXl, matchDownXl }
}

export default useMediaXL
