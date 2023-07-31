<script setup lang="ts">
import { computed } from 'vue';

let props = defineProps<{
    src: string
    rounded?: boolean | string
    animation?: boolean
    clickable?: boolean
}>()

const alt = computed(() => {
    return props.src.split('/').pop()?.split('.')[0] || 'image'
})

const style = computed(() => {
    if (!props.rounded) return {}
    return {
        borderRadius: typeof props.rounded === 'string' ? props.rounded : '50%'
    }
})

const classTab = computed(() => {
    const classes = []
    if (props.animation) classes.push('animation')
    if (props.clickable) classes.push('clickable')
    return classes.join(' ')
})
</script>


<template>
    <div class="img-wrapper">
        <img :class="classTab" v-bind="{ ...$attrs }" :src="props.src" :alt="alt" :style="style">
    </div>
</template>


<style scoped lang="scss">
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    transition: transform .3s;
}

.img-wrapper {
    width: 100%;
    height: 75%;
    border-radius: v-bind('style.borderRadius');
    border: 1px solid whitesmoke;
}

.animation:hover {
    transform: scale(1.02);
}

.clickable {
    cursor: pointer;
}
</style>