import { HttpMethod } from '../http/HttpMethod'
import { BaseError } from './BaseError'

export class HttpError extends BaseError {
    private readonly _method: HttpMethod
    private readonly _url: string
    private readonly _status: number
    private readonly _statusText: string
    private readonly _body: any
    private readonly _headers: any
    private readonly _innerError: Error

    constructor(innerError: Error, method: HttpMethod, url: string, status: number, statusText: string, body: any, headers: any) {
        super(`Http error: ${status} - ${statusText}`)
        this._innerError = innerError
        this._method = method
        this._url = url
        this._status = status
        this._statusText = statusText
        this._body = body
        this._headers = headers
    }

    get method(): HttpMethod {
        return this._method
    }

    get url(): string {
        return this._url
    }

    get status(): number {
        return this._status
    }

    get statusText(): string {
        return this._statusText
    }

    get body(): any {
        return this._body
    }

    get headers(): any {
        return this._headers
    }

    get innerError(): Error {
        return this._innerError
    }
}
