declare module 'vue' {
    interface ComponentCustomProperties {
        $debug: (message: string) => void
    }
}
export default {
    install: (app: any) => {
        console.log('Debug Plugin Installed')

        app.config.globalProperties.$debug = (message: string) => {
            console.log(message)
        }
    }
}