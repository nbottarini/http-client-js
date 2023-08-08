export class UrlHelper {
    private readonly _baseUrl: string
    private readonly _relativeUrl: string
    private readonly _absoluteUrl: string

    constructor(baseUrl: string | undefined, url: string | undefined) {
        this._baseUrl = baseUrl ?? ''
        this._relativeUrl = this.buildRelativeUrl(baseUrl, url)
        this._absoluteUrl = this.buildAbsoluteUrl(baseUrl, url)
    }

    get baseUrl(): string {
        return this._baseUrl
    }

    get relativeUrl(): string {
        return this._relativeUrl
    }

    get absoluteUrl(): string {
        return this._absoluteUrl
    }

    private buildAbsoluteUrl(baseUrl: string | undefined, relativeUrl: string | undefined) {
        if (!baseUrl || this.isAbsoluteUrl(relativeUrl)) return relativeUrl
        return this.combineUrls(baseUrl, relativeUrl)
    }

    private buildRelativeUrl(baseUrl: string | undefined, relativeUrl: string | undefined) {
        const normalizedRelativeUrl = relativeUrl ?? ''
        if (!this.isAbsoluteUrl(relativeUrl) || !baseUrl) return normalizedRelativeUrl
        const urlWithoutBase = normalizedRelativeUrl.replace(baseUrl, '')
        if (urlWithoutBase.startsWith('/')) return urlWithoutBase
        return '/' + urlWithoutBase
    }

    private isAbsoluteUrl(url) {
        // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
        // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
        // by any combination of letters, digits, plus, period, or hyphen.
        // eslint-disable-next-line no-useless-escape
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
    }

    private combineUrls(baseUrl, relativeUrl) {
        return relativeUrl
            ? baseUrl.replace(/\/+$/, '') + '/' + relativeUrl.replace(/^\/+/, '')
            : baseUrl
    }
}
