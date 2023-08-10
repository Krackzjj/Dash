<script setup lang="ts">
import { computed, ref } from 'vue';

import InputText from '@/components/Inputs/InputText.vue';
import Textarea from '@/components/Inputs/TextArea.vue';


import { IMG_TYPES } from '@/types/general.ts';

const emit = defineEmits<{
    addbyURL: [value: {
        description: string,
        dimensions: string,
        url: string,
        name: string,
        external: boolean
    }]
}>()

const description = ref<string>('')
const url = ref<string>('')
const name = ref<string>('')
const dimensions = ref<string>('')

const DTO = ref({
    description,
    name,
    url,
    dimensions,
    external: true
})

const handleAdd = () => {
    let name_ = url.value.split('/').pop()?.split('.')[0] as string
    let description_ = description.value || 'Aucune description'
    DTO.value = {
        ...DTO.value,
        name: name.value || name_,
        description: description_,
        dimensions: dimensions.value,
        url: url.value
    }
    if (!DTO.value.url) return
    emit('addbyURL', DTO.value)
}

let handleText = (value: { text: string, errors: string[] }) => {
    if (value.errors.length > 0) {
        description.value = ''
    } else {
        description.value = value.text
    }
}


const url_valid = computed(() => {
    let type = url.value.split('.').pop()
    if (type && type in IMG_TYPES) {
        return {
            state: true,
            url: url.value,
        }
    } else {
        return {
            state: false,
            url: 'https://via.placeholder.com/200x200.png?text=Image+not+found'
        }
    }
})

let checkDims = (url: string) => {
    const img_dim = new Image();
    img_dim.src = url;
    img_dim.onload = function () {
        let width = img_dim.width
        let height = img_dim.height
        dimensions.value = `${width}x${height}`
    }
}

</script>

<template>
    <div class="url-form">
        <InputText label="Url" placeholder="Url de l'image" v-model="url" :rules="{ required: true }" />
        <div class="img-desc">
            <img class="img-preview" :src="url_valid.url" @load="checkDims(url)">
            <div class="img-inputs">
                <InputText label="Nom" placeholder="Nom de l'image" indicator
                    :rules="{ default: url?.split('/').pop()?.split('.')[0] }" v-model="name" />
                <Textarea label="Description" :rules="{ maxLength: 160 }" width="700px" @handleText="handleText"
                    indicator />
                <Button @click="handleAdd" :disabled="url_valid.state === false">Ajouter</Button>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.url-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.img {
    &-desc {
        width: 100%;
        display: flex;
        gap: 1rem;
    }

    &-preview {
        width: 200px;
        max-height: 60vh;
        object-fit: cover;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    &-inputs {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

}
</style>