import { Store, Item } from '../interface'
import { dispatch, getState } from '@/store'
import reducer from './reducer'
import history from '@/history'
import { message } from 'antd'
import testListApi from '@/api/test/List'
import testModifyApi from '@/api/test/Modify'
import testDeleteApi from '@/api/test/Delete'
import Table from '@/component/Table'
import TableInfoModal from '@/view/Modal/TableInfo'

const {
  init,
  commit,
} = reducer.actions

export const unmount = async () => {
  dispatch(init())
}

export const initPage = async () => {
  await getTable()
}

/** 请求数据 */
export const getTable = async () => {
  const { name, filters, field, order, current, pageSize } = getState().componentTable
  dispatch(commit({ loading: true }))
  const res = await testListApi({
    page: current,
    size: pageSize,
    sort: field,
    order,
    name,
    status: filters.status,
  })
  if (res) {
    const { list, total } = res
    dispatch(commit({ loading: false, dataSource: list || [], total: total || 0 }))
  } else {
    dispatch(commit({ loading: false }))
  }
}

/** 表格操作 */
export const changeTable: Table.Props<Item>['onChange'] = async (options) => {
  const { pagination, filters, sorter } = options
  const { current, pageSize } = pagination
  const { field, order } = sorter
  dispatch(commit({ current, pageSize, filters, field, order }))
  await getTable()
}

/** 搜索 */
export const searchTable = async (name: string) => {
  dispatch(commit({ name }))
  await getTable()
}

export const setStatus = async (item: Item, status: 0 | 1) => {
  if (item.id) {
    dispatch(commit({ loading: true }))
    const res = await testModifyApi({
      id: item.id,
      status,
    })
    if (res) {
      return await getTable()
    }
    dispatch(commit({ loading: false }))
  }
}

export const deleteItem = async (item: Item) => {
  if (item.id) {
    dispatch(commit({ loading: true }))
    const res = await testDeleteApi({ id: item.id })
    if (res) {
      return await getTable()
    }
    dispatch(commit({ loading: false }))
  }
}

export const addInfo = async () => {
  dispatch(commit({
    infoShow: true,
    infoData: {
      type: TableInfoModal.Type.Add
    }
  }))
}

export const editInfo = async (item: Item) => {
  if (item.id) {
    dispatch(commit({
      infoShow: true,
      infoData: {
        type: TableInfoModal.Type.Edit,
        id: item.id,
      }
    }))
  }
}

export const showInfo = async (item: Item) => {
  if (item.id) {
    dispatch(commit({
      infoShow: true,
      infoData: {
        type: TableInfoModal.Type.Show,
        id: item.id,
      }
    }))
  }
}

export const closeInfo = async () => {
  dispatch(commit({
    infoShow: false,
  }))
}

export const submitInfo: TableInfoModal.Type['onSubmit'] = async (type) => {
  switch (type) {
    case TableInfoModal.Type.Add: {
      message.success('新增成功')
      break
    }
    case TableInfoModal.Type.Edit: {
      message.success('修改成功')
      break
    }
  }
  dispatch(commit({ infoShow: false }))
  await getTable()
}
