import { HttpInterceptor } from '../http/HttpInterceptor'
import { HttpError } from '../errors/HttpError'
import { AuthError } from '../errors/AuthError'

export class AuthErrorInterceptor implements HttpInterceptor {
    onError?(error: Error): Error {
        if (!(error instanceof HttpError) || !this.isAuthenticationError(error)) return error
        return new AuthError(error)
    }

    private isAuthenticationError(error: HttpError): boolean {
        return [401, 403].includes(error.status)
    }
}
