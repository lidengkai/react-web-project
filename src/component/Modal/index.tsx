import classnames from 'classnames'
import styles from './style.less'
import { ModalProps } from './interface'
import { Modal as AModal } from 'antd'
import Loading from '@/component/Loading'

const Modal: FC<ModalProps> = memo((props) => {
  const { className, hideOk, okButtonProps, loading, children, ...other } = props

  const currentOkButtonProps = useMemo(() => {
    if (hideOk) {
      return {
        style: { display: 'none' },
        ...(okButtonProps || {})
      }
    }
    if (loading) {
      return {
        disabled: true,
        ...(okButtonProps || {})
      }
    }
    return okButtonProps
  }, [hideOk, okButtonProps, loading])

  return (
    <AModal className={classnames(styles.main, className)}
      okButtonProps={currentOkButtonProps}
      {...other}
    >
      <div>{children}</div>
      <Loading show={loading} />
    </AModal>
  )
})

export default Modal

declare namespace Modal {
  interface Props extends Required<ModalProps> {
  }
}
