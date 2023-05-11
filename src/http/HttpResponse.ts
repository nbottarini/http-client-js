import { HttpMethod } from './HttpMethod'

export interface HttpResponse<T> {
    method: HttpMethod;
    status: number;
    body: T;
    baseUrl: string;
    url: string;
    relativeUrl: string;
    headers: Record<string, string>;
    requestBody: any;
}
