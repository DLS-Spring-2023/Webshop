export type AuthTokens = {
    access_token?: string,
    refresh_token?: string
}

export type FetchOptions = {
    authTokens?: AuthTokens
    body?: object
}

type Error = {
    code: number,
    message: string
}

export type Response = {
    data?: object,
    auth?: AuthTokens,
    error?: Error
}

export interface LoginResponse extends Response {}