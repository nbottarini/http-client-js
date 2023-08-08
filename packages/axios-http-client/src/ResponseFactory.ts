import { AxiosResponse } from 'axios'
import { HttpRequest, HttpResponse, UrlHelper } from '@nbottarini/abstract-http-client'

export class ResponseFactory {
    create<T = any>(axiosResponse: AxiosResponse, request: HttpRequest): HttpResponse<T> {
        const urlHelper = new UrlHelper(axiosResponse.config.baseURL, axiosResponse.config.url)
        return {
            method: request.method,
            status: axiosResponse.status,
            statusText: axiosResponse.statusText,
            url: urlHelper.absoluteUrl,
            headers: axiosResponse.headers,
            body: axiosResponse.data,
            request,
        }
    }
}
