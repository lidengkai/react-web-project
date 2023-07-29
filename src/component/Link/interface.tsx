export interface LinkProps {
  className?: string
  style?: CSSProperties
  /** 点击事件、提交事件 */
  onClick?(): void
  /** 二次确认 */
  comfirm?: string
}
