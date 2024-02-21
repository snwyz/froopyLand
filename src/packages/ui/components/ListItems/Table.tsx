import { memo } from 'react'

import TableRow from './TableRow'

type ListTableProps = {
  items: any
}

function TableList({ items }: ListTableProps) {
  return (
    <>
      {items?.map((item, idx) => {
        return (
          <TableRow
            item={item}
            key={idx}
          />
        )
      })}
    </>
  )
}

export default memo(TableList)
