import classnames from 'classnames'
import styles from './style.less'
import { Props, FormType } from './interface'
import { useSelector } from 'react-redux'
import { useUnmount } from 'ahooks'
import {
  unmount,
  initPage,
  submit,
} from './flow/action'
import { Type, Title } from './config'
import Loading from '@/component/Loading'
import Modal from '@/component/Modal'
import { Form, Input, InputNumber } from 'antd'

const TableInfo: FC<Props> = memo((props) => {
  useUnmount(unmount)
  const loading = useSelector(state => state.tableInfoModal.loading)
  const type = useSelector(state => state.tableInfoModal.type)
  const disabledKeys = useSelector(state => state.tableInfoModal.disabledKeys)
  const hideKeys = useSelector(state => state.tableInfoModal.hideKeys)
  const { show, data, onCancel, onSubmit } = props
  const [form] = Form.useForm<FormType>()

  useEffect(() => {
    if (show) {
      form.resetFields()
      initPage(data).then(info => {
        const { id, name, value } = info
        form.setFieldsValue({
          id,
          name: name || '',
          value,
        })
      })
    }
  }, [show])

  const initialValues: FormType = useMemo(() => {
    return {
      id: null,
      name: '',
      value: null,
    }
  }, [])

  const onOk = useCallback(() => {
    form.validateFields().then(submit).then(res => {
      if (res === -1) {
        return onCancel?.()
      }
      if (res) {
        onSubmit?.(type, res)
      }
    }).catch(() => { })
  }, [type, onSubmit, onCancel])

  return (
    <>
      <Modal title={Title[type]}
        open={show}
        loading={loading}
        onCancel={onCancel}
        onOk={onOk}
        hideOk={type === Type.Show}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} form={form} initialValues={initialValues}>
          <Form.Item name="id" hidden><div></div></Form.Item>
          <Form.Item name="name" label="名称" required
            rules={[
              { required: true, message: '名称不能为空' },
              { type: 'string', max: 10, message: '名称不能超过10个字' },
            ]}
            hidden={hideKeys.includes('name')}
          >
            <Input autoComplete="off" readOnly={disabledKeys.includes('name')} />
          </Form.Item>
          <Form.Item name="value" label="值" required
            rules={[
              { required: true, message: '值不能为空' },
              { type: 'number', max: 9999, message: '请输入0~9999之间的整数' },
            ]}
            hidden={hideKeys.includes('value')}
          >
            <InputNumber className={styles.number} precision={0} readOnly={disabledKeys.includes('value')} />
          </Form.Item>
        </Form>
        <Loading show={loading} />
      </Modal>
    </>
  )
})

const TableInfoModal = Object.assign(TableInfo, {
  Type
})

declare namespace TableInfoModal {
  type Type = Props
}

export default TableInfoModal
