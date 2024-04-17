import axios, { AxiosRequestConfig } from 'axios'
import { apiClientBaseUrl } from '../config/url'

const axiosClient = axios.create({
    baseURL: apiClientBaseUrl,
})

export const apiClient = {
    get: (route: string, config?: AxiosRequestConfig<any>) => axiosClient.get(route, config),

    post: (route: string, data: any, config?: AxiosRequestConfig<any>) => axiosClient.post(route, data, config),

    put: (route: string, data: any, config?: AxiosRequestConfig<any>) => axiosClient.put(route, data, config),

    patch: (route: string, data: any, config?: AxiosRequestConfig<any>) => axiosClient.patch(route, data, config),

    delete: (route: string, config?: AxiosRequestConfig<any>) => axiosClient.delete(route, config),
}
