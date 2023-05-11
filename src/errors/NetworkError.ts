import { BaseError } from './BaseError'

export class NetworkError extends BaseError {
    constructor(message: string, status: number) {
        super(`Network error: ${message} - ${status}`)
    }
}
