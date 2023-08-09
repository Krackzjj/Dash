import { type Component } from "vue"

export type Route = {
    path: string,
    name: string,
    label?: string,
    icon?: string,
    meta: {
        enable: boolean,
    },
    component: Component,
    children?: Route[]
}