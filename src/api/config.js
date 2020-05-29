// bug
const BASE_URL = '/farm'
const TEST_URL = '/farm'

// console.log(process.env.NODE_ENV)
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

export default {
  // 基础url前缀
  baseURL: URL,
  // 设置超时时间
  timeout: 5000,
  // 返回数据类型
  responseType: 'json',
  withCredentials: true // 是否允许带cookie这些
}
