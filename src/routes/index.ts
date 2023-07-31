import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/views/Users.vue'
import Posts from '@/views/Posts.vue'
import CreatePost from '@/views/CreatePost.vue'
import Gallery from '@/views/Gallery/Gallery.vue'



export const routes: any[] = [
    {
        path: '/auth',
        name: 'Auth',
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login
            },
            {
                path: 'logout',
                name: 'Logout',
            },
        ],
    },
    {
        path: '/',
        name: 'Accueil',
        component: Home,
    }, {
        path: '/galery',
        name: 'Galerie',
        component: Gallery,
    },
    {
        path: '/posts',
        name: 'Articles',
        component: Posts,
        children: [
            {
                path: 'create',
                name: 'Ecrire un article',
                component: CreatePost
            }
        ]
    },
    {
        path: '/users',
        name: 'Utilisateurs',
        component: Users
    },

]