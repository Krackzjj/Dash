<script setup lang="ts">
import { ref, computed } from 'vue';

import { type Rules } from '@/types/Components/InputsValidation/Text';

const props = defineProps<{
    modelValue?: string
    label?: string
    rules?: Rules
    indicator?: boolean
}>()
const textarea = ref<HTMLElement>()

const modelValue = ref(props.modelValue)
const count = ref<number | undefined>()

const emit = defineEmits<{
    handleText: [value: {
        text: string,
        errors: string[]
    }]
}>()


const errors = computed(() => {
    let errors: string[] = []
    if (props.rules?.required && props.modelValue === '') {
        errors = [...errors, 'le champs est requis']
    }
    if (props.rules?.maxLength && count.value && count.value > props.rules.maxLength) {
        errors = [...errors, `le champs ne doit pas dépasser ${props.rules.maxLength} caractères`]
    }
    if (props.rules?.minLength && count.value && count.value < props.rules.minLength) {
        errors = [...errors, `le champs doit contenir au moins ${props.rules.minLength} caractères`]
    }
    return errors
})

let handleValue = (event: Event) => {
    let target = event.target as HTMLElement
    modelValue.value = target.innerText
    if (target.innerText === '' || modelValue.value === '\n') {
        count.value = 0
        emit('handleText', { text: '', errors: errors.value })
    } else {
        count.value = target.innerText.length
        emit('handleText', { text: target.innerText, errors: [...errors.value] })
    }
}

const classes = computed(() => {
    let maxLength = props.rules?.maxLength
    let minLength = props.rules?.minLength
    let required = props.rules?.required
    return {
        ['border']: true,
        ['border-danger']: maxLength && count.value && count.value > maxLength || minLength && count.value && count.value < minLength || required && (props.modelValue === '' || props.modelValue === '\n' || props.modelValue === '&nbsp;')
    }
})

</script>

<template>
    <div class="textarea-container">
        <label v-if="props.label" :for="props.label">{{ label }}<span v-if="props.rules?.required"
                class="text-danger">*</span></label>
        <div class="textarea-group">
            <div ref="textarea" class="textarea" :class="classes" v-bind="{ ...$attrs }" :name="props.label"
                :contenteditable="true" @input="handleValue($event)">
            </div>
            <p v-if="props.rules?.maxLength" class="count"><span
                    :class="`text-${count && props.rules.maxLength < count ? 'danger bold' : 'success'}`">{{ count
                    }}</span>/{{ props.rules.maxLength }} caractères</p>
        </div>
        <div class="text-danger text-xs" v-if="props.indicator">
            <p v-for="error in errors">{{ error }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.textarea-container {
    position: relative;
    display: block;
    overflow: hidden;
    min-width: 100%;
    max-width: 500px;
}

.textarea {
    max-width: 100%;
    overflow: hidden;
    text-overflow: clip;
    padding: 1rem;
    border-radius: .5rem;
    min-height: 10rem;
    cursor: text;

    span {
        color: var(--primary-color) !important
    }

    &:focus {
        outline: none;
    }
}

.textarea-group {
    position: relative;
}

.textarea-placeholder {
    font-size: 0.8rem;
    color: #ccc;
    position: absolute;
    user-select: none;

}

.count {
    position: absolute;
    bottom: .35rem;
    right: .5rem;
    font-size: 12px;
    color: #4d4d4d;
}
</style>