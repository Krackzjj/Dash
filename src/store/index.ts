import { defineStore } from 'pinia'
import { CurrentUser } from '@/types/user'


//penser a décpder le jwt

export const useStore = defineStore('global', {
    state: () => ({
        current_user: {} as CurrentUser,
    }),
    getters: {
        getCurrentUser(): CurrentUser {
            return this.current_user
        },
        isLogged(): boolean {
            return this.current_user.token ? true : false
        }
    },
    actions: {
        setCurrentUser(user: CurrentUser) {
            this.current_user = user
        }
    }

})