import { ModalProps as AModalProps } from 'antd/lib/modal'

export interface ModalProps extends AModalProps {
  /** 加载中 */
  loading?: boolean
  /** 隐藏提交按钮 */
  hideOk?: boolean
}
