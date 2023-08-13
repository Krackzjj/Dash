<script setup lang="ts">
import { ref } from 'vue';
import Badge from '../Badge.vue';

export type Filter = {
    type: string;
    count: number;
}
interface Props {
    label?: string
    opts?: Filter[]
}

const props = defineProps<Props>()




const handleClick = (index: number) => {
    if (selectedOpt.value.includes(index)) {
        selectedOpt.value = selectedOpt.value.filter(opt => opt !== index)
        console.log(selectedOpt.value)
    } else {
        selectedOpt.value.push(index)
    }
}
let selectedOpt = ref<number[]>([])

</script>


<template>
    <div>
        <h4 v-if="props.label">{{ props.label }}</h4>
        <div class="opts">
            <Badge class="opt" v-for="opt, index in props.opts" :key="index" :backgroundColor="opt.type"
                :class="`${selectedOpt?.includes(index) ? 'opt-active' : ''}`" @click="handleClick(index)">{{ opt.type
                }}
                <i>({{
                    opt.count }})</i>
            </Badge>
        </div>
    </div>
</template>


<style scoped lang="scss">
div:not(.opts) {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: .5rem;
}

.opts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: .5rem;
    gap: .5rem;
    width: 100%;
    margin: 0 auto;
    border-radius: 5px;
    background-color: white;

    .opt {
        cursor: pointer;
        opacity: .5;
    }

    .opt-active {
        opacity: 1;
    }

    i {
        font-style: normal;
        font-weight: normal;
    }

}
</style>