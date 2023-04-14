import { useNavigate } from 'react-router-dom'
import { NavBar } from 'zarm'
import { MyIcon } from '../CustomIcon'
import s from './style.module.less'

const Header = ({ title = '' }) => {
  const navigateTo = useNavigate()
  return (
    <div className={s.headerWarp}>
      <div className={s.block}>
        <NavBar
          className={s.header}
          left={<MyIcon type="icon-arrow-left-bold" theme="primary" onClick={() => navigateTo(-1)} />}
          title={title}
        />
      </div>
    </div>
  )
}

export default Header
