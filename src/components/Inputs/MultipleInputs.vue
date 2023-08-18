<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import Chip from '../Chip.vue';
import { watch } from 'vue';
import { onUpdated } from 'vue';

const props = defineProps<{
    label: string
}>()

const { label } = toRefs(props)


const classes = computed(() => {
    return {
        'inputs-container': true,
    }
})



const $input = ref<HTMLElement>()
const text = ref<string[]>([])
const handleText = (e: KeyboardEvent) => {
    let target = e.target as HTMLInputElement
    if (e.key == ',') {
        text.value = [...text.value, target.value.replace(',', '').trim()]
        target.value = ''
    } else if (e.key == 'Backspace' && target.value === '') {
        text.value = text.value.slice(0, -1)
    } else {
        return
    }
}



</script>

<template>
    <div class="multiple-inputs-container">
        <div class="chips-container m-1">
            <Chip v-if="text[0] !== '' && text.length > 0" v-for="item, index in  text " :key="index" class="pointer"
                :label="item.length > 5 ? item.substring(0, 5) + '...' : item" type="info" size="xxs" icon="close" />
        </div>
        <input ref="$input" class="t" :class="classes" v-bind="{ ...$attrs }" @keyup="handleText" />
    </div>
</template>

<style scoped lang="scss">
.multiple-inputs-container {
    display: flex;
    flex-direction: column;
    height: max-content;
}

.chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: .2rem;
}

.t {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    cursor: text;
}
</style>