import Vue from 'vue'
import Router from 'vue-router'
import Login from 'group/login'
import Student from 'group/student'
import NewsPage from 'components/newsPage/newsPage'

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
        name: 'index',
        component: NewsPage
      }, {
        path: 'news',
        name: 'newsPage',
        component: NewsPage
      }]
    }
  ]
})
