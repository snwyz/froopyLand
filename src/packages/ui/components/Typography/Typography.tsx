import {
  AnchorHTMLAttributes,
  AriaRole,
  createElement,
  CSSProperties,
  DOMAttributes,
  forwardRef,
  MouseEvent,
} from 'react'

import clsx from 'clsx'

import { Colors } from '@ts'

import { TTypographyComponent, TTypographyVariant } from './types'
import classes from './Typography.module.scss'

interface TypographyProps
  extends Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'target' | 'rel'
  > {
  className?: string
  weight?: TTypographyVariant
  component?: TTypographyComponent
  disabled?: boolean
  color?: Colors
  fontSize: number
  lineHeight: number
  style?: CSSProperties
  role?: AriaRole
  tabIndex?: number
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

const Typography = forwardRef<
  HTMLElement,
  TypographyProps & DOMAttributes<HTMLElement>
>(
  (
    {
      className = '',
      weight,
      component = 'p',
      color = '',
      href,
      target,
      fontSize,
      lineHeight,
      ...props
    },
    ref,
  ) =>
    createElement(href ? 'a' : component, {
      className: clsx(
        classes.typography,
        classes[`w${weight}`],
        classes[`color_${color}`],
        className,
        {
          [classes.link]: !!href,
        },
      ),
      ...(target && { target }),
      href,
      style: {
        fontSize,
        lineHeight: `${lineHeight}px`,
      },
      ...props,
    }),
)

Typography.displayName = 'Typography'

export default Typography
