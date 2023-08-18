<script setup lang="ts">
import { computed, ref } from 'vue'
import { type imgType } from '@/schema/ImgSchema'
type iOpts = {
    type?: string,
    description?: string
    validation?: boolean
    name?: string
}

const props = defineProps<{
    opts?: iOpts,
    data?: imgType[]
}>()

const emit = defineEmits<{
    reply: [{
        context?: string,
        state: boolean
    }],
}>()

const classes = computed(() => {
    return {
        'dialog': true,
        [`border-l-${props.opts?.type ?? 'primary'}[i]`]: true,
    }
})

const isOpen = ref(false)
const isOpen_ = ref(false)
let dialog = {
    open: () => {
        isOpen.value = true
        setTimeout(() => isOpen_.value = true, 200)
    },
    close: () => {
        isOpen_.value = false
        setTimeout(() => isOpen.value = false, 200)
    },
}

const handleClose = () => {
    emit('reply', { context: props.opts?.type, state: true })
    dialog.close()
}

defineExpose({
    dialog
})

</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="overlay">
            <Transition name="slide" mode="out-in">
                <div :class="classes" v-show="isOpen_">
                    <slot name="title" :slotProps="props.opts" />
                    <div class="recap">
                        <ul class="list-items">
                            <li v-for="item in props.data"> > {{ item.name }}</li>
                        </ul>
                    </div>
                    <div class="validate">
                        <Button :label="props.opts?.validation ? 'Annuler' : 'Fermer'" size="xxs" :opts="{ square: true }"
                            @click="[dialog.close()]" />
                        <Button v-if="props.opts?.validation" label="Valider" size="xxs" :opts="{ square: true }"
                            :color="props.opts?.type" @click="handleClose" />
                    </div>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.dialog {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 100%);
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

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 104;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}

.slide-enter-active {
    transition: all .2s cubic-bezier(.47, 1.64, .41, .8);
}

.slide-leave-active {
    transition: all .2s ease-in-out;
}

.slide-enter-from {
    transform: translate(-50%, -100%);
}

.slide-leave-to {
    opacity: 0;
    transform: translate(-50%, -100%);
}
</style>