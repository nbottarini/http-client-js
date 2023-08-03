import { HttpMethod } from './HttpMethod'
import { ResponseBodyConversions } from './ResponseBodyConversions'

export class HttpRequest {
    constructor(
        public method: HttpMethod,
        public url: string,
        public body: any = null,
        public headers: Record<string, string> = {},
        public responseBodyConversion: ResponseBodyConversions = ResponseBodyConversions.Json,
    ) {
    }
}
