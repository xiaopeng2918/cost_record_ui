import { createBrowserRouter } from 'react-router-dom'
import Home from '@/container/Home'
import User from '@/container/User'
import Data from '@/container/Data'
import NavBar from '@/components/NavBar'
import Detail from '@/container/Detail'
import Login from '@/container/Login'
const routes = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/data',
        element: <Data />
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path: '/detail',
        element: <Detail />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default routes
