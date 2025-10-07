import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL : "http://localhost:3000/api" ,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})


