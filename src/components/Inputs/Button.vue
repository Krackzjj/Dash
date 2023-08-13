<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue'
import { type NameColorType, type Sizes } from '@/types/Components/General';
const { attrs } = useAttrs()

type Opts = {
    noBorder: boolean,
    noHover: boolean,
    noSpace: boolean,
    square: boolean,
}

interface Props {
    label?: string,
    icon?: string | string[],
    color?: NameColorType,
    text?: NameColorType
    hollow?: boolean,
    size?: Sizes,
    disabled?: boolean
    opts?: Opts,
}

const props = defineProps<Props>()

const { label, icon, color, text, hollow, size, opts, disabled } = toRefs(props)

const classes = computed(() => ({
    btn: true,
    [`btn-${size?.value ?? 'xs'}`]: true,
    [`btn-${color?.value ?? 'primary'}`]: true,
    [`btn-${color?.value ?? 'primary'}-hollow`]: hollow?.value && !disabled.value,
    [`btn-${color?.value ?? 'primary'}-hollow-nb`]: opts?.value?.noBorder && !disabled.value,
    [`text-${text?.value ?? 'secondary'}`]: true,
    [`no-hover`]: opts?.value?.noHover && !disabled.value,
    [`no-space`]: opts?.value?.noSpace,
    [`square`]: opts?.value?.square,
    disabled: disabled.value,


}))

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

</script>

<template>
    <button :class="classes" v-bind="attrs">
        <i v-if="icon" :class="icons['icon-left']"></i>
        {{ label }}
        <slot v-if="!label"></slot>
        <slot name="icon"></slot>
        <i v-if="icon" :class="icons['icon-right'] || icons.class"></i>
    </button>
</template>

<style scoped lang="scss"></style>