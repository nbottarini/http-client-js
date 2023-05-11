import { HttpInterceptor } from '../http/HttpInterceptor'
import { HttpError } from '../errors/HttpError'
import { NetworkError } from 'src/errors/NetworkError'

export class NetworkErrorInterceptor implements HttpInterceptor {
    onError?(error: Error): Error {
        if (!(error instanceof HttpError) || !this.isNetworkError(error)) return error
        let message = error.method.toString() + ' ' + error.url
        return new NetworkError(message, error.status)
    }

    private isNetworkError(error: HttpError) {
        return error.innerError.message === 'Network Error' || [502, 503, 504].includes(error.status)
    }
}
