import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  withCredentials: true,
})

// request interceptor
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// response interceptor
instance.interceptors.response.use(
  response => {
    const res = response.data

    // 如果自定义code不为0，则将其判断为错误。
    if (res.code !== undefined && res.code !== 0) {
      // TODO

      // 50008: 非法的token; 50012: 其他客户端登录了; 50014: Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // TODO
      }
      return Promise.reject(new Error(res.message || 'System Error'))
    }

    return res
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = '/login'
      }

      if (error.response.status === 403) {
        window.location.href = '/403'
      }
    }

    return Promise.reject(error)
  },
)

export default instance
