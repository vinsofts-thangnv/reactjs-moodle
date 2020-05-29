export interface Action {
    type: string,
    value?: any
}

export interface State {
    auth?: Auth
}

export interface Auth {
    token: string
    user: User
}

export interface User {
    _id: string,
    name: string
}