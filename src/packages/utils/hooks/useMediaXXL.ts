import breakpoints from '@styles/scale/variables/_breakpoints.module.scss'

import useMedia from './useMedia'

const useMediaXXL = () => {
  const xxl = +breakpoints['breakpoint-xxl']
  const matchUpXxl = useMedia({ minWidth: xxl })
  const matchDownXxl = useMedia({ maxWidth: xxl - 1 })
  return { xxl, matchUpXxl, matchDownXxl }
}

export default useMediaXXL
