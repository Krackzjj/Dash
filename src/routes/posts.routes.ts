
export const postsRoutes = [
    {
        path: 'create',
        name: 'posts.create',
        meta: {
            icon: 'pencil',
            label: 'Create',
            visible: true,
        },
        component: () => import('@/views/CreatePost.vue')
    },
    {
        path: 'edit',
        name: 'posts.edit',
        meta: {
            icon: 'pencil',
            label: 'Edit',
            visible: false,
        },
        component: () => { }
    }
]