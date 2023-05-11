import { HttpMethod } from './HttpMethod'

export class HttpRequest {
    constructor(
        public method: HttpMethod,
        public url: string,
        public body: any = null,
        public headers: Record<string, string> = {},
    ) {
    }
}
