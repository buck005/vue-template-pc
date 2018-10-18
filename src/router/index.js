//路由配置页
import Vue from 'vue'
import Router from 'vue-router'

//首页
const Home =()=>import("components/home/home.vue");
//登录页
const Login =()=>import("components/login/login.vue");
// 模块A
import limitManagement from './limitManagement';


Vue.use(Router)

var routes = [
  ...limitManagement,
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isLogin: 'true' }
  }
]

//配置路由导出
export default new Router({
  mode:"history",
  routes: routes
});

