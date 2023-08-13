<script setup lang="ts">
import { computed } from 'vue'
import { type NameColorType } from '@/types/Components/General';

let props = defineProps<{
    label: string,
    count: number,
    type?: NameColorType,
}>()


const classes = computed(() => ({
    [`header-counter`]: true,
    [`header-counter-${props.type ?? 'primary'}`]: true,
}))



</script>

<template>
    <div :class="classes">
        <span>{{ props.label }} |</span>
        <span>{{ props.count }}</span>
    </div>
</template>

<style scoped lang="scss"></style>