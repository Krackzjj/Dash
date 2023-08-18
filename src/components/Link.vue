<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { RouterLink } from 'vue-router';

interface Props {
    to: string | { name: string, params?: any };
    icon?: (string | undefined) | (string | undefined)[];
    label?: string;
}
const props = defineProps<Props>()

const { to, icon, label } = toRefs(props)

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
    <RouterLink class="router-link" :to="to">
        <i v-if="icon" :class="icons['icon-right'] || icons.class"></i>
        {{ label }}
        <slot v-if="!label"></slot>
        <i v-if="icon" :class="icons['icon-left']"></i>
    </RouterLink>
</template>
<style lang="scss" scoped>
.router-link {

    i:last-child {
        margin-left: 1rem;
        font-size: small;
    }
}
</style>