// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import FastClick from 'fastclick'
import 'normalize.css'
import VueLazyload from 'vue-lazyload'
import $ from "jquery"
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
})
// Vue.use(Bootstrap);
Vue.use(Element)
Vue.config.productionTip = false


FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
