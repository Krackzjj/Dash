<script setup lang="ts">
import { ref, toRefs } from 'vue'

import { imgSchemaType } from '@/schema/ImgSchema';
import { IMG_TYPES } from '@/types/general';

import { nanoid } from 'nanoid'
import { post } from '@/repositories/img.ts'
import { useMutation } from '@tanstack/vue-query';

import url from './_url.vue';

type context = {
    callables: {
        toggle: () => void
        refetch: () => void
    }
    action: 'add' | 'edit'
    subject?: imgSchemaType
}

const props = defineProps<{
    context: context

}>()

const { context } = toRefs(props)

const { mutate } = useMutation({
    mutationKey: ['addImg'],
    mutationFn: (dto: imgSchemaType) => post(dto),
})


const choice = ref(false)

type DTO = {
    description: string
    name: string
    url: string
    dimensions: string
    external: boolean
}

const handleDTO = (dto: DTO) => {
    if (context.value.action === 'add') {
        const newDTO: imgSchemaType = {
            id: nanoid(),
            name: dto.name,
            path: dto.url,
            type: dto.url.split('.').pop() as keyof typeof IMG_TYPES,
            external: dto.external ? 1 : 0,
            dimensions: dto.dimensions,
            description: dto.description,
            published: 0
        }
        mutate(newDTO, {
            onSuccess: () => {
                context.value.callables.refetch()
                context.value.callables.toggle()
            },
            onError: () => {
                console.log('error')
            }
        })
    } else {
        console.log('edit')
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
        <url v-if="!choice" @addbyURL="handleDTO" />
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.choice-maker {
    display: flex;
    gap: 1rem;
}
</style>