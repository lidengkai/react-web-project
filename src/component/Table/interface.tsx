import { TableProps as ATableProps } from 'antd/lib/table'

export interface TableProps<T = any> extends Omit<ATableProps<T>, 'onChange'> {
  order?: 'desc' | 'asc'
  field?: keyof T
  filter?: {
    [K in keyof T]?: NonNullable<T[K]>[]
  }
  onChange?(params: {
    pagination: {
      current: number
      pageSize: number
    }
    filters: {
      [K in keyof T]?: NonNullable<T[K]>[]
    }
    sorter: {
      field?: keyof T
      order?: 'asc' | 'desc'
    }
  }): void
}
