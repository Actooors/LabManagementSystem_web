import axios from 'axios'
import store from 'store/store'

axios.interceptors.request.use((config) => {
  let skipLoadingIcon = store.state.skipLoadingRoutes.some((x) => {
    //从右到左找，如果apiRootPath + x刚好是目前请求的url的后一部分，则说明是要跳过加载图标的
    return config.url.lastIndexOf(apiRootPath + x) === 0
  })
  if (!skipLoadingIcon)
    store.commit('changeLoading', true)
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  let skipLoadingIcon = store.state.skipLoadingRoutes.some((x) => {
    //从右到左找，如果apiRootPath + x刚好是目前请求的url的后一部分，则说明是要跳过加载图标的
    return res.config.url.lastIndexOf(apiRootPath + x) === 0
  })
  if (!skipLoadingIcon)
    store.commit('changeLoading', false)
  return res
}, (err) => {
  //没办法获取到url，只能照例直接commit了
  store.commit('changeLoading', false)
  return Promise.reject(err)
})
