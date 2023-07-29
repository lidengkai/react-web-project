import { createRoot } from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import history from '@/history'
import App from './view/App'
import 'antd/dist/reset.css'
import '@/lib/index.less'
import { ROUTE } from '@/lib/config'

console.log('%c当前环境:' + process.env.NODE_ENV, 'background-color: yellow;', {
  $APP_NAME: $APP_NAME,
  $APP_VERSION: $APP_VERSION,
  $APP_MODE: $APP_MODE,
  $APP_ENV: $APP_ENV,
})

const render = (dom: HTMLElement) => {
  createRoot(dom).render(
    <ConfigProvider locale={zhCN}>
      <HistoryRouter history={history as any}>
        <Routes>
          <Route path={ROUTE.LOGIN} element={null} />
          <Route path="*" element={<App />} />
        </Routes>
      </HistoryRouter>
    </ConfigProvider>
  )
}

if (process.env.NODE_ENV === 'development') {
  render(document.getElementById('web-project')!)
}
