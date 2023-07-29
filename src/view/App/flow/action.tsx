import { Store } from '../interface'
import { dispatch, resetState } from '@/store'
import reducer from './reducer'
import history from '@/history'
import { message } from 'antd'
import { MenuProps } from 'antd/lib/menu'

const {
  init,
  commit,
} = reducer.actions

export const unmount = async () => {
  resetState()
}

export const initPage = async () => {
}

export const clickMenu: MenuProps['onSelect'] = async (e) => {
  history.push(e.key)
}

export const clickUserMenu: MenuProps['onClick'] = async (e) => {
  console.log('click user', e)
}
