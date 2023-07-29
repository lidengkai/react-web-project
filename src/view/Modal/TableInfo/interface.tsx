import type { Type } from './config'
import type testInfoApi from '@/api/test/Info'

export type Store = {
  /** 加载中 */
  loading: boolean
  /** 类型 */
  type: Type
  /** 禁用 */
  disabledKeys: Array<Exclude<keyof FormType, 'id'>>
  /** 隐藏的数据 */
  hideKeys: Array<Exclude<keyof FormType, 'id'>>
}

export type Props = {
  show?: boolean
  data?: {
    type?: Type
    id?: NonNullable<testInfoApi.Result['id']>
    info?: testInfoApi.Result
    disabledKeys?: Store['disabledKeys']
    hideKeys?: Store['hideKeys']
  }
  onCancel?(): void
  onSubmit?(type: Type, result: testInfoApi.Result): void
}

export type FormType = {
  id: number | null
  name: string
  value: number | null
}
