const COMMON_ROUTER = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '主页',
    requireAuth: false
  },
  // 跳默认路由用redirect
  component: () => import(/* webpackChunkName: "Home" */ '@/views/home/Home.vue')
},
{
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录',
    requireAuth: false
  },
  component: () => import(/* webpackChunkName: "Login" */ '@/views/login/Login.vue')
},
{
  path: '/register',
  name: 'Register',
  meta: {
    title: '注册',
    requireAuth: false
  },
  component: () => import(/* webpackChunkName: "Register" */ '@/views/register/Register.vue')
},
{
  path: '/userInfo',
  name: 'UserInfo',
  meta: {
    title: '我的主页',
    requireAuth: true
  },
  component: () => import(/* webpackChunkName: "UserInfo" */ '@/views/user/userInfo/UserInfo.vue')
},
{
  path: '/404',
  name: '404',
  meta: {
    title: '404',
    requireAuth: false
  },
  component: () => import(/* webpackChunkName: "404" */ '@/views/error/404/404.vue')
},
{
  path: '/500',
  name: '500',
  meta: {
    title: '500',
    requireAuth: false
  },
  component: () => import(/* webpackChunkName: "500" */ '@/views/error/500/500.vue')
}
]

export default COMMON_ROUTER
