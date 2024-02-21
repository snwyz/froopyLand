function IconListMode({ color = '#fff' }: { color: string }) {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect y="0.333496" width="3" height="3.07143" fill={color} />
      <rect y="6.47632" width="3" height="3.07143" fill={color} />
      <rect y="12.6191" width="3" height="3.07143" fill={color} />
      <rect x="5" y="0.333496" width="13" height="3.07143" fill={color} />
      <rect x="5" y="6.47632" width="13" height="3.07143" fill={color} />
      <rect x="5" y="12.6191" width="13" height="3.07143" fill={color} />
    </svg>
  )
}

export default IconListMode
