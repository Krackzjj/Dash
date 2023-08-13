<script setup lang="ts">
import { ref, toRefs } from 'vue'

import { imgType } from '@/schema/ImgSchema';

import { nanoid } from 'nanoid'
import { usePostImg } from '@/composables/useImg';

import url from './_url.vue';

type context = {
    callables: {
        toggle: () => void
    }
    action: 'add' | 'edit'
    subject?: imgType
}

const props = defineProps<{
    context: context

}>()

const { context } = toRefs(props)

const { mutate } = usePostImg()


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
        let type = dto.url.split('.').pop()


        const newDTO: Partial<imgType> = {
            id: nanoid(),
            name: dto.name,
            path: dto.url,
            type: type as string,
            external: dto.external,
            dimensions: dto.dimensions,
            description: dto.description,
            published: false
        }
        mutate(newDTO, {
            onSuccess: () => {
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
    <div>
        <h2>{{ context.action }} une image</h2>
        <div class="choice-maker">
            <Button :hollow="choice" @click="choice = !choice">Via URL</Button>
            <Button :hollow="!choice" @click="choice = !choice">Ajouter</Button>
        </div>
        <url v-if="!choice" @addbyURL="handleDTO" />
    </div>
</template>

<style scoped lang="scss">
div:first-child {
    width: 100%;
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