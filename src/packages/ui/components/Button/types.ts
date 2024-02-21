import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { ButtonColors } from '@ts'

export type Sizes = 'small' | 'medium'

export type IButton = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target'
> & {
  size?: Sizes
  color?: ButtonColors
  flex?: boolean
  icon?: ReactNode
  shallow?: boolean
}

type AnchorButtonProps = IButton & AnchorHTMLAttributes<HTMLAnchorElement>
type NativeButtonProps = IButton & ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = Partial<AnchorButtonProps | NativeButtonProps>
