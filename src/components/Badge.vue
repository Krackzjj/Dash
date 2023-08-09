<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { Colors } from '@/types/Components/ColorType';
const props = defineProps<{
    backgroundColor: string
}>()

const { backgroundColor } = toRefs(props)

const background = backgroundColor.value.toUpperCase()

let thisBackground = computed(() => {
    if (Colors[background]) {
        return Colors[background]
    } else {
        return Colors.Other
    }
})

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
    background-color: v-bind(thisBackground);
}
</style>