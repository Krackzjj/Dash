export interface iInput {
    label: string;
    type: enumInputTypeText | string;
    options?: iOptions | iOptions[];
    value?: string | number | string[] | number[];
    disabled?: boolean;
    required?: boolean;
}
export interface iOptions {
    id: number;
    name: string;
    authorizations: string[];
}

export enum enumInputTypeText {
    text = 'text',
    password = 'password',
    email = 'email',
    img = 'img',
    tel = 'tel',
    url = 'url',
}