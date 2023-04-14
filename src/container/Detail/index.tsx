import Header from '@/components/Header'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'query-string'
import dayjs from 'dayjs'
import { get, typeMap, post } from '@/utils'
import cx from 'classnames'
import { IconOrigin } from '@/components/CustomIcon'
import { BillType } from '@/typings/global'
import { Modal, Toast } from 'zarm'
import PopupAddBill from '@/components/PopupAddBIll'
import { PopupEditRef } from '@/typings/global'

import s from './style.module.less'
const Detail = () => {
  const location = useLocation() // 获取 locaton 实例，我们可以通过打印查看内部都有些什么内容。
  const { id } = qs.parse(location.search)
  const navigateTo = useNavigate()
  const [detail, setDetail] = useState<BillType>() // 订单详情数据
  const editRef = useRef<PopupEditRef>()

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    const { data } = await get(`/bill/detail?id=${id}`)
    setDetail(data)
  }
  // 删除账单
  const deleteDetail = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除账单？',
      onConfirm: async () => {
        const { data } = await post('/bill/delete', { id })
        Toast.show('删除成功')
        navigateTo(-1)
      }
    })
  }
  return (
    <div className={s.detail}>
      <Header title="账单详情" />
      <div className={s.card}>
        <div className={s.type}>
          {/* 通过 pay_type 属性，判断是收入或指出，给出不同的颜色*/}
          <span className={cx({ [s.expense]: detail?.pay_type == 1, [s.income]: detail?.pay_type == 2 })}>
            {/* typeMap 是我们事先约定好的 icon 列表 */}
            <IconOrigin className={s.iconfont} type={detail?.type_id ? typeMap[detail.type_id].icon : 'canyin'} />
          </span>
          <span>{detail?.type_name || ''}</span>
        </div>
        {detail?.pay_type == 1 ? (
          <div className={cx(s.amount, s.expense)}>-{detail?.amount}</div>
        ) : (
          <div className={cx(s.amount, s.incom)}>+{detail?.amount}</div>
        )}
        <div className={s.info}>
          <div className={s.time}>
            <span>记录时间</span>
            <span>{dayjs(dayjs((dayjs(detail?.date) as any).$d).valueOf()).format('YYYY-MM-DD HH:mm')}</span>
          </div>
          <div className={s.remark}>
            <span>备注</span>
            <span>{detail?.remark || '-'}</span>
          </div>
        </div>
        <div className={s.operation}>
          <span onClick={deleteDetail}>
            <IconOrigin type="shanchu" />
            删除
          </span>
          <span onClick={() => editRef.current && editRef.current.show()}>
            <IconOrigin type="tianjia" />
            编辑
          </span>
        </div>
      </div>
      <PopupAddBill ref={editRef} detail={detail} onReload={getDetail} />
    </div>
  )
}

export default Detail
