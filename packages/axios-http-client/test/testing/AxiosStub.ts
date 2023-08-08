import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosStub {
    private responseConfig = { data: null, status: 200, headers: {} };
    private lastRequest: AxiosResponse|null = null;
    private requestError: Error|null = null;

    setResponseStatus(status: number) {
        this.responseConfig.status = status;
    }

    setResponseBody(data: any) {
        this.responseConfig.data = data;
    }

    setResponseHeader(header: string, value: any) {
        this.responseConfig.headers[header] = value;
    }

    setRequestError(error: Error) {
        this.requestError = error;
    }

    getRequestedMethod() {
        return this.lastRequest?.config?.method;
    }

    getRequestedUrl() {
        return this.lastRequest?.config?.url;
    }

    getRequestedData() {
        return this.lastRequest?.config?.data;
    }

    getRequestedHeaders() {
        return this.lastRequest?.config?.headers;
    }

    notifyUploadProgress(progressEvent) {
        this.lastRequest?.config?.onUploadProgress?.(progressEvent);
    }

    getAdapter() {
        return jest.fn(async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
            if (this.requestError) {
                throw this.requestError;
            }
            const response = {
                data: this.responseConfig.data,
                status: this.responseConfig.status,
                statusText: '',
                headers: this.responseConfig.headers,
                config: config,
            };
            this.lastRequest = response;
            return response;
        });
    }
}
