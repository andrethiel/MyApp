import axios from 'axios'

const api = axios.create({
    baseURL: 'http://10.41.4.60:300'
})

export default api