import classnames from 'classnames'
import styles from './style.less'
import { ContainerPage } from '../../interface'
import { useSelector } from 'react-redux'
import {
  initPage,
} from '../../flow/action'
import { useRoutes } from 'react-router-dom'

const Page: FC<ContainerPage.Props> = memo((props) => {
  const { config } = props

  const role = 1

  useEffect(() => {
    initPage()
  }, [])

  const routeConfig = useMemo(() => {
    const func = (list: typeof config, role: number) => {
      const result: any[] = []
      for (const item of list) {
        const { path, element, children, roles } = item
        if (!roles || roles.includes(role)) {
          result.push({
            path,
            element,
            children: func(children || [], role),
          })
        }
      }
      return result.length ? result : undefined
    }
    return role && func(config, role)
  }, [role])

  const node = useRoutes(routeConfig || [])

  return (
    <>
      <React.Suspense fallback={null}>{node}</React.Suspense>
    </>
  )
})

export default Page
