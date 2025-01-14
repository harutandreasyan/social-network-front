export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
    cover: string
    picture: string
    followers: IUser[]
    following: IUser[]
}

export interface IAccount extends IUser {
    posts: unknown
    isPrivate: number
    connection: {
        followsMe: boolean
        following: boolean
        requested: boolean
    }
}

export interface IResponse {
    status: string
    message: string
    payload: unknown
    user?: IUser
}

export type IAuth = Pick<IUser, 'login' | 'password'>

export interface IContext {
    user: null | IUser
    refetch: () => void
}

export interface IAccountContext {
    account: IAccount
    refetch: () => void
}

export interface IPost {
    id: string
    photo: string
    content: string
}

export interface IPostResponse {
    id: string
    title: string
    picture: string
    userId: string
    likes: IUser[]
}