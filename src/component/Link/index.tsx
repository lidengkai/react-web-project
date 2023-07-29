import classnames from 'classnames'
import styles from './style.less'
import { LinkProps } from './interface'
import { Popconfirm } from 'antd'

const Link: FC<LinkProps> = memo((props) => {
  const { onClick, comfirm, children } = props

  const handleClick = useCallback(() => {
    onClick?.()
  }, [onClick])

  return (
    comfirm ?
      <Popconfirm title={comfirm} onConfirm={handleClick}>
        <span className={styles.link}>{children}</span>
      </Popconfirm>
      : <span className={styles.link} onClick={handleClick}>{children}</span>
  )
})

export default Link

declare namespace Link {
  interface Props extends Required<LinkProps> {
  }
}
