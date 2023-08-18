import Home from '@/views/Home.vue'
import Users from '@/views/Users.vue'
import Posts from '@/views/Posts.vue'
import Gallery from '@/views/Gallery/Gallery.vue'

import { galleryRoutes } from './gallery.routes'
import { postsRoutes } from './posts.routes'
import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'main.home',
        meta: {
            label: 'Home',
            icon: 'home',
            visible: true,
        },
        component: Home,
    }, {
        path: '/gallery/:view?',
        name: 'gallery',
        redirect: (to) => {
            return { name: 'gallery.view' }
        },
        meta: {
            label: 'Gallery',
            icon: 'images',
            visible: true,
        },
        component: Gallery,
        children: galleryRoutes
    },
    {
        path: '/posts',
        name: 'posts.list',
        meta: {
            label: 'Posts',
            icon: 'folder',
            visible: true,
        },
        component: Posts,
        children: postsRoutes
    },
    {
        path: '/users',
        name: 'users.list',
        meta: {
            label: 'Users',
            icon: 'user-circle',
            visible: true,
        },
        component: Users
    },

]