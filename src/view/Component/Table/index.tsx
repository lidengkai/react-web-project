import classnames from 'classnames'
import styles from './style.less'
import { Props, Item } from './interface'
import { useSelector } from 'react-redux'
import { useUnmount } from 'ahooks'
import {
  unmount,
  initPage,
  changeTable,
  searchTable,
  setStatus,
  deleteItem,
  addInfo,
  editInfo,
  showInfo,
  closeInfo,
  submitInfo,
} from './flow/action'
import Table from '@/component/Table'
import Link from '@/component/Link'
import TableInfoModal from '@/view/Modal/TableInfo'
import { Breadcrumb, Card, Input, Button } from 'antd'
import { PauseCircleOutlined, PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'

const Home: FC<Props> = memo(() => {
  useUnmount(unmount)
  const loading = useSelector(state => state.componentTable.loading)
  const name = useSelector(state => state.componentTable.name)
  const filters = useSelector(state => state.componentTable.filters)
  const field = useSelector(state => state.componentTable.field)
  const order = useSelector(state => state.componentTable.order)
  const current = useSelector(state => state.componentTable.current)
  const pageSize = useSelector(state => state.componentTable.pageSize)
  const total = useSelector(state => state.componentTable.total)
  const dataSource = useSelector(state => state.componentTable.dataSource)
  const infoShow = useSelector(state => state.componentTable.infoShow)
  const infoData = useSelector(state => state.componentTable.infoData)

  const columns = useMemo((): Table.Props<Item>['columns'] => [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      fixed: 'left',
    }, {
      dataIndex: 'name',
      title: '名称',
    }, {
      dataIndex: 'status',
      title: '状态',
      filters: [
        { text: '启动', value: '1' },
        { text: '暂停', value: '0' }
      ],
      filterMultiple: false,
      render: (status: Item['status'], item) => {
        return (
          status == 1
            ? <>
              <Link>启动</Link>
              <Link onClick={() => setStatus(item, 0)}>
                <a><PauseCircleOutlined /></a>
              </Link>
            </>
            : status == 0
              ? <>
                <Link>暂停</Link>
                <Link onClick={() => setStatus(item, 1)}>
                  <a><PlayCircleOutlined /></a>
                </Link>
              </>
              : null
        )
      }
    }, {
      dataIndex: 'value',
      title: '值',
      sorter: true,
    }, {
      key: 'operate',
      dataIndex: 'id',
      title: '操作',
      fixed: 'right',
      width: 180,
      render: (id: Item['id'], item) => {
        return (
          <>
            <Link onClick={() => showInfo(item)}><a>查看</a></Link>
            <Link>|</Link>
            <Link onClick={() => editInfo(item)}><a>编辑</a></Link>
            <Link>|</Link>
            <Link comfirm="删除后不可恢复，确定要删除吗?"
              onClick={() => deleteItem(item)}
            ><a>删除</a></Link>
          </>
        )
      }
    }
  ], [])

  useEffect(() => {
    initPage()
  }, [])

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}
        items={[
          { title: '组件' },
          { title: '表格' },
        ]}
      />
      <Card className={styles.card}>
        <div className={styles.line}>
          <Input.Search className={styles.search}
            placeholder="名称"
            enterButton
            onSearch={searchTable}
          />
        </div>
        <div className={styles.line}>
          <Button type="primary" onClick={addInfo}><PlusOutlined />添加</Button>
        </div>
        <Table className={styles.table} rowKey="id" bordered
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            total,
            current,
            pageSize
          }}
          onChange={changeTable}
          filter={filters}
          field={field}
          order={order}
          sticky
        />
      </Card>
      <TableInfoModal
        show={infoShow}
        data={infoData}
        onCancel={closeInfo}
        onSubmit={submitInfo}
      />
    </>
  )
})

export default Home
