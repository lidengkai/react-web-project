import request from '@/utils/request'
import { message } from 'antd'

const testListApi = async (opts: testListApi.Opts) => {
  const { page, size, sort, order, ...data } = opts
  return request({
    url: `test/${page}/${size}`,
    method: 'post',
    params: { sort, order },
    data,
  }).then((res) => {
    return res.data as testListApi.Result || {}
  }).catch((res) => {
    message.error(res?.message || '服务器异常')
    return false as false
  })
}

export default testListApi

/** 列表 */
declare namespace testListApi {
  type Opts = {
    page: number | string
    size: number | string
    sort?: string
    order?: string
    name?: string
    status?: number[]
    value?: number[]
  }
  type Result = {
    list?: Array<{
      id?: number | null
      name?: string | null
      status?: number | null
      value?: number | null
    }> | null
    total?: number | null
  }
}
