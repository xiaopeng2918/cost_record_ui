import { List, Input, Button, Toast } from 'zarm'
import Header from '@/components/Header'
import { post } from '@/utils'
import { object, string } from 'yup'

import s from './style.module.less'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newPass2, setNewPass2] = useState('')
  const  navigateTo= useNavigate()
  const postObjSchema = object({
    old_pass: string().required('请输入原密码'),
    new_pass: string().required('请输入新密码'),
    new_pass2: string().required('请确认新密码')
  })

  // 提交修改方法
  const submit = async () => {
    try {
      await postObjSchema.validate(
        {
          old_pass: oldPass,
          new_pass: newPass,
          new_pass2: newPass2
        },
        { abortEarly: false }
      )
      if (newPass !== newPass2) {
        Toast.show('新密码不一致')
        return
      }
      // 验证通过，可以提交表单数据到服务器
      const result = await post('/user/modify_pass', {
        old_pass: oldPass,
        new_pass: newPass,
        new_pass2: newPass2
      })
      console.log(result)
      Toast.show('密码修改成功')
      navigateTo('/user')
    } catch (err) {
      // 验证失败，提示错误信息
      if ((err as any).name === 'ValidationError') {
        const errors = (err as any).errors.join('，')
        Toast.show(errors)
      } else {
        Toast.show('密码修改失败，请重试')
      }
    }
  }

  return (
    <>
      <Header title="重制密码" />
      <div className={s.account}>
        <div className={s.form}>
          <List>
            <List.Item title="原密码">
              <Input
                clearable
                type="text"
                placeholder="请输入原密码"
                value={oldPass}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setOldPass(e.target.value)
                }}
              />
            </List.Item>
            <List.Item title="新密码">
              <Input
                clearable
                type="text"
                placeholder="请输入新密码"
                value={newPass}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewPass(e.target.value)
                }}
              />
            </List.Item>
            <List.Item title="确认密码">
              <Input
                clearable
                type="text"
                placeholder="请再此输入新密码确认"
                value={newPass2}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewPass2(e.target.value)
                }}
              />
            </List.Item>
          </List>
        </div>
        <Button className={s.btn} block theme="primary" onClick={submit}>
          提交
        </Button>
      </div>
    </>
  )
}

export default Account
