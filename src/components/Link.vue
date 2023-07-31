<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface Props {
    to: string;
    icon?: (string | undefined) | (string | undefined)[];
    label: string;
}
const props = defineProps<Props>()


</script>
<template>
    <RouterLink class="router-link" :to="props.to">
        <i v-if="props.icon" :class="props.icon.length > 1 ? props.icon : props.icon[0]"></i>
        <span>{{ props.label }}</span>
        <i v-if="props.icon?.length" :class="props.icon[1]"></i>
    </RouterLink>
</template>
<style lang="scss" scoped>
.router-link {

    i:last-child {
        margin-left: 1rem;
        font-size: small;
    }

    span {
        margin-left: 1rem;
    }
}
</style>