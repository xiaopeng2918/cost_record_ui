
import { Button } from 'zarm'
import s from './style.module.less'
// 移动端适配
import 'lib-flexible/flexible'
function Index() {
  return (
    <>
      <div className={s.index}>
        <span>样式</span>
      </div>
      <Button theme="primary">哈哈</Button>
    </>
  )
}

export default Index
