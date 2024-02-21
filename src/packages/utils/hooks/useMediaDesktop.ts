import breakpoints from '@styles/scale/variables/_breakpoints.module.scss'

import useMedia from '@utils/hooks/useMedia'

const useMediaDesktop = () => {
  const xl = +breakpoints['breakpoint-xl']
  const matchDesktop = useMedia({ minWidth: xl + 1 })
  return matchDesktop
}

export default useMediaDesktop
