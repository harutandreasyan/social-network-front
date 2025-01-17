export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
    cover: string
    picture: string
    isPrivate: number
    followers: IUser[]
    following: IUser[]
    posts: IPostResponse[]
}

export interface IAccount extends IUser {
    connection: {
        followsMe: boolean
        following: boolean
        requested: boolean
    }
}

export interface IRequest {
    id: number
    user: IUser
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
    id: number
    title: string
    picture: string
    userId: number
    likes: IUser[]
    comments: string[]
    isLiked: boolean
    hashtags: string[]
}
