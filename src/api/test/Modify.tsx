import request from '@/utils/request'
import { message } from 'antd'

const testModifyApi = async (opts: testModifyApi.Opts) => {
  const { id, ...data } = opts
  return request({
    url: `test/${id}`,
    method: 'put',
    data,
  }).then((res) => {
    return res.data as testModifyApi.Result || {}
  }).catch((res) => {
    if (res?.status === -1) {
      message.warning(res.message)
      return -1
    }
    message.error(res?.message || '服务器异常')
    return false as false
  })
}

export default testModifyApi

/** 修改 */
declare namespace testModifyApi {
  type Opts = {
    id: number | string
    name?: string
    status?: number
    value?: number
  }
  type Result = {
    id?: null | number
    name?: null | string
    status?: null | number
    value?: null | number
  }
}
