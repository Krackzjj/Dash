export default interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    created_at: string;
    updated_at: string;
    active: boolean;
    roles: string[] | string;
}
export interface CurrentUser {
    token?: string,
    username?: string,
    role?: string | string[],
}

export interface UserCreateOrUpdate {
    id?: number;
    username: string;
    email: string;
    password: string | undefined;
    avatar?: string;
    role?: string | string[];
}
export interface UserToAdd {
    username?: string;
    email?: string;
    password?: string;
    avatar?: string;
}