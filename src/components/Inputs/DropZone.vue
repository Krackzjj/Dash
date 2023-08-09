<script setup lang="ts">
import { ref } from 'vue';

let t = ref(false)

</script>

<template>
    <div @dragenter.prevent="t = true" @dragleave.prevent="t = false" @dragover.prevent @drop.prevent="t = true">
        <div class="dropzone" v-if="t">
        </div>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.dropzone {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: aqua;
}
</style>