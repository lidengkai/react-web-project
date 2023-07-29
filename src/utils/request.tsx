import history from '@/history'
import { API } from '@/config'
import { ROUTE } from '@/lib/config'
import { createRequest } from '@/lib/utils'

createRequest.instance.interceptors.response.use(function (response) {
  const { baseURL } = response.config
  const result = response.data
  switch (baseURL) {
    case API[1]: {
      if (result?.status === 1) {
        return response
      }
      break
    }
  }
  throw { response }
})

const request = <K extends keyof typeof APP_API = 1>(opts: Parameters<typeof createRequest>[0] & {
  /** 地址类型，根据类型决定前缀 */
  prefixType?: K
}) => {
  const { prefixType = 1, ...params } = opts
  if (!params.baseURL) {
    params.baseURL = API[prefixType]
  }
  return createRequest<Api.Result[K], Api.Error[K]>(params, (response) => {
    const code = response?.status
    window.console.error('error code:', code)
    switch (code) {
      case 401:
        history.push(ROUTE.LOGIN)
        return true
      default:
        break
    }
  })
}

export default request
