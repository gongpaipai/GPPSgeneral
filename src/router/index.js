import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const  router = new Router({
  scrollBehavior: () => ({ // 滚动条滚动的行为，不加默认就会记忆原来滚动条的位置
    y: 0
  }),
  routes:[
    {
      path: '*',
      redirect:'/'
    },
    {path: '/login',name: 'login',title: '登录',component: () => import('../pages/login.vue')},
    {path: '/',name: 'protal',title: '系统首页',component: () => import('../pages/protal.vue')},
    {path: '/FactoryManager',name: 'FactoryManager',title: '工厂管理',component: () => import('../pages/FactoryManager.vue')},
    {path: '/addFactory',name: 'addFactory',title: '新增工厂',component: () => import('../pages/addFactory.vue')},
    {path: '/editFactory',name: 'editFactory',title: '编辑工厂',component: () => import('../pages/editFactory.vue')},
    {path: '/Batchimport',name: 'Batchimport',title: '导入工厂',component: () => import('../pages/Batchimport.vue')},
    {path: '/factoryDetails',name: 'factoryDetails',title: '工厂详情',component: () => import('../pages/factoryDetails.vue')},
    {path: '/UserManager',name: 'UserManager',title: '用户管理',component: () => import('../pages/UserManager.vue')},
    {path: '/userDetails',name: 'userDetails',title: '用户详情',component: () => import('../pages/userDetails.vue')},
    {path: '/SystermManager',name: 'SystermManager',title: '系统管理',component: () => import('../pages/SystermManager.vue')},
  ]
})
router.beforeEach((to, from, next) => {
  var userInfo = window.localStorage.getItem('TOKEN');
  if(userInfo){
    next()
  } else {
    if(to.path == '/login'){
      next()
    } else {
      next('/login')
    }
  }
})
export default router
