import breakpoints from '@styles/scale/variables/_breakpoints.module.scss'

import useMedia from './useMedia'

const useMediaSM = () => {
  const sm = +breakpoints['breakpoint-sm']
  const matchUpSm = useMedia({ minWidth: sm })
  const matchDownSm = useMedia({ maxWidth: sm - 1 })
  return { sm, matchUpSm, matchDownSm }
}

export default useMediaSM
