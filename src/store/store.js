import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultTitle: '上海大学机器视觉实验室',
    newsMap: {labnews: '实验室动态', academic: '学界重要新闻', others: '其他新闻'}
  }
})
