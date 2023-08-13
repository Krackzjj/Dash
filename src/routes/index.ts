import Home from '@/views/Home.vue'
import Users from '@/views/Users.vue'
import Posts from '@/views/Posts.vue'
import CreatePost from '@/views/CreatePost.vue'
import Gallery from '@/views/Gallery/Gallery.vue'
import { Route } from '@/types/Router/Routes'


export const routes: Route[] = [
    {
        path: '/',
        name: 'main.home',
        label: 'Home',
        icon: 'home',
        meta: {
            enable: true,
        },
        component: Home,
    }, {
        path: '/gallery',
        name: 'gallery',
        label: 'Gallery',
        icon: 'images',
        meta: {
            enable: true,
        },
        component: Gallery,
    },
    {
        path: '/posts',
        name: 'posts.list',
        label: 'Posts',
        icon: 'folder',
        meta: {
            enable: true,
        },
        component: Posts,
        children: [
            {
                path: 'posts/create',
                name: 'posts.create',
                label: 'Create',
                icon: 'pencil',
                meta: {
                    enable: true,
                },
                component: CreatePost
            }
        ]
    },
    {
        path: '/users',
        name: 'users.list',
        label: 'Users',
        icon: 'user-circle',
        meta: {
            enable: true,
        },
        component: Users
    },

]