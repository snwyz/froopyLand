import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import { LinkProps } from 'next/link'

import clsx from 'clsx'

import { ReactFCWithChildren } from '@ts'

import styles from './Button.module.scss'
import { ButtonProps } from './types'

type ButtonType = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement> &
  LinkProps

const Button: ReactFCWithChildren<ButtonProps> = ({
  size = 'small',
  color = 'default',
  href,
  target,
  flex,
  children,
  icon,
  className,
  onClick,
  ...props
}) => {
  const btnProps = {
    className: clsx(
      'button',
      styles.button,
      styles[color],
      styles[size],
      {
        [styles.flex]: flex,
      },
      className,
    ),
    ...(href && {
      href,
      target: target || '_blank',
    }),
    ...props,
  } as ButtonType

  return (
    <button {...({ onClick } as ButtonType)} {...btnProps}>
      {children}
    </button>
  )
  // return href ? (
  //   defaultLink ? (
  //     <a
  //       {...btnProps}
  //       {...({ onClick } as ButtonType)}
  //       className={btnProps.className}
  //       rel="noopener noreferrer">
  //       {btnContent}
  //     </a>
  //   ) : (
  //     <Link {...btnProps} passHref>
  //       <a
  //         {...({ onClick } as ButtonType)}
  //         className={btnProps.className}
  //         rel="noopener noreferrer">
  //         {btnContent}
  //       </a>
  //     </Link>
  //   )
  // ) : (
  //   <button {...({ onClick } as ButtonType)} {...btnProps}>
  //     {children}
  //   </button>
  // )
}

Button.displayName = 'Button'

export default Button
