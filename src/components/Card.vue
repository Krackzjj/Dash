<script setup lang="ts">
const props = defineProps<{
    anot?: string
    flex?: boolean
}>()
</script>
<template>
    <div class="card">
        <div v-if="props.anot" class="anot">{{ props.anot }}</div>

        <div :class="props.flex ? 'card-body-flex' : 'card-body'">
            <slot></slot>
            <div class="content">
                <slot name="body"></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
.card {
    position: relative;
    border-radius: 5px;
    background-color: whitesmoke;
    padding: 1rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
}

.card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-flex {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        height: 100%;
    }
}

.content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.anot {
    position: absolute;
    background-color: whitesmoke;
    top: 0.3rem;
    right: .5rem;
    padding: .2rem;
    border-radius: 5px;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    width: fit-content;
    height: fit-content;
    text-align: center;
    z-index: 10;
    user-select: none;
}
</style>