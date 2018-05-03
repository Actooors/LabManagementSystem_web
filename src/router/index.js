import Vue from 'vue'
import Router from 'vue-router'
import Login from 'group/login'
import Student from 'group/student'
import NewsPage from 'components/newsPage/newsPage'
import MainPage from 'components/mainPage/mainPage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Login
    },
    {
      path: '/student',
      component: Student,
      children: [{
        path: '',
        redirect: {name: 'index'},
      }, {
        path: 'index',
        name: 'mainPage',
        component: MainPage
      }, {
        path: 'news',
        name: 'newsPage',
        component: NewsPage
      }]
    }
  ]
})
