<script setup lang="ts">
import Loader from '@/components/progress/Loader.vue';

let test = {
    value: 'test'
}
let e = async () => {
    await fetch('http://localhost:3000/api/img/t', { method: 'post', body: JSON.stringify('https://images7.alphacoders.com/605/thumbbig-605564.webp'), headers: { 'Content-Type': 'application/json' } })
}
</script>
<template>
    <div class="t border border-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, quidem! Autem
        doloremque
        similique nihil recusandae distinctio sapiente voluptatem magnam qui nostrum maxime. Blanditiis, maiores
        repellendus. <button @click="e">test</button>
        <Loader type="wave" size="l" />

    </div>
</template>
<style scoped lang="scss">
.t {
    width: 50%;
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
}
</style>