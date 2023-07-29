import type testListApi from '@/api/test/List'
import type TableInfoModal from '@/view/Modal/TableInfo'

export type Store = {
  /** 加载中 */
  loading: boolean
  name: string
  filters: {
    status?: number[]
  }
  field: keyof Item | undefined
  order: 'asc' | 'desc' | undefined
  current: number
  pageSize: number
  total: number
  dataSource: Item[]
  infoShow: TableInfoModal.Type['show']
  infoData: TableInfoModal.Type['data']
}

export type Props = {
}

export type Item = NonNullable<testListApi.Result['list']>[number]
