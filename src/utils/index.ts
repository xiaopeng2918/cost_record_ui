import { baseUrl } from '@/config'
import axios from './axios'
import { TypeMap } from '@/typings/global'
const MODE = import.meta.env.MODE

export const get = axios.get

export const post = axios.post
// 消费类别标签类型
export const typeMap: TypeMap = {
  1: {
    icon: 'canyin'
  },
  2: {
    icon: 'fushi'
  },
  3: {
    icon: 'jiaotong'
  },
  4: {
    icon: 'riyong'
  },
  5: {
    icon: 'gouwu'
  },
  6: {
    icon: 'xuexi'
  },
  7: {
    icon: 'yiliao'
  },
  8: {
    icon: 'lvxing'
  },
  9: {
    icon: 'renqing'
  },
  10: {
    icon: 'qita'
  },
  11: {
    icon: 'gongzi'
  },
  12: {
    icon: 'jiangjin'
  },
  13: {
    icon: 'zhuanzhang'
  },
  14: {
    icon: 'licai'
  },
  15: {
    icon: 'tuikuang'
  },
  16: {
    icon: 'qita'
  }
}
// 下拉 刷新
export const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5 // 加载失败
}

export const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5 // 加载完成（无新数据）
}

// 图面路径处理
export const imgUrltrans = (url: string) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `${MODE == 'development' ? 'http:\\\\127.0.0.1:7001' : baseUrl}${url}`
    return url
  }
}
