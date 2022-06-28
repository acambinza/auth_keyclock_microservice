/** all interface and types of project, put here */

export interface userLoginInterface {
    username: string,
    password: string
}

export interface userRefreshToken {
    refreshToken: string
}

export interface userToken {
    token?: string,
    refreshToken?: string
}