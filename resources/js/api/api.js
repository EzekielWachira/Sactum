import axios from 'axios'

let BaseApi = axios.create({
    baseURL: 'http://localhost:8000/api'
})

let Api = () => {
    let token = localStorage.getItem('token')
    if(token){
        BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return BaseApi;
}

// Api.defaults.withCredentials = true;

export default Api