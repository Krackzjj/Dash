import { createApp } from 'vue';

import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

import debug from '@/plugin/debug';

import routes from '@/routes/Router';


import Button from '@/components/Inputs/Button.vue';
import InputText from '@/components/Inputs/InputText.vue';
import Checkbox from '@/components/Inputs/Checkbox.vue';

import Link from '@/components/Link.vue';
import Image from '@/components/Image.vue';
import Chip from './components/Chip.vue';

import Modal from '@/components/layout/Modal.vue';
import Dialog from './components/Dialog.vue';

import '@/assets/scss/index.scss';
import App from '@/App.vue';


const pinia = createPinia()
const router = routes



const app = createApp(App)


app.component('Link', Link)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Modal', Modal)
app.component('Dialog', Dialog)
app.component('Image', Image)
app.component('Chip', Chip)

app.use(debug)

app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')

