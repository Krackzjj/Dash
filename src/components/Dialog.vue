<script setup lang="ts">
import { computed, ref } from 'vue'
const props = defineProps<{
    name: string,
    type: string,
    data: any[],
}>()

const classes = computed(() => {
    return {
        'dialog': true,
        [`border-l-${props.type}[i]`]: true,
    }
})

const isOpen = ref(false)

let dialog = {
    open: () => isOpen.value = true,
    close: () => isOpen.value = false,
}

defineExpose({
    dialog
})

</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen">
            <div :class="classes">
                <h2>Are you sure ?</h2>
                <p>Le(s) élément suivant seront placer dans la corbeille</p>
                <div class="recap">
                    <ul class="list-items">
                        <li v-for="item in props.data"> > {{ item.name }}</li>
                    </ul>
                </div>
                <div class="validate">
                    <Button label="Annuler" size="xxs" :opts="{ square: true }" @click="dialog.close" />
                    <Button label="Valider" size="xxs" :opts="{ square: true }" :color="props.type" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.dialog {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    background-color: #fff;
    border-left: 5px solid transparent;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    max-width: 90%;
    overflow: hidden;
    padding: 1rem;
}

.list-items {
    max-height: 10vh;
}

.recap {
    margin-top: .5rem;
    margin-left: 1rem;
    overflow-y: auto;
}

.validate {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    gap: .5rem;
}
</style>