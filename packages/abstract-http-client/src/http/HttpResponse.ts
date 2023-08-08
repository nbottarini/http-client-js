import { HttpMethods } from './HttpMethods'
import { HttpRequest } from './HttpRequest'

export interface HttpResponse<T> {
    method: HttpMethods
    status: number
    statusText: string
    url: string
    headers: Record<string, string>
    body: T
    request: HttpRequest
}
