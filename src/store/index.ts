import { defineStore } from 'pinia'

interface LastGalleryView {
    name: string | null
    params: any | null
}

export const useStore = defineStore('global', {

    state: () => ({
        lastGalleryView: {
            name: null,
            params: null
        } as LastGalleryView
    }),

    getters: {
        lastName(state) {
            return state.lastGalleryView.name
        },

        lastParams(state) {
            return state.lastGalleryView.params
        }
    },

    actions: {
        SET_CURRENT_VIEW(name: string, params: any) {
            this.lastGalleryView.name = name
            this.lastGalleryView.params = params
        }
    }

})