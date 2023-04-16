import s from './style.module.less'
import { useState, useEffect } from 'react'
import { get } from '@/utils'
import { UserInfo } from '@/typings/global'
import { useNavigate } from 'react-router-dom'
import { List } from 'zarm'
import { MyIcon } from '@/components/CustomIcon'


const User = () => {
  const [user, setUser] = useState<UserInfo>()
  const [avatar, setAvatar] = useState()


  const navigateTo = useNavigate()

  useEffect(() => {
    getUserInfo()
  },[])

  const getUserInfo = async () => {
    const {data} = await get('/user/get_userinfo')
    setUser(data)
    setAvatar(data.avatar)
  }

  return (
    <div className={s.user}>
      <div className={s.head}>
        <div className={s.info}>
          <span>昵称：{user?.username || '--'}</span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: '-10px' }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
              alt=""
            />
            <b>{user?.signature || '暂无个性签名'}</b>
          </span>
        </div>
        <img className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={user?.avatar} alt="" />
      </div>
      <div className={s.content}>
        <List>
          <List.Item
            hasArrow
            title="用户信息修改"
            onClick={() => navigateTo('/userinfo')}
            prefix={<MyIcon type="icon-user_info-copy" />}
          />
          <List.Item
            hasArrow
            title="重制密码"
            onClick={() => navigateTo('/account')}
            prefix={<MyIcon type="icon-reset" />}
          />
          <List.Item
            hasArrow
            title="关于我们"
            onClick={() => navigateTo('/about')}
            prefix={<MyIcon type="icon-about" />}
          />
        </List>
      </div>
    </div>
  )
}

export default User
