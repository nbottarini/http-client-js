import axios, { AxiosAdapter, AxiosError, AxiosInstance, Method, ResponseType } from 'axios'
import { ResponseFactory } from './ResponseFactory'
import {
    HttpClient,
    HttpError,
    HttpInterceptor,
    HttpMethods,
    HttpRequest,
    HttpResponse,
    NetworkError,
    NetworkErrorInterceptor,
    RequestOptions,
    ResponseBodyConversions,
    UrlHelper,
} from '@nbottarini/abstract-http-client'

export class AxiosHttpClient implements HttpClient {
    private readonly http: AxiosInstance
    private readonly baseUrl: string
    private readonly responseFactory = new ResponseFactory()
    private interceptors: HttpInterceptor[] = []
    private errorInterceptors: HttpInterceptor[] = [
        new NetworkErrorInterceptor(),
    ]

    constructor(baseUrl: string | undefined = undefined, axiosAdapter: AxiosAdapter | undefined = axios.defaults.adapter) {
        this.baseUrl = baseUrl
        this.http = axios.create({
            baseURL: baseUrl,
            adapter: axiosAdapter,
            withCredentials: true,
        })
    }

    async get<T = any>(url: string, headers: Record<string, string> = {}, options?: RequestOptions): Promise<HttpResponse<T>> {
        return this.send<T>(this.request(HttpMethods.GET, url, null, headers, options))
    }

    async post<T = any>(url: string, data: any = null, headers: Record<string, string> = {}, options?: RequestOptions): Promise<HttpResponse<T>> {
        return this.send<T>(this.request(HttpMethods.POST, url, data, headers, options))
    }

    async put<T = any>(url: string, data: any = null, headers: Record<string, string> = {}, options?: RequestOptions): Promise<HttpResponse<T>> {
        return this.send<T>(this.request(HttpMethods.PUT, url, data, headers, options))
    }

    async delete<T = any>(url: string, headers: Record<string, string> = {}, options?: RequestOptions): Promise<HttpResponse<T>> {
        return this.send<T>(this.request(HttpMethods.DELETE, url, null, headers, options))
    }

    async patch<T = any>(url: string, data: any = null, headers: Record<string, string> = {}, options?: RequestOptions): Promise<HttpResponse<T>> {
        return this.send<T>(this.request(HttpMethods.PATCH, url, data, headers, options))
    }

    async head<T = any>(url: string, headers: Record<string, string> = {}, options?: RequestOptions): Promise<HttpResponse<T>> {
        return this.send<T>(this.request(HttpMethods.HEAD, url, null, headers, options))
    }

    private request(method: HttpMethods, url: string, body: any = null, headers: Record<string, string> = {}, options?: RequestOptions): HttpRequest {
        return new HttpRequest(method, url, body, headers, options)
    }

    async send<T = any>(request: HttpRequest): Promise<HttpResponse<T>> {
        try {
            await this.interceptRequest(request)
            const axiosResponse = await this.http.request({
                url: request.url,
                data: request.body,
                method: request.method as Method,
                headers: request.headers,
                baseURL: this.baseUrl,
                onUploadProgress: this.progressHandler(request.options.onUploadProgress),
                responseType: this.responseBodyConversionToResponseType(request.options.responseBodyConversion)
            })
            const response = this.responseFactory.create<T>(axiosResponse, request)
            await this.interceptResponse(response)
            return response
        } catch (e: any) {
            throw this.handleError(e, request)
        }
    }

    private progressHandler(onProgress?: (progress: number) => void) {
        if (!onProgress) return undefined
        return (progressEvent) => {
            const percent = Math.min((progressEvent.loaded * 100) / progressEvent.total, 100)
            onProgress(percent)
        }
    }

    private async interceptRequest(request: HttpRequest) {
        for (let interceptor of this.interceptors) {
            if (!interceptor.onRequest) continue
            await interceptor.onRequest(request)
        }
    }

    private async interceptResponse(response: HttpResponse<any>) {
        for (let interceptor of this.interceptors) {
            if (!interceptor.onResponse) continue
            await interceptor.onResponse(response)
        }
    }

    addInterceptor(interceptor: HttpInterceptor) {
        this.interceptors.push(interceptor)
        if (interceptor.onError) {
            this.errorInterceptors.push(interceptor)
        }
    }

    private handleError(e: AxiosError, request: HttpRequest): Error {
        let error: Error = this.createHttpError(e, request, this.baseUrl)
        for (let interceptor of this.errorInterceptors) {
            error = interceptor.onError!(error, request)
        }
        return error
    }

    private createHttpError(error: AxiosError, request: HttpRequest, baseUrl: string | undefined): HttpError {
        if (error.code == 'ECONNREFUSED') return this.createNetworkError(error, request, baseUrl)
        const urlHelper = new UrlHelper(baseUrl, request.url)
        const response: HttpResponse<any> = {
            method: request.method,
            status: error.response?.status ?? 0,
            statusText: error.response?.statusText ?? '',
            url: urlHelper.absoluteUrl,
            headers: error.response?.headers ?? {},
            body: error.response?.data,
            request,
        }
        return new HttpError(request, response, error)
    }

    private createNetworkError(error: AxiosError, request: HttpRequest, baseUrl: string|undefined) {
        const urlHelper = new UrlHelper(baseUrl, request.url)
        const response: HttpResponse<any> = {
            method: request.method,
            status: 0,
            statusText: 'ECONNREFUSED',
            url: urlHelper.absoluteUrl,
            headers: error.response?.headers ?? {},
            body: error.response?.data,
            request,
        }
        return new NetworkError(request, response, error)
    }

    private responseBodyConversionToResponseType(responseBodyConversion: ResponseBodyConversions): ResponseType {
        switch (responseBodyConversion) {
            case ResponseBodyConversions.Json: return 'json'
            case ResponseBodyConversions.Stream: return 'stream'
            case ResponseBodyConversions.ArrayBuffer: return 'arraybuffer'
            default: throw new Error(`Unsupported response body conversion: ${responseBodyConversion}`)
        }
    }
}
