<script setup lang="ts">
import { ref, toRefs } from 'vue';

import { imgSchemaType } from '@/schema/ImgSchema';
import InputText from '@/components/Inputs/InputText.vue';
import Textarea from '@/components/Inputs/TextArea.vue';

type context = {
    action: 'add' | 'edit'
    subject?: imgSchemaType
}

const props = defineProps<{
    context: context

}>()

const { context } = toRefs(props)

const choice = ref(false)

const url = ref<string>()

const description = ref<string>('')


const handleAdd = () => {
    console.log('add')
}

let handleText = (value: { text: string, errors: string[] }) => {
    if (value.errors.length > 0) {
        description.value = ''
    } else {
        description.value = value.text
    }
}



</script>

<template>
    <div class="container">
        <h2>{{ context.action }} une image</h2>
        <div class="choice-maker">
            <Button :hollow="choice" @click="choice = !choice">Via URL</Button>
            <Button :hollow="!choice" @click="choice = !choice">Ajouter</Button>
        </div>
        <InputText label="Url" placeholder="Url de l'image" v-model="url" />
        <div class="img-desc">
            <img class="img-preview" :src="url">
            <div class="img-inputs">
                <InputText label="Nom" placeholder="Nom de l'image" />
                <Textarea label="textarea" maxLength="160" width="700px" @handleText="handleText" indicator />
                <Button @click="handleAdd" :disabled="description === '' ? true : false">Ajouter</Button>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

}

.choice-maker {
    display: flex;
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