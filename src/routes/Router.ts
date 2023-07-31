import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/routes';
import { useStorage } from '@vueuse/core';
import { subTime } from '@/utils/date';

import api from '@/utils/api'

export default function () {
    const router = createRouter({
        history: createWebHistory(),
        routes
    });

    return router
}