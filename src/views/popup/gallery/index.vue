<script setup lang="ts">
import { computed, toRefs, ref } from 'vue'

import { extract } from '@/utils/extractExt.ts'

import { imgType } from '@/schema/ImgSchema';

import { nanoid } from 'nanoid'
import { usePostImg } from '@/composables/useImg';
import { useGetImgById } from '@/composables/useImg';

import URL from '@/views/popup/gallery/add/_url.vue'
import UPDATE from '@/views/popup/gallery/modify/_update.vue'
import Loader from '@/components/progress/Loader.vue';

type context = {
    callables: {
        toggle: () => void
    }
    action?: 'add' | 'edit'
    subject?: { id: string, name: string }
    via?: string
}

const props = defineProps<{
    context: context

}>()
const { mutate, isLoading } = usePostImg()
const { data: img, isSuccess } = useGetImgById(props.context.subject?.id as string)

const { context } = toRefs(props)

const is = computed(() => {
    return context.value.action === 'add' ? 'Ajout' : 'Modification'
})



const choice = ref(false)

interface DTOType {
    description: string[]
    name: string[]
    url: string[]
    external: boolean[]
}



const handleDTO = (dto: DTOType) => {
    if (context.value.action === 'add') {
        for (let i = 0; i < dto.url.length; i++) {
            const newDTO: Partial<imgType> = {
                id: nanoid(),
                name: dto.name[i],
                path: dto.url[i],
                type: extract(dto.url[i]) as string,
                external: dto.external[i],
                description: dto.description[i],
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
        }
    }
}

const uiName = ref<string | undefined>(context.value.subject?.name)

const handleUiName = (name: string) => {
    uiName.value = name
}

</script>

<template>
    <div v-if="!isLoading">
        <h2>{{ is }}
            <span class="text-info udl">{{ context.action === 'edit' && context.subject && uiName || null
            }}</span>
            {{ is === 'Ajout' ? 'à' : 'provenant de' }}
            {{ context.via }}
        </h2>
        <!-- reflechir pour ne pas laissé "provenant de gallery" -->
        <div v-if="context.action === 'add'" class="choice-maker">
            <Button :hollow="choice" @click="choice = !choice">Via URL</Button>
            <Button :hollow="!choice" @click="choice = !choice">Ajouter</Button>
        </div>
        <div>
            <URL v-if="!choice && context.action === 'add'" @addbyURL="handleDTO" />
            <UPDATE v-else-if="context.action === 'edit' && context.subject && isSuccess" :subject="(img as imgType[])"
                @name="handleUiName" />
        </div>
    </div>
    <Loader class="buffer" v-else type="dot" size="l" />
</template>
<style scoped lang="scss">
div:first-child {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.buffer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.choice-maker {
    display: flex;
    gap: 1rem;
}
</style>