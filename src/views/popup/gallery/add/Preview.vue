<script setup lang="ts">
import Loader from '@/components/progress/Loader.vue';
import { ref, watch, toRefs } from 'vue';


const props = defineProps<{
    url: string[]
}>()

const emit = defineEmits<{
    'update:dimensions': [value: { width: number, height: number }]
}>()

const { url } = toRefs(props)


const carrousel = ref<number>(url.value.length - 1)



const handleNext = () => {
    if (carrousel.value < props.url.length - 1) {
        carrousel.value++
    } else {
        carrousel.value = 0
    }
}

const handlePrevious = () => {

    if (carrousel.value > 0) {
        carrousel.value--
    } else {
        carrousel.value = props.url.length - 1
    }
}

watch(url, (newValue, oldValue) => {
    carrousel.value = newValue.length - 1
}, { deep: true })

</script>

<template>
    <div class="img-preview">
        <div>
            <img class="img" v-if="url.length > 0" :src="url[carrousel]" />
            <Loader class="buffer" v-else type="dot" />
            <div class="pagin-preview" v-if="url.length > 1">
                <Button size="xxs" @click="handlePrevious">
                    <template #icon>
                        <i class="icon-arrow-left"></i>
                    </template>
                </Button>
                <Button size="xxs" @click="handleNext">
                    <template #icon>
                        <i class="icon-arrow-right"></i>
                    </template>
                </Button>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.img-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
    min-height: 80%;
    border-radius: 5px;
    overflow: hidden;
    position: relative;

    &>div:first-child {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
    }

    .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }
}

.pagin-preview {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    background-color: rgba(255, 250, 250, 0.761);
    padding: .5rem;
    border-radius: 5px;
    justify-content: center;
    gap: 1rem;
}
</style>