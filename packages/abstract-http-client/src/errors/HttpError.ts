import { HttpMethods } from '../http/HttpMethods'
import { BaseError } from './BaseError'
import { HttpRequest } from '../http/HttpRequest'
import { HttpResponse } from '../http/HttpResponse'

export class HttpError extends BaseError {
    private readonly _request: HttpRequest
    private readonly _response: HttpResponse<any>|null
    private readonly _innerError: Error|null

    constructor(
        request: HttpRequest,
        response: HttpResponse<any>|null,
        innerError: Error|null = null,
        message: string = `Http error: ${request.method} ${request.url}` + (response ? ` ${response.status} ${response.statusText}` : '') + (innerError ? ` - ${innerError.message}` : '')
    ) {
        super(message)
        this._request = request
        this._response = response
        this._innerError = innerError
    }

    get request(): HttpRequest {
        return this._request
    }

    get response(): HttpResponse<any>|null {
        return this._response
    }

    get innerError(): Error|null {
        return this._innerError
    }

    get method(): HttpMethods {
        return this.request.method
    }

    get url(): string {
        return this.request.url
    }

    get status(): number|null {
        return this.response?.status
    }

    get statusText(): string|null {
        return this.response?.statusText
    }

    get body(): any {
        return this.response?.body
    }

    get headers(): any {
        return this.response?.headers
    }
}
