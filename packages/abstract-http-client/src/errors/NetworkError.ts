import { HttpError } from './HttpError'
import { HttpRequest } from '../http/HttpRequest'
import { HttpResponse } from '../http/HttpResponse'

export class NetworkError extends HttpError {
    constructor(request: HttpRequest, response: HttpResponse<any>|null) {
        super(request, response)
    }
}
