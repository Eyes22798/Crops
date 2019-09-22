const BASE_URL = 'http://loachost:9001/farm'
const TEST_URL = 'http://yapi.demo.qunar.com/mock/94110/farm'

// console.log(process.env.NODE_ENV)
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

export default {
  // 基础url前缀
  baseURL: URL,
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  // 设置超时时间
  timeout: 10000,
  // 返回数据类型
  responseType: 'json',
  withCredentials: true // 是否允许带cookie这些
}
