import { ROUTE } from '@/lib/config'

type ApiType = typeof APP_API

/** 开发环境 */
const dev: ApiType = {
  1: '/api',
}

/** 测试环境 */
const test: ApiType = {
  1: '/api',
}

/** 接口 */
export const API: ApiType = process.env.NODE_ENV === 'production' ? APP_API : {
  ...dev,
  // ...test,
}

export const BASE_ROUTE = ROUTE.PROJECT
