import classnames from 'classnames'
import styles from './style.less'
import { TableProps } from './interface'
import { Table as ATable } from 'antd'

const Table: FC<TableProps<any>> = memo((props) => {
  const defaultRowKey = useCallback((_: any, index: number) => index, [])
  const {
    order,
    field,
    filter = {},
    className,
    columns = [],
    rowKey = defaultRowKey,
    onChange,
    locale = {},
    pagination = {},
    showSorterTooltip = false,
    scroll = { x: '100%' },
    ...otherProps
  } = props

  const changeTable = useCallback((pagination: any, filters: any, sorter: any) => {
    const { field, order } = sorter
    onChange && onChange({
      pagination,
      filters,
      sorter: {
        field,
        order: order === 'descend' ? 'desc' : order === 'ascend' ? 'asc' : undefined,
      }
    })
  }, [onChange])

  const currentColumns = useMemo(() => {
    const currentColumns: any[] = []
    for (let index = 0, l = columns.length; index < l; index++) {
      const item = columns[index]
      const {
        width = 100,
        align = 'center',
        sorter, sortOrder,
        filtered, filteredValue,
        ...other
      } = item
      const { dataIndex } = item as any
      const sorterInfo = sorter && field === dataIndex ? {
        sortOrder: order === 'desc' ? 'descend' : order === 'asc' ? 'ascend' : undefined,
      } : {}
      const filterInfo = filtered && filter[dataIndex] ? {
        filteredValue: filter[dataIndex]
      } : {}
      currentColumns.push({
        width,
        align,
        sorter, ...sorterInfo,
        filtered, ...filterInfo,
        ...other
      })
    }
    return currentColumns
  }, [columns, order, field, filter])

  const showTotal = useCallback((total: number, range: number[]) => {
    const [start, end] = range
    return `第${start}-${end}条/总共${total}条`
  }, [])

  return (
    <>
      <ATable
        className={classnames(styles.root, className)}
        rowKey={rowKey as any}
        columns={currentColumns as any}
        onChange={changeTable}
        locale={{
          filterConfirm: '确定',
          filterReset: '重置',
          emptyText: '暂无数据',
          ...locale
        }}
        pagination={pagination && {
          showSizeChanger: true,
          pageSizeOptions: ['20', '50', '100'],
          showTotal,
          ...pagination
        }}
        showSorterTooltip={showSorterTooltip}
        scroll={scroll}
        {...otherProps}
      />
    </>
  )
})

export default Table

declare namespace Table {
  interface Props<T> extends Required<TableProps<T>> {
  }
}
