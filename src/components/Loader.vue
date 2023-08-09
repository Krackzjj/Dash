<script setup lang="ts">

</script>

<template>
    <i class="icon-spinner"></i>
</template>

<style scoped lang="scss">
.icon-spinner {
    font-size: 5rem;
    display: inline-block;
    animation: spin 1s linear infinite;
}

.spin {}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>