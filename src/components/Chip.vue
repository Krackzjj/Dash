<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { NameColorType } from '@/types/Components/General';
const props = defineProps<{
    label: string
    type?: NameColorType
    icon?: string | string[]
}>()

const { icon } = toRefs(props)
const icons = computed(() => {
    if (icon?.value instanceof Array) {
        return {
            'icon-left': `icon-${icon?.value[0]}`,
            'icon-right': `icon-${icon?.value[1]}`
        }
    } else {
        return {
            class: `icon-${icon?.value}`
        }
    }
})

const iconClass = computed(() => {
    return {
        'text-xs': true,
        [`icon-s`]: !props.label && !icons.value['icon-left']
    }
})

const classes = computed(() => {
    return {
        'chip': true,
        [`bg-${props?.type ?? 'primary'}`]: true
    }
})

</script>

<template>
    <div :class="{ ...classes, ...iconClass }">
        <i v-if="icons['icon-left']" class="text-xs" :class="icons['icon-left']"></i>
        <span v-if="props.label" class="text-xs">{{ props.label }}</span>
        <i v-if="icon" :class="icons['icon-right'] || icons.class"></i>
    </div>
</template>

<style scoped lang="scss">
.chip {
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .25rem .5rem;
    border-radius: 25px;
    font-family: 'Visage Bold', sans-serif;
    text-transform: uppercase;
    color: white;
    width: fit-content;
}

.icon-s {
    padding: .5rem .6rem;
    border-radius: 100%;
}
</style>