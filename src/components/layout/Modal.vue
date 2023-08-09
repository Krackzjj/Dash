<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    data?: any
}>()


const isOpen = ref(false);
const toggle = () => {
    isOpen.value = !isOpen.value;
}
defineExpose({ toggle });


</script>
<template>
    <Teleport to="body">
        <div class='overlay' v-if="isOpen">
            <div class="container">
                <div class="content">
                    <div class="title">
                        <Button id="close" @click="toggle"><i class="icon-close"></i></Button>
                        <slot v-if="$slots.title" name="title" />
                    </div>
                    <div class="inner-content">
                        <slot :data="props.data" />
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<style scoped lang="scss">
.overlay {
    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.container {
    position: relative;
    width: 50%;
    height: fit-content;
    max-height: 80vh;
    background-color: white;
    border-radius: 5px;
    overflow: auto;
    display: flex;
    flex-direction: column;

}

.content {
    flex-grow: 1;

    .inner-content {
        height: 100%;
    }
}

#close {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
}
</style>