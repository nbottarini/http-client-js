[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/nbottarini/http-client-js/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/nbottarini/http-client-js/actions)

**abstract-http-client:** [![npm](https://img.shields.io/npm/v/@nbottarini/abstract-http-client.svg)](https://www.npmjs.com/package/@nbottarini/abstract-http-client)

**axios-http-client:** [![npm](https://img.shields.io/npm/v/@nbottarini/axios-http-client.svg)](https://www.npmjs.com/package/@nbottarini/axios-http-client)

# Http Client

Abstract types to easily switch from http client implementations by using dependency inversion principle.

See [Abstract Http Client Documentation](https://github.com/nbottarini/http-client-js/blob/main/packages/abstract-http-client/README.md).


## Installation

### Axios implementation: 

Npm:
```
$ npm install --save @nbottarini/axios-http-client
```

Yarn:
```
$ yarn add @nbottarini/axios-http-client
```

## Usage

**index.ts:**
```typescript
import { AxiosHttpClient } from '@nbottarini/axios-http-client'
import { ApiClient } from './ApiClient'

const httpClient = new AxiosHttpClient('https://myapi.com/')
const apiClient = new ApiClient(httpClient)
```

**ApiClient.ts:**

```typescript
import { HttpClient } from '@nbottarini/abstract-http-client'

export class ApiClient {
    constructor(private http: HttpClient) {
    }

    async getUsers(): Promise<User[]> {
        const response = await this.http.get('/users')
        return response.body
    }

    async createUser(user: User): Promise<void> {
        await this.http.post('/users', user)
    }
}
```

See [tests](https://github.com/nbottarini/http-client-js/blob/main/packages/axios-http-client/test/AxiosHttpClient.test.ts) for more use cases.
