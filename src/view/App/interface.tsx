export type Store = {
  /** 加载中 */
  loading: boolean
  /** 用户信息 */
  userInfo: RemoteContainer.UserInfo
}

export type Props = {
}

export declare namespace ContainerWrapper {
  type Props = {
    userInfo?: RemoteContainer.UserInfo
  }
}

export declare namespace ContainerPage {
  type Props = {
    config: RemoteContainer.RouteEntry
  }
}
