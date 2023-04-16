import { Navigate, createBrowserRouter } from 'react-router-dom'
import Home from '@/container/Home'
import User from '@/container/User'
import Data from '@/container/Data'
import NavBar from '@/components/NavBar'
import Detail from '@/container/Detail'
import Login from '@/container/Login'
import UserInfo from '@/container/UserInfo'
import Account from '@/container/Account'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        index: true,
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
  },
  {
    path: '/userinfo',
    element: <UserInfo />
  },
  {
    path: '/account',
    element: <Account />
  }
])

export default routes