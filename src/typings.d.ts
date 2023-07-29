declare module 'react-redux' {
  export interface DefaultRootState extends ReturnType<typeof import('./store').default.getState> {
  }
}

declare const APP_API: Record<keyof Api.Result, string>

declare namespace Api {
  type Result = {
    1: {
      status: 0
      message?: null | string
      data?: any
    }
  }
  type Error = {
    1?: null | Omit<Result[1], 'status'> & {
      status?: null | number
    }
  }
}
