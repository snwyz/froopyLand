export function separateThousands(x: string) {
  const [integerPart] = x.split(',')
  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return [formattedInt].join(',')
}
