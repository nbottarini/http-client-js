import { HttpInterceptor } from '../http/HttpInterceptor'
import { HttpError } from '../errors/HttpError'
import { NetworkError } from '../errors/NetworkError'
import { HttpRequest } from '../http/HttpRequest'

export class NetworkErrorInterceptor implements HttpInterceptor {
    onError?(error: Error, request: HttpRequest): Error {
        if (!(error instanceof HttpError) || !this.isNetworkError(error)) return error
        return new NetworkError(request, error.response)
    }

    private isNetworkError(error: HttpError) {
        return error.innerError.message === 'Network Error' || [502, 503, 504].includes(error.status)
    }
}
