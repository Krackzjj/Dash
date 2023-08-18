<script setup lang="ts">
import { watch } from 'vue';
import { ref } from 'vue';

const emit = defineEmits<{
    'update:modelValue': [value: string[]]
}>()

const urls = ref<string[]>([""])

const handleMoreInput = () => {
    if (urls.value.length >= 5) return
    urls.value.push('')
}
const handleMinusInput = () => {
    if (urls.value.length <= 1) return
    urls.value.pop()
}

watch(urls, (value) => {
    let notempty = value.filter((url) => url !== '')
    emit('update:modelValue', notempty)
}, { deep: true })

</script>

<template>
    <div>
        <template v-for="url, index in urls" :key="index">
            <InputText :label="index === 0 ? 'Url' : ''"
                :placeholder="`Url de l'image${index === 0 ? '' : '-' + (index + 1)}`" v-model="urls[index]"
                :opts="{ focus: index === 0 ? true : false }" :class="index !== urls.length - 1 ? 'mb-1' : ''"
                @custom="handleMinusInput" />
        </template>
        <div class="btn-grp flex gap-[0.5]">
            <Button :disabled="urls.length >= 5" size="xxs" class="mt-1" @click="handleMoreInput">
                <template #icon>
                    <i class="icon-plus"></i>
                </template>
            </Button>
            <Button :disabled="urls.length <= 1" size="xxs" class="mt-1" @click="handleMinusInput">
                <template #icon>
                    <i class="icon-minus"></i>
                </template>
            </Button>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>