import Vue from 'vue'
import Router from 'vue-router'
import store from 'store/store'
import Login from 'components/login/login'
import Student from 'group/student'
import NewsPage from 'components/newsPage/newsPage'
import MainPage from 'components/mainPage/mainPage'
import contactUsPage from 'components/contactUsPage/contactUsPage'
import Notifiations from 'components/notifications/notifications'
import Error404 from 'components/error/error404'
import NewsOverview from 'components/newsPage/newsOverview'
import NewsContent from 'components/newsPage/newsContent'
import Profile from 'components/profile/profile'
import MessagePage from 'components/messagePage/messagePage'
import NewNews from 'components/newNews/newNews'
import Topic from 'components/topic/topic'
import NewTopic from 'components/newTopic/newTopic'
import TopicContent from 'components/topicContent/topicContent'


Vue.use(Router)
let defaultTitle = store.state.defaultTitle

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      // component: Login,
      // meta: {
      //   title: `登录 - ${defaultTitle}`
      // }
      redirect: {name: 'mainPage'}
    },
    {
      path: '/index',
      name: 'mainPage',
      component: MainPage,
    },
    {
      path: '/news',//动态路由匹配
      component: NewsPage,
      meta: {
        title: `新闻 - ${defaultTitle}`
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
      path: '/newnews',
      name: 'newNews',
      component: NewNews
    },
    {
      path: '/contactus',
      name: 'contactUsPage',
      component: contactUsPage
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifiations
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }, {
      path: '/message',
      name: 'messagePage',
      component: MessagePage
    },
    {
      path: '/topic',
      name: 'topic',
      component: Topic
    }, {
      path: '/newtopic',
      name: 'newTopic',
      component: NewTopic
    }, {
      path: '/topic/:topicid',
      name: 'topicContent',
      component: TopicContent
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter(to, from, next) {
        //....
        next({name: 'login'})
      }
    },
    {
      path: '*',
      name: 'error404',
      component: Error404,
      meta: {
        title: 'Not found'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //自定义标题
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
