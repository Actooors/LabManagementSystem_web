import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login'
import Student from 'group/student'
import NewsPage from 'components/newsPage/newsPage'
import MainPage from 'components/mainPage/mainPage'
import contactUsPage from  'components/contactUsPage/contactUsPage'
import Notifiations from 'components/notifications/notifications'
import Error404 from 'components/error/error404'
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
        path: 'news',//动态路由匹配
        redirect: 'news/labnews'
      }, {
        path: 'news/:subpath',//动态路由匹配
        name: 'newsPage',
        component: NewsPage
      },{
        path: 'contactus',
        name: 'contactUsPage',
        component: contactUsPage
      }, {
        path: 'notifications',
        name: 'notifications',
        component:Notifiations
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'error404',
      component: Error404
    }
  ]
})
