<script setup lang="ts">
import { ManipulateType } from 'dayjs';
import { computed, ref, onMounted } from 'vue'
import { type NameColorType } from '@/types/Components/General';
import dayjs from 'dayjs';


const props = defineProps<{
    startDate: Date,
    additionalTime: { number: number, unit: ManipulateType },
    id: string,
    opts?: {
        color?: NameColorType
    }
}>()

let emit = defineEmits<{
    expired: [value: { value: boolean, id: string }]
}>()

const classesInner = computed(() => {
    return {
        [`bg-${props.opts?.color ?? 'primary'}`]: true,
    }
})


const NOW = ref(dayjs())

const times = (date: Date) => {
    const deleted_at = dayjs(date)
    const endDate = dayjs(date).add(props.additionalTime.number, props.additionalTime.unit)

    const totalDuration = endDate.diff(deleted_at, 'seconds')
    const elapsed = NOW.value.diff(deleted_at, 'seconds')
    const ratio = elapsed / totalDuration * 100

    return {
        width: ratio > 100 ? '100%' : ratio + '%',
    }
}

const progress = computed(() => times(props.startDate))

onMounted(() => {
    let interval = setInterval(() => {
        NOW.value = dayjs()
        if (progress.value.width === '100%') {
            emit('expired', { value: true, id: props.id })
            clearInterval(interval)
        }
    }, 1000)
})


</script>

<template>
    <div class="progress-bar info">
        <span class="span-text" :class="parseInt(progress.width) > 50 ? 'text-secondary' : 'text-bright-info'">{{
            parseInt(progress.width).toFixed() + '%' }}</span>
        <div :class="classesInner" class="progress-bar-inner" :style="progress">
        </div>
    </div>
</template>

<style scoped lang="scss">
.progress-bar {
    //
    width: 30%;
    height: 30px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;
    border: 1px solid var(--primary-color);

    .span-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .progress-bar-inner {
        //
        position: absolute;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: width 1s ease-out;


    }

    .info {
        border-color: var(--info-color);
    }


}
</style>