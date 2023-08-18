<script setup lang="ts">
import { ref } from 'vue';

import InputText from '@/components/Inputs/InputText.vue';
import Textarea from '@/components/Inputs/TextArea.vue';


import Preview from './Preview.vue';
import AddUrl from './AddUrl.vue';
import { toRaw } from 'vue';



interface DTOType {
    description: string[]
    name: string[]
    url: string[]
    external: boolean[]
}

const emit = defineEmits<{
    addbyURL: [value: DTOType]
}>()

const description = ref<string>('')
const url = ref<string[]>([])
const name = ref<string[]>([])

const DTO = ref<DTOType>()

const handleAdd = () => {
    let description_ = description.value || 'Aucune description'
    let time = Object.keys(url.value).length

    const external = new Array(time).fill(true)

    DTO.value = {
        description: new Array(time).fill(''),
        name: new Array(time).fill('name'),
        url: toRaw(url.value),
        external
    }

    if (DTO.value) {
        emit('addbyURL', DTO.value)
    } else {
        console.log('no DTO')
    }
}


let handleText = (value: { text: string, errors: string[] }) => {
    if (value.errors.length > 0) {
        description.value = ''
    } else {
        description.value = value.text
    }
}

const handleMoreUrl = (value: string[]) => {
    url.value = value
}


</script>

<template>
    <div class="url-form">
        <AddUrl @update:modelValue="handleMoreUrl" />
        <div class="img-desc">
            <Preview :url="url" />
            <div class="img-inputs">
                <!-- <InputText v-if="multiple_add.length <= 1" label="Nom" placeholder="Nom de l'image" indicator
                    :opts="{ default: 'test' }" v-model="name[0]" /> -->
                <!-- <select v-else name="test">
                    <option value="" selected>Select Custom avec input intégré</option>
                </select> -->
                <Textarea label="Description" :rules="{ maxLength: 160 }" @handleText="handleText" indicator />
                <Button @click="handleAdd" :disabled="!true">
                    Ajouter
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.btn-grp {
    margin-top: 0;
}

.size-info {
    display: flex;
    align-items: center;
    height: 1rem;
}

.url-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.img {
    &-desc {
        width: 100%;
        display: flex;
        gap: 1rem;
    }

    &-inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
}
</style>