export type AuthTokens = {
    access_token?: string,
    refresh_token?: string
}

export type FetchOptions = {
    body?: object
}

type Error = {
    code: number,
    message: string
}

export type Response = {
    data?: any,
    auth?: AuthTokens,
    error?: Error
}

export interface LoginResponse extends Response {}