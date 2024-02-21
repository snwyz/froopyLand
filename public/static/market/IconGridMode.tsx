function IconGridMode({ color = '#fff' }: { color: string }) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect y="0.333496" width="7" height="7.16667" fill={color} />
      <rect y="9.54773" width="7" height="7.16667" fill={color} />
      <rect x="9" y="0.333496" width="7" height="7.16667" fill={color} />
      <rect x="9" y="9.54773" width="7" height="7.16667" fill={color} />
    </svg>
  )
}

export default IconGridMode
