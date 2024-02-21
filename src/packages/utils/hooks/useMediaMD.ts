import breakpoints from '@styles/scale/variables/_breakpoints.module.scss'

import useMedia from './useMedia'

const useMediaMD = () => {
  const md = +breakpoints['breakpoint-md']
  const matchUpMd = useMedia({ minWidth: md })
  const matchDownMd = useMedia({ maxWidth: md - 1 })
  return { md, matchUpMd, matchDownMd }
}

export default useMediaMD
