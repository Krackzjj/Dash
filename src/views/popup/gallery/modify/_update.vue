<script setup lang="ts">
import { computed, toRefs, ref, watch } from 'vue';
import { imgType } from '@/schema/ImgSchema';

const props = defineProps<{
    subject: imgType[]

}>()
const emit = defineEmits<{
    name: [string]
}>()

const { subject } = toRefs(props)

const name = computed(() => {
    if (subject.value.length > 0) {
        return subject.value[0].name
    } else {
        return [...subject.value?.map((img) => img.name)]
    }
})

const modelValue_ = ref({
    name: name.value,
})
watch(modelValue_.value, () => {
    if (subject.value.length > 0) {
        emit('name', modelValue_.value.name as string)
    }
})


</script>

<template>
    <div class="main mt-2">
        <div class="recap">
            <Chip :label="subject[0].type" type="info" />
        </div>
        <!-- on fera un select si subject.length > 1 qui permettra de choisir l'image à modifier
        sinon directement l'input -->
        <InputText label="Nom" :rules="{ required: true }" v-model="modelValue_.name" />
        <Checkbox label="Publié" type="info" v-model="subject[0].published" />
    </div>
</template>

<style scoped lang="scss">
.recap {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>