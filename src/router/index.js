import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login'
import Student from 'group/student'
import NewsPage from 'components/newsPage/newsPage'
import MainPage from 'components/mainPage/mainPage'
import contactUsPage from 'components/contactUsPage/contactUsPage'
import Notifiations from 'components/notifications/notifications'
import Error404 from 'components/error/error404'
import NewsOverview from 'components/newsPage/newsOverview'
import NewsContent from 'components/newsPage/newsContent'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Login,
      meta: {
        title: "登录 - 上海大学视觉实验室"
      }
    },
    {
      path: '/student',
      component: Student,
      children: [{
        path: '',
        redirect: {name: 'index'},
      },
        {
          path: 'index',
          name: 'mainPage',
          component: MainPage,
        },
        {
          path: 'news',//动态路由匹配
          component: NewsPage,
          meta: {
            title: "新闻 - 上海大学视觉实验室"
          },
          children: [{
            path: '',
            redirect: {path: 'labnews'}
          },
            {
              path: ':newstype',
              name: 'newsPage',
              component: NewsOverview
            },
            {
              path: ':newstype/:newsid',
              name: 'newsContent',
              component: NewsContent
            }]
        },
        {
          path: 'contactus',
          name: 'contactUsPage',
          component: contactUsPage
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: Notifiations
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

router.beforeEach((to, from, next) => {
  let defaultTitle = "上海大学视觉实验室"
  let customTitle = false
  for (let i = to.matched.length - 1; i >= 0; i--) {
    if (to.matched[i].meta.hasOwnProperty('title')) {
      document.title = to.matched[i].meta.title
      customTitle = true
      break
    }
  }
  if (!customTitle) {
    document.title = defaultTitle
  }
  next()
})

export default router;
