import { RouterProvider } from 'react-router-dom'
import routes from './router/index'

import { ConfigProvider } from 'zarm'
function App() {
  return (
    <>
      <ConfigProvider primaryColor={'#007fff'}>
        <RouterProvider router={routes}></RouterProvider>
      </ConfigProvider>
    </>
  )
}

export default App
