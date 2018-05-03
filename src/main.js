// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
=======
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import FastClick from 'fastclick'
import 'normalize.css'
import VueLazyload from 'vue-lazyload'
>>>>>>> d3b93b6aa3f8ff927e280e11acae8978bc037d92

Vue.use(VueLazyload)

Vue.use(Element)
Vue.config.productionTip = false
Vue.use(ElementUI)

FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
