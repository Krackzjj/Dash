<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';

let props = defineProps<{
    src: string
    rounded?: boolean | string
    animation?: boolean
    clickable?: boolean
    border?: string
}>()



const { src, rounded, animation, clickable, border } = toRefs(props)

const alt = computed(() => {
    return src.value.split('/').pop()?.split('.')[0] || 'image'
})

const img = ref<HTMLElement>()

const style = computed(() => {
    if (!props.rounded) return {}
    return {
        borderRadius: typeof props.rounded === 'string' ? rounded?.value : '50%'
    }
})

const classes = computed(() => ({
    img: true,
    'img-clickable': clickable?.value,
    'img-animation': animation?.value,
    'img-rounded': rounded?.value,
}))

const imgLoaded = ref(false)

let isInvalid = computed(() => {
    if (img.value?.onerror) {
        return true
    } else if (src?.value === '' || src?.value === undefined || src?.value === null) {
        return true
    } else {
        return false
    }
})

</script>


<template>
    <img v-if="!isInvalid" ref="img" class="img" @load="imgLoaded = true" :class="classes" v-bind="{ ...$attrs }"
        :src="props.src" :alt="alt" :style="style" :hidden="!imgLoaded">
    <div class="img img-load" v-if="imgLoaded === false"></div>
</template>


<style scoped lang="scss">
.img {
    width: 100%;
    height: 100%;
    user-select: none;
    object-fit: none;
    transition: transform .3s;
    border: 3px solid v-bind(border);

    &-load {
        width: 100%;
        height: 100%;
        background-color: #ccc;
        animation: skeleton-loading 1s linear infinite alternate;

        @keyframes skeleton-loading {
            0% {
                opacity: 1;
            }

            50% {
                opacity: 0.5;
            }

            100% {
                opacity: 1;
            }
        }
    }
}

.img-wrapper {
    width: 100%;
    height: 75%;
    border-radius: v-bind('style.borderRadius');
    border: 1px solid whitesmoke;
}

.img-animation:hover {
    transform: scale(1.02);
}

.img-clickable {
    cursor: pointer;
}
</style>