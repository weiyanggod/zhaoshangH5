import axios from 'axios'
import config from '@/config'

// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev:config.baseUrl.pro
const baseUrl = config.baseUrl.pro

class HttpRequest {
  //构造器
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  //请求路径设置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: 'town',
      },
    }
    return config
  }

  //添加拦截器
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config
      },
      function (error) {
        // 对请求错误做些什么
        // console.log('添加请求拦截器 请求错误')
        return Promise.reject(error)
      },
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        // console.log('添加请求拦截器 响应')
        return response
      },
      function (error) {
        // 对响应错误做点什么
        // console.log('添加请求拦截器 响应错误')
        return Promise.reject(error)
      },
    )
  }

  // 二次封装的请求
  request(options) {
    const instance = axios.create()
    // options = {...this.getInsideConfig(),...options}
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)
