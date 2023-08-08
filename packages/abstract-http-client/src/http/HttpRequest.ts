import { HttpMethods } from './HttpMethods'
import { RequestOptions } from './HttpClient'
import { ResponseBodyConversions } from './ResponseBodyConversions'

const defaultOptions: RequestOptions = {
    responseBodyConversion: ResponseBodyConversions.Json,
}

export class HttpRequest {
    constructor(
        public method: HttpMethods,
        public url: string,
        public body: any = null,
        public headers: Record<string, string> = {},
        public options: RequestOptions = defaultOptions,
    ) {
    }
}
