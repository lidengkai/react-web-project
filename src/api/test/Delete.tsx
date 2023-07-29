import request from '@/utils/request'
import { message } from 'antd'

const testDeleteApi = async (opts: testDeleteApi.Opts) => {
  const { id } = opts
  return request({
    url: `test/${id}`,
    method: 'delete',
  }).then(() => {
    return true as testDeleteApi.Result
  }).catch((res) => {
    message.error(res?.message || '服务器异常')
    return false as false
  })
}

export default testDeleteApi

/** 删除 */
declare namespace testDeleteApi {
  type Opts = {
    id: number | string
  }
  type Result = true
}
