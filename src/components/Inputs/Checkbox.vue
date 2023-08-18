<script setup lang="ts">
import { ref, computed } from 'vue'
import { type NameColorType } from '@/types/Components/General';

const props = defineProps<{
    modelValue: boolean
    label: string
    type: NameColorType
    disabled?: boolean
    indicator?: boolean
    rules?: Record<string, unknown>
}>()
const checked = ref(props.modelValue)

const classes = computed(() => {
    return {
        ['checkbox-input']: true,
        [`border`]: true,
        [`bg-${props.type ?? 'primary'}`]: checked.value,
        ['disabled']: props.disabled,
        ['checked']: checked.value,
        ['pointer']: !props.disabled
    }
})

const handleClick = () => {
    if (!props.disabled) {
        checked.value = !checked.value
    }
}

</script>

<template>
    <div class="checkbox">
        <label :for="props.label.toLowerCase()">{{ props.label }}<span v-if="props.rules?.required"
                class="text-danger">*</span> :</label>
        <div :class="classes" @click="handleClick" v-bind="{ ...$attrs }">
            <i v-if="checked" class="icon-check"></i>
        </div>
        <input :id="props.label.toLowerCase()" type="checkbox" :checked="checked" v-model="checked">
    </div>
</template>

<style scoped lang="scss">
div.checkbox {
    display: flex;
    align-items: center;
    gap: .5rem;
}

input {
    display: none;
}

label {
    user-select: none;
}

.checkbox-input {
    width: 1rem;
    height: 1rem;
    padding: .5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-color);
}
</style>