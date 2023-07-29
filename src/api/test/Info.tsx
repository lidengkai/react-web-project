import request from '@/utils/request'
import { message } from 'antd'

const testInfoApi = async (opts: testInfoApi.Opts) => {
  const { id } = opts
  return request({
    url: `test/${id}`,
    method: 'get',
  }).then((res) => {
    return res.data as testInfoApi.Result || {}
  }).catch((res) => {
    message.error(res?.message || '服务器异常')
    return false as false
  })
}

export default testInfoApi

/** 详情 */
declare namespace testInfoApi {
  type Opts = {
    id: number | string
  }
  type Result = {
    id?: number | null
    name?: string | null
    status?: number | null
    value?: number | null
  }
}
