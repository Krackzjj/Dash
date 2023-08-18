import { type Component } from "vue"

export type Route = {
    path: string,
    name: string,
    label?: string,
    params?: object,
    props?: number | string | object,
    icon?: string,
    meta: {
        visible: boolean,
        redirect?: boolean,
        state?: boolean
    },
    component: Component,
    children?: Route[]
}