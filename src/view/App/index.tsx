import classnames from 'classnames'
import styles from './style.less'
import { Props, ContainerPage } from './interface'
import { Provider } from 'react-redux'
import store from '@/store'
import Page from './containers/Page'
import Wrapper from './containers/Wrapper'
import { SettingOutlined, TableOutlined } from '@ant-design/icons'
import { BASE_ROUTE } from '@/config'

const ComponentTable = React.lazy(() => import('@/view/Component/Table'))

export const route: ContainerPage.Props['config'] = [
  {
    path: `${BASE_ROUTE}/component`,
    menu: '组件',
    icon: <SettingOutlined />,
    element: <Wrapper />,
    children: [
      {
        path: 'table',
        element: <ComponentTable />,
        menu: '表格',
        icon: <TableOutlined />,
      },
    ]
  }
]

const App: FC<Props> = memo(() => {
  return (
    <Page config={route} />
  )
})

export default App
