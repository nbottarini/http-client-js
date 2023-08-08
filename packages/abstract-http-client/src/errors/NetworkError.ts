import { HttpError } from './HttpError'
import { HttpRequest } from '../http/HttpRequest'

export class NetworkError extends HttpError {
    constructor(request: HttpRequest, innerError: Error) {
        super(request, null, innerError)
    }
}
