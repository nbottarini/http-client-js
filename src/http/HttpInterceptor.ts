import { HttpRequest } from './HttpRequest'
import { HttpResponse } from './HttpResponse'

export interface HttpInterceptor {
    onRequest?(request: HttpRequest): Promise<void>
    onResponse?(response: HttpResponse<any>): Promise<void>
    onError?(error: Error): Error
}
