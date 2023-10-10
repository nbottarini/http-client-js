import { HttpError } from './HttpError'
import { HttpRequest } from '../http/HttpRequest'
import { HttpResponse } from '../http/HttpResponse'

export class NetworkError extends HttpError {
    constructor(
        request: HttpRequest,
        response: HttpResponse<any>|null,
        innerError: Error|null = null,
        message: string = `Network error: ${request.method} ${request.url}` + (response ? ` ${response.status} ${response.statusText}` : '') + (innerError ? ` - ${innerError.message}` : '')
    ) {
        super(request, response, innerError, message)
    }
}
