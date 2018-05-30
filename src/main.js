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
import 'iview/dist/styles/iview.css'
import 'interceptor/interceptor'

// quillEditor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  error: '/static/images/defaultAvatar.jpg'
})
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
