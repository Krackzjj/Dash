<script setup lang="ts">
const props = defineProps<{
    backgroundColor?: string
}>()
</script>

<template>
    <span>
        <slot />
    </span>
</template>

<style scoped lang="scss">
span {
    font-family: 'The-Bold-Font', sans-serif;
    font-size: .7rem;
    padding-inline: .8rem;
    padding-block: .5rem;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;
    user-select: none;
    letter-spacing: .05ch;
    background-color: v-bind(backgroundColor);
}
</style>