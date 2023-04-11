import { RouterProvider } from 'react-router-dom'
import routes from './router/index'

import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'
function App() {
  return (
    <>
      <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
        <RouterProvider router={routes}></RouterProvider>
      </ConfigProvider>
    </>
  )
}

export default App
