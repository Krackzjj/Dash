<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue'


const $zoombox = ref(null)
const $src = ref<string>("")

const isOpen = ref(false)
const isZoom = ref(true)
onClickOutside($zoombox, () => {
    isZoom.value = false
    setTimeout(() => {
        isOpen.value = false
    }, 200)
})

const zoom = () => {
    isOpen.value = !isOpen.value
    isZoom.value = true
}

defineExpose({
    zoom,
    $src
})
</script>

<template>
    <Teleport to='body'>
        <div v-if="isOpen" class="zoom-box">
        </div>
        <div ref="$zoombox" class="zoom-img" v-if="isOpen">
            <img :src="$src" :data-zoom="isZoom">
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.zoom-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
}

.zoom-img {
    position: fixed;
    width: 75%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 102;

    img {
        aspect-ratio: 16/9;
        object-fit: cover;
        user-select: none;
    }
}

img[data-zoom="true"] {
    animation: zoom 0.5s ease-in-out forwards;

    @keyframes zoom {
        0% {
            scale: 0;
        }

        100% {
            scale: 1;
        }
    }
}

img[data-zoom="false"] {
    animation: zoom-out 0.2s ease-in-out forwards;

    @keyframes zoom-out {
        0% {
            scale: 1;
        }

        100% {
            scale: 0;
        }
    }
}
</style>