import Home from '@/views/home/Home.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'

const COMMON_ROUTER = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '主页',
    requireAuth: false
  },
  // 跳默认路由用redirect
  component: Home
},
{
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录',
    requireAuth: false
  },
  component: Login
},
{
  path: '/register',
  name: 'Register',
  meta: {
    title: '注册',
    requireAuth: false
  },
  component: Register
}
]

export default COMMON_ROUTER
