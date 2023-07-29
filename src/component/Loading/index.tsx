import classnames from 'classnames'
import styles from './style.less'
import { LoadingProps } from './interface'
import { Spin } from 'antd'

const Loading: FC<LoadingProps> = memo((props) => {
  const { className, style, show } = props

  return show ? (
    <>
      <div className={classnames(styles.root, className)} style={style}>
        <Spin className={styles.icon} />
      </div>
    </>
  ) : null
})

export default Loading

declare namespace Loading {
  interface Props extends Required<LoadingProps> {
  }
}
