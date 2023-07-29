import { Store, Props, FormType } from '../interface'
import { dispatch, getState } from '@/store'
import reducer from './reducer'
import history from '@/history'
import { message } from 'antd'
import { Type } from '../config'
import testInfoApi from '@/api/test/Info'
import testCreateApi from '@/api/test/Create'
import testModifyApi from '@/api/test/Modify'
import { formatter } from '@/lib/utils'

const {
  init,
  commit,
} = reducer.actions

export const unmount = async () => {
  dispatch(init())
}

export const initPage = async (data: Props['data'] = {}) => {
  const { type = Type.Add, id, info, disabledKeys, hideKeys } = data
  dispatch(commit({ loading: true }))
  let nextInfo: typeof info = {}
  if (info) {
    nextInfo = info
  } else if (type != Type.Add && id) {
    const info = await testInfoApi({ id })
    if (info) {
      nextInfo = info
    }
  }
  const nextType = type === Type.Edit && !nextInfo.id ? Type.Show : type
  dispatch(commit({
    loading: false,
    type: nextType,
    disabledKeys: disabledKeys || (nextType === Type.Show ? ['name', 'value'] : []),
    hideKeys: hideKeys || [],
  }))
  return nextInfo
}

export const submit = async (data: FormType) => {
  const { type } = getState().tableInfoModal
  const { id, name, value } = data
  switch (type) {
    case Type.Add: {
      dispatch(commit({ loading: true }))
      const res = await testCreateApi({
        name,
        value: formatter.toNumber(value),
      })
      dispatch(commit({ loading: false }))
      return res
    }
    case Type.Edit: {
      if (id) {
        dispatch(commit({ loading: true }))
        const res = await testModifyApi({
          id,
          name,
          value: formatter.toNumber(value),
        })
        dispatch(commit({ loading: false }))
        return res
      }
    }
  }
}
