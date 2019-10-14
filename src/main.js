import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import {jumpTo,isWx} from './units/global';
Vue.prototype.jumpTo = jumpTo
Vue.prototype.isWx = isWx
Vue.config.productionTip = false

import animate from 'animate.css'
Vue.use(animate)

import jquery from 'jquery'
Vue.prototype.JQ = jquery

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
