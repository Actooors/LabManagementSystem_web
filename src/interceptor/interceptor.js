import axios from 'axios'

axios.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
