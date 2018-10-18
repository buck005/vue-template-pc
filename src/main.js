// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../static/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import './assets/css/common.css'
import {myCookie} from "@/utils/cookie";

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })
Vue.prototype.$myCookie=myCookie;//全局cookie方法

window.vm=new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
