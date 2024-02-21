import { memo } from 'react'

import Table from './Table'

function ListTable({ items }: { items: any }) {
  return (
    <>
      {items?.map((item, idx) => {
        return <Table item={item} key={idx} />
      })}
    </>
  )
}

export default memo(ListTable)
