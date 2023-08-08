export class QueryStringBuilder {
    private params: Record<string, any>  = {}

    add(name: string, value: any) {
        this.params[name] = value
    }

    remove(name: string) {
        delete this.params[name]
    }

    build() {
        const keys = Object.keys(this.params)
        if (keys.length === 0) return ''
        let query = '?'
        for (let key of keys) {
            if (query !== '?') query += '&'
            if (Array.isArray(this.params[key])) {
                this.params[key].forEach(value => {
                    if (this.params[key].indexOf(value) === this.params[key].indexOf(this.params[key].last())) {
                        query += `${key}=${value}`
                    }
                    else query += `${key}=${value}&`
                })
            }
            else query += `${key}=${this.params[key]}`
        }
        return query
    }
}
