import { HttpResponse } from './HttpResponse'
import { HttpInterceptor } from './HttpInterceptor'
import { HttpRequest } from './HttpRequest'

export type OnProgress = (progress: number) => void

export interface HttpClient {
    get<T = any>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;

    post<T = any>(url: string, body: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;

    put<T = any>(url: string, body: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;

    patch<T = any>(url: string, body: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;

    delete<T = any>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;

    head<T = any>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;

    send<T = any>(request: HttpRequest, onProgress?: OnProgress): Promise<HttpResponse<T>>;

    addInterceptor(interceptor: HttpInterceptor);
}
