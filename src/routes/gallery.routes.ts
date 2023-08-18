export const galleryRoutes = [
    {
        path: 'view',
        name: 'gallery.view',
        label: 'View',
        icon: 'eye',
        meta: {
            visible: false,
        },
        component: () => {
            return import('@/views/Gallery/GalleryView.vue')
        }

    },
    {
        path: 'trash',
        name: 'gallery.trash',
        label: 'Trash',
        icon: 'trash',
        meta: {
            visible: false,
        },
        component: () => import('@/views/Gallery/Trash.vue')
    }
]