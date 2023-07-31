<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    data: any
    overlay?: boolean
}>()


const isOpen = ref(false);
const toggle = () => {
    isOpen.value = !isOpen.value;
}
defineExpose({ toggle });


</script>
<template>
    <Teleport to="body">
        <div class='overlay' :class="props.overlay ? 'bg' : ''" v-if="isOpen">
            <div class="container">
                <div class="content">
                    <div class="title">
                        <Button id="close" @click="toggle" xsm><i class="icon-close"></i> </Button>
                        <slot v-if="$slots.title" name="title" />
                    </div>
                    <div class="body">
                        <slot v-if="$slots.body" name="body" :data="data" />
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
}

.bg {
    background-color: rgba(0, 0, 0, 0.5);
}

.container {
    position: relative;
    width: v-bind("$attrs.width");
    height: v-bind("$attrs.height");
    background-color: white;
    border-radius: .5rem;
    overflow: auto;

}

#close {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
}
</style>