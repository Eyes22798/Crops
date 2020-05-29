const ORDINARY_ROUTER = [
  {
    path: '/userQuestion',
    name: 'UserQuestion',
    meta: {
      title: '我的咨询',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "UserQuestion" */ '@/views/user/UserQuestion/UserQuestion.vue')
  },
  {
    path: '/expertQuestion',
    name: 'ExpertQuestion',
    meta: {
      title: '我的咨询',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "ExpertQuestion" */ '@/views/user/ExpertQuestion/ExpertQuestion.vue')
  },
  {
    path: '/question',
    name: 'Question',
    meta: {
      title: '咨询',
      requireAuth: false
    },
    component: () => import(/* webpackChunkName: "Question" */ '@/views/question/Question.vue')
  }
]

export default ORDINARY_ROUTER
