import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import routes from '@/routes/Router';


import Button from '@/components/Inputs/Button.vue';
import InputText from '@/components/Inputs/InputText.vue';

import Img from '@/components/Img.vue';

import Card from '@/components/Card.vue';
import Modal from '@/components/layout/Modal.vue';
import Form from '@/components/Form.vue';

import '@/assets/scss/index.scss';
import App from '@/App.vue';


const pinia = createPinia()
const router = routes()



const app = createApp(App)

app.component('Button', Button)
app.component('InputText', InputText)


app.component('Card', Card)
app.component('Modal', Modal)
app.component('Img', Img)
app.component('Form', Form)

app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')

