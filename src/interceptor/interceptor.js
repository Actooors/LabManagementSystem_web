import axios from 'axios'
import store from 'store/store'

axios.interceptors.request.use((config) => {
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
  store.commit('changeLoading', false)
  return res
}, (err) => {
  store.commit('changeLoading', false)
  return Promise.reject(err)
})
