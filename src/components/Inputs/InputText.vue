<script setup lang="ts">
import { ref, watch } from 'vue';
interface Props {
    label: string
    indicator?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    input: [value: string]
}>()

let data = ref('')

watch(data, (value) => {
    emit('input', value)
})

</script>


<template>
    <div>
        <label for="">{{ props.label }}</label>
        <div class="input-group">
            <input type="text" v-bind="$attrs" v-model="data" :placeholder="props.label">
            <p id="sub">{{ props.indicator }}</p>
        </div>
    </div>
</template>


<style scoped lang="scss">
div {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: .5rem;
}

.input-group {
    width: 100%;
    gap: 0;

    input {
        width: 100%;
        padding: .5rem;
        border-radius: .5rem;
        border: 1px solid #ccc;
        outline: none;
        transition: border-color 0.3s ease-in-out;

        &::placeholder {
            color: #ccc;
        }
    }

    #sub {
        font-size: 12px;
        color: #ccc;
    }
}
</style>