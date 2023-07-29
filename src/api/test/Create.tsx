import request from '@/utils/request'
import { message } from 'antd'

const testCreateApi = async (opts: testCreateApi.Opts) => {
  return request({
    url: 'test',
    method: 'post',
    data: opts,
  }).then((res) => {
    return res.data as testCreateApi.Result || {}
  }).catch((res) => {
    message.error(res?.message || '服务器异常')
    return false as false
  })
}

export default testCreateApi

/** 创建 */
declare namespace testCreateApi {
  type Opts = {
    name?: string
    status?: number
    value?: number
  }
  type Result = {
    id?: number | null
    name?: string | null
    status?: number | null
    value?: number | null
  }
}
