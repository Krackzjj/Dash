<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps<{
    label?: string
    maxLength?: string
    indicator?: boolean
}>()
const textarea = ref<HTMLElement>()

const text = ref<string | undefined>('')
const count = ref<number | undefined>()

const emit = defineEmits<{
    handleText: [value: {
        text: string,
        errors: string[]
    }]
}>()


const errors = computed(() => {
    let errors: string[] = []
    if (count.value === 0 || props.maxLength && count.value && count.value > parseInt(props.maxLength)) {
        errors = [...errors, `Le nombre de caractères doit être compris entre 1 et ${props.maxLength}.`]
    }
    return errors
})

let handleValue = (event: Event) => {
    let target = event.target as HTMLElement
    text.value = target.innerText
    if (target.innerText === '') {
        count.value = 0
        emit('handleText', { text: '', errors: errors.value })
    } else {
        count.value = target.innerText.length
        emit('handleText', { text: target.innerText, errors: [...errors.value] })
    }
}

const classes = computed(() => {
    return {
        ['border-danger[i]']: count.value && count.value > 160,
        ['border-success[i]']: count.value && count.value <= 160 && count.value > 0,
    }
})

</script>

<template>
    <div class="textarea-container">
        <label v-if="props.label" :for="props.label">{{ label }}</label>
        <div class="textarea-group">
            <div ref="textarea" class="textarea" :class="classes" v-bind="$attrs" :name="props.label"
                :contenteditable="true" @input="handleValue($event)">
            </div>
            <p v-if="props.maxLength" class="count"><span
                    :class="`text-${count && parseInt(props.maxLength) < count ? 'danger bold' : 'success'}`">{{ count
                    }}</span>/{{ props.maxLength }} caractères</p>
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
    border: 1px solid #ccc;
    overflow: hidden;
    text-overflow: clip;
    padding: 1rem;
    border-radius: .5rem;
    min-height: 10rem;

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

.count {
    position: absolute;
    bottom: .35rem;
    right: .5rem;
    font-size: 12px;
    color: #4d4d4d;
}
</style>