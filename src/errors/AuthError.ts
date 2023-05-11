import { HttpMethod } from '../http/HttpMethod'
import { BaseError } from './BaseError'
import { HttpError } from './HttpError'

export class AuthError extends BaseError {
    private readonly _method: HttpMethod
    private readonly _url: string
    private readonly _status: number
    private readonly _statusText: string
    private readonly _body: any
    private readonly _headers: any

    constructor(error: HttpError) {
        super(`Authentication error: ${error.status} - ${error.statusText}`)
        this._method = error.method
        this._url = error.url
        this._status = error.status
        this._statusText = error.statusText
        this._body = error.body
        this._headers = error.headers
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
}
