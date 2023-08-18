<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { type Rules } from '@/types/Components/InputsValidation/Text';

interface Props {
    modelValue?: string
    label: string
    indicator?: boolean
    rules?: Rules
    opts?: {
        [key: string]: string | number | boolean | undefined
    }
}

const props = defineProps<Props>()
const emit = defineEmits<{
    input: [value: {
        text: string,
        errors: string[]
    }]
    custom: [boolean]
}>()

const disabledOpts = ['focus']

const errors = computed(() => {
    let errors: string[] = []
    if (props.rules?.required && props.modelValue === '') {
        errors = [...errors, 'le champs est requis']
    }
    if (props.rules?.maxLength && props.modelValue && props.modelValue.length > props.rules.maxLength) {
        errors = [...errors, `le champs ne doit pas dépasser ${props.rules.maxLength} caractères`]
    }
    if (props.rules?.minLength && props.modelValue && props.modelValue.length < props.rules.minLength) {
        errors = [...errors, `le champs doit contenir au moins ${props.rules.minLength} caractères`]
    }
    return errors
})

const classes = computed(() => {
    let maxLength = props.rules?.maxLength
    let minLength = props.rules?.minLength
    let required = props.rules?.required
    return {
        ['border']: true,
        ['border-danger']: maxLength && props.modelValue && props.modelValue.length > maxLength || minLength && props.modelValue && props.modelValue.length < minLength || required && (props.modelValue === '' || props.modelValue === '\n' || props.modelValue === '&nbsp;')
    }
})

const modelValue = ref(props.modelValue)
watch(modelValue, (value) => {
    if (value === '' || value === '\n' || value === '&nbsp;' || value === undefined) {
        emit('input', { text: '', errors: errors.value })
    } else {
        emit('input', { text: value, errors: [...errors.value] })
    }
})


const handleClickOnCross = () => {
    emit('custom', true)
    modelValue.value = ''
}

const $input = ref<HTMLInputElement>()
onMounted(() => {
    if (props.opts?.focus) {
        $input.value?.focus()
    }
})

</script>
<template>
    <div>
        <div class="input-group">
            <label :for="props.label.toLowerCase()">{{ props.label }}<span v-if="props.rules?.required"
                    class="text-danger">*</span></label>
            <div class="input" :class="classes">
                <input type="text" :placeholder="props.label" v-model="modelValue" v-bind="{ ...$attrs }" ref="$input" />
                <Chip class="chip" type="info" icon="close" @click="handleClickOnCross" />
            </div>
            <div v-if="props.indicator" class="text-danger text-xs">
                <p v-for="error in errors">{{ error }}</p>
            </div>
            <div class="opts" v-if="props.opts">
                <p v-for="[key, opt] in Object.entries(props.opts)" v-if="props.opts" class="text-info text-xs">
                    <template v-if="!disabledOpts.includes(key)">
                        <span class="key">{{ key }}</span>: {{ opt }}
                    </template>
                </p>
            </div>
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

.key {
    text-transform: capitalize;
}

.input-group {
    width: 100%;
    gap: 0;

    .input {
        width: 100%;
        display: flex;
        align-items: center;
        gap: .5rem;
        flex-direction: row;
        border-radius: .5rem;
        padding: .5rem;

        input {
            flex-grow: 1;
            outline: none;
            border: none;
            transition: border-color 0.3s ease-in-out;

            &::placeholder {
                color: #ccc;
            }
        }

        .chip {
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
            background-color: transparent;
            border: 1px solid var(--primary-color);
            scale: .8;
            color: var(--primary-color);

            &:hover {
                background-color: var(--primary-color);
                color: white;
            }
        }
    }

}
</style>