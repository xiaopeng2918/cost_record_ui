import { useEffect, useState } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { TabBar } from 'zarm'
import s from './style.module.less'
import {IconOrigin} from '../CustomIcon'

function NavBar() {
  const [activeKey, setActiveKey] = useState('/')
  const navigateTo = useNavigate()
  // onChange 实现路由跳转 和 active动态添加
  const changeTab = (path: string | number) => {
    navigateTo(path as string)
    setActiveKey(path as string)
  }
  // 获取当前页面路由信息
  const location = useLocation()
  const { pathname } = location
  const needNav = ['/', '/data', '/user']
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
    setActiveKey(location.pathname)
  }, [pathname])

  return (
    <>
      <Outlet />
      <TabBar activeKey={activeKey} onChange={changeTab} className={`${s.tabbar} ${showNav ? '' : s.hide_tabbar}`}>
        <TabBar.Item itemKey="/" title="账单" icon={<IconOrigin type="zhangdan" />} />
        <TabBar.Item itemKey="/data" title="数据" icon={<IconOrigin type="tongji" />} />
        <TabBar.Item itemKey="/user" title="我的" icon={<IconOrigin type="wode" />} />
      </TabBar>
    </>
  )
}

export default NavBar
