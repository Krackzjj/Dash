 
<script setup lang="ts">
let props = defineProps({
    desc: {
        type: String,
        default: 'Chargement...'
    }
})
</script>
<template>
    <div class="spinner">
        <i class="icon-spinner"></i>
        <p class="desc-spinner">{{ props.desc }}</p>
    </div>
</template>
<style scoped lang="scss">
.spinner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icon-spinner {
    font-size: 4rem;
    animation: spin 2s linear infinite;
}

.desc-spinner {
    font-size: 1.5rem;
    animation: blur 2s linearqu infinite;
}

@keyframes blur {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  