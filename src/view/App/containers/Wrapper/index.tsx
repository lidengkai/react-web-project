import classnames from 'classnames'
import styles from './style.less'
import { ContainerWrapper } from '../../interface'
import { Provider } from 'react-redux'
import store from '@/store'
import { Outlet } from 'react-router-dom'

const Wrapper: FC<ContainerWrapper.Props> = memo((props) => {
  const { userInfo } = props

  console.log('!!!!', userInfo)

  return (
    <>
      <Provider store={store}><Outlet /></Provider>
    </>
  )
})

export default Wrapper
