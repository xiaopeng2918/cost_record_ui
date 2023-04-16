import axios from 'axios'
import { Toast } from 'zarm'
import { baseUrl } from '@/config'
// MODE 是一个环境变量，通过 Vite 构建的项目中，环境变量在项目中，可以通过 import.meta.env.MODE 获取
const MODE = import.meta.env.MODE

axios.defaults.baseURL = baseUrl

//表示 Axios 库在发出跨域请求时会携带 Cookies 和其他认证信息。在默认情况下，浏览器在发送跨域请求时不会携带 Cookies 和其他认证信息，这是出于安全考虑。但在某些情况下，我们可能需要在跨域请求中携带 Cookies 和其他认证信息，以便服务器能够识别当前用户身份。使用 axios.defaults.withCredentials = true 可以在 Axios 库中启用跨域请求的认证信息携带。当您在发送跨域请求时需要携带 Cookies 和其他认证信息时，只需设置 withCredentials 选项为 true 即可
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端错误')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if (res.data.msg) Toast.show(res.data.msg)
    if (res.data.code == 401) {
      // 401为token 不存在 或者过期的情况
      window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }
  return res.data
})

export default axios

