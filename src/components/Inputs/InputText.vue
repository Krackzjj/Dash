<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { type Rules } from '@/types/Components/InputsValidation/Text';

interface Props {
    label: string
    indicator?: boolean
    rules?: Rules
    opts?: {
        [key: string]: boolean
    }
}

const props = defineProps<Props>()
const emit = defineEmits<{
    input: [value: {
        text: string,
        errors: string[]
    }]
}>()

let data = ref<string | undefined>()

const errors = computed(() => {
    let errors: string[] = []
    if (props.rules?.required && data.value === '') {
        errors = [...errors, 'le champs est requis']
    }
    if (props.rules?.maxLength && data.value && data.value.length > props.rules.maxLength) {
        errors = [...errors, `le champs ne doit pas dépasser ${props.rules.maxLength} caractères`]
    }
    if (props.rules?.minLength && data.value && data.value.length < props.rules.minLength) {
        errors = [...errors, `le champs doit contenir au moins ${props.rules.minLength} caractères`]
    }
    return errors
})

const classes = computed(() => {
    let maxLength = props.rules?.maxLength
    let minLength = props.rules?.minLength
    let required = props.rules?.required
    return {
        ['border-danger[i]']: maxLength && data.value && data.value.length > maxLength || minLength && data.value && data.value.length < minLength || required && (data.value === '' || data.value === '\n' || data.value === '&nbsp;')
    }
})

watch(data, (value) => {
    if (value === '' || value === '\n' || value === '&nbsp;' || value === undefined) {
        emit('input', { text: '', errors: errors.value })
    } else {
        emit('input', { text: value, errors: [...errors.value] })
    }
})


</script>
<template>
    <div>
        <div class="input-group">
            <label :for="props.label.toLowerCase()">{{ props.label }}<span v-if="props.rules?.required"
                    class="text-danger">*</span></label>
            <input :class="classes" type="text" :placeholder="props.label" v-model="data" v-bind="$attrs" />
            <div v-if="props.indicator" class="text-danger text-xs">
                <p v-for="error in errors">{{ error }}</p>
            </div>
            <p v-if="props.rules?.default" class="text-info text-xs">default : {{ props.rules?.default }}</p>
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
}
</style>