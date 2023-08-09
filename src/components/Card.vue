<script setup lang="ts">
import { toRefs } from 'vue'


const props = defineProps<{
    anot?: string
    isLoading?: boolean
}>()

const { anot, isLoading } = toRefs(props)

</script>
<template>
    <div class="card">
        <div v-if="anot" class="anot">{{ anot }}</div>
        <div v-if="isLoading">Loading ...</div>
        <div v-else class="card-body">
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
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: .5rem;
    margin: .2rem;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}

.card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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