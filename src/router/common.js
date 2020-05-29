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
  path: '/plant',
  name: 'Plant',
  meta: {
    title: '作物检索',
    requireAuth: true
  },
  component: () => import(/* webpackChunkName: "UserInfo" */ '@/views/search/plant/Plant.vue')
},
{
  path: '/enemy',
  name: 'Enemy',
  meta: {
    title: '天敌检索',
    requireAuth: true
  },
  component: () => import(/* webpackChunkName: "UserInfo" */ '@/views/search/enemy/Enemy.vue')
},
{
  path: '/disease',
  name: 'Disease',
  meta: {
    title: '胁迫检索',
    requireAuth: true
  },
  component: () => import(/* webpackChunkName: "UserInfo" */ '@/views/search/disease/Disease.vue')
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
},
{
  path: '/message',
  name: 'message',
  meta: {
    title: '资讯',
    requireAuth: false
  },
  component: () => import(/* webpackChunkName: "500" */ '@/views/message/Message.vue')
}
]

export default COMMON_ROUTER
