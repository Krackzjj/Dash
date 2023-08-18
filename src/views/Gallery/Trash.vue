<script setup lang="ts">
import { envConfig as env } from '@/schema/envSchema';
import { ref, watch } from 'vue'
import HeaderCounter from '@/components/HeaderCounter.vue';
import ProgressBar from '@/components/progress/ProgressBar.vue';

import { useGetTrashedImg, useRestoreImg, useForceDelete } from '@/composables/useImg';
import { formatToHuman } from '@/utils/date'
import { imgType } from '@/schema/ImgSchema';


const { data, isSuccess } = useGetTrashedImg()
const { mutate: force } = useForceDelete()
const { mutate: restore } = useRestoreImg()
const preview = ref<string>('')


const totrash = ref<{ value: boolean, id: string }[]>([])
const handleTotrash = ({ value, id }: { value: boolean, id: string }) => {
    totrash.value = [...totrash.value!, { value, id }]
}


watch(totrash, (val) => {
    if (val.length > 0) {
        for (const item of val) {
            force(item.id)
            totrash.value.splice(totrash.value.indexOf(item), 1)
            preview.value = ''
        }
    } else {
        return
    }
}, { deep: true })

let handleForceDelete = (img: imgType) => {
    force(img.id)
    if (preview.value !== '' && img.path === preview.value) {
        preview.value = ''
    }
}

let handleRestore = (img: imgType) => {
    restore(img.id)
    if (preview.value !== '' && img.path === preview.value) {
        preview.value = ''
    }
}

const $helper = ref()
const helper_data = ref()
const helping_id = ref<string>()
const helper = (type: 'info' | 'force', id?: string) => {
    helping_id.value = id
    if (type === 'info') {
        helper_data.value = {
            type: 'info',
            validation: false,
            name: 'Informations utiles',
            description: `Les images supprimées sont conservées pendant une durée de ${env.TRASH_LIFETIME} ${env.TRASH_LIFETIME_UNIT}. Au delà de cette durée, elles seront définitivement supprimées.`
        }
    } else {
        helper_data.value = {
            type: 'danger',
            validation: true,
            name: 'Suppression définitive',
            description: `Cette action est irréversible. Voulez-vous vraiment supprimer définitivement ces images ?`
        }
    }
    $helper.value?.dialog.open()
}

const handleDialogReply = (dialog_response: { context: string, state: boolean }) => {
    if (dialog_response.context === 'danger' && dialog_response.state === true) {
        handleForceDelete(data.value?.find((img) => img.id === helping_id.value) as imgType)
        totrash.value = []
    }
}

</script>

<template>
    <div class="trash-container">
        <header>
            <HeaderCounter label="total" :count="data?.length ?? 0" />
            <button @click="helper('info')" class="icon-info-circle-w"></button>
            <Dialog ref="$helper" :opts="helper_data" @reply="handleDialogReply">
                <template #title="{ slotProps }">
                    <h3 class="mb-2">{{ slotProps?.name }}</h3>
                    <p>{{ slotProps?.description }}</p>
                </template>
            </Dialog>
        </header>
        <div v-if="data && data?.length > 0 && isSuccess" class="inner-trash">
            <ul class="list">
                <li v-for="img in  data " :key="img.id">
                    <div class="list-item">
                        <p>Nom: <span class="text-info" @click="preview = img.path">{{ img.name }}</span></p>
                        <p>Supprimer le {{ formatToHuman(img.deleted_at!) }} </p>
                        <div class="time-bar">
                            <span class="text-xs">Suppression en cours...</span>
                            <ProgressBar :opts="{ color: 'info' }" :startDate="new Date(img.deleted_at!)"
                                :additionalTime="{ number: env.TRASH_LIFETIME, unit: env.TRASH_LIFETIME_UNIT }" :id="img.id"
                                @expired="handleTotrash" />
                        </div>
                        <div class=" actions-grp">
                            <Button size="xxs" color="info" @click="handleRestore(img)">Restaurer</Button>
                            <Button size="xxs" color="danger" @click="helper('force', img.id)">Supprimer</Button>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="preview" class="preview">
                <img :src="preview" alt="preview" />
            </div>
        </div>
        <div v-else class="inner-trash mt-2">
            <p>La corbeille est vide...</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
header {
    display: flex;
    align-items: baseline;
    gap: 1rem;

    button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: medium;
        color: #ccc;

        &:hover {
            color: #000;
        }
    }
}

.time-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.trash-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 95%;
    margin: 0 auto;
}

.inner-trash {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 95%;
    gap: 1rem;
    margin-inline: auto;
}

.list {
    margin-top: 1rem;
    width: 100%;

    li {
        display: flex;
        padding: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

        .list-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            gap: 1rem;

            p {
                flex: 1;
            }

            div.time-bar {
                flex: 5;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            div:last-child {
                flex-shrink: 1;
            }
        }
    }
}


.preview {
    width: 300px;
    height: 300px;
    border: 1px solid black;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.text-info {
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}

// .list-item {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
// }

.actions-grp {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>