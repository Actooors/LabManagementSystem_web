import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultTitle: '上海大学机器视觉实验室',
    newsMap: {labnews: '实验室动态', academic: '学界重要新闻', others: '其他新闻'},
    loading: 0,
    skipLoadingRoutes: ['topic/setTopicLiked', 'topic/setCommentLiked']
  },
  mutations: {
    changeLoading(state, opt) {
      //opt===true说明有不能跳过加载icon的请求过来，则loading记为++，否则--，但是不能减到0以下
      if (opt)
        state.loading++
      else if (state.loading > 0)
        state.loading--
    }
  }
})
