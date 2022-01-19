import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000/'
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
})