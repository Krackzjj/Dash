<script setup lang="ts">
import { ref, watch } from 'vue'
import HeaderCounter from '@/components/HeaderCounter.vue';
import ProgressBar from '@/components/ProgressBar.vue';

import { useGetTrashedImg, useDeleteImg } from '@/composables/useImg';
import { formatToHuman } from '@/utils/date'


const { data, isSuccess } = useGetTrashedImg()
const { mutate } = useDeleteImg()
const preview = ref<string>('')


const totrash = ref<{ value: boolean, id: string }[]>([])
const handleTotrash = ({ value, id }: { value: boolean, id: string }) => {
    totrash.value = [...totrash.value!, { value, id }]
}


watch(totrash, (val) => {
    if (val.length > 0) {
        for (const item of val) {
            mutate(item.id)
        }
    } else {
        return
    }
}, { deep: true })



</script>

<template>
    <div class="trash-container">
        <HeaderCounter label="total" :count="data?.length ?? 0" />
        <div class="inner-trash">
            <ul class="list">
                <li v-if="isSuccess" v-for="img in data" :key="img.id">
                    <div class="list-item">
                        <p>Nom: <span class="text-info" @click="preview = img.path">{{ img.name }}</span></p>
                        <p>Supprimer le {{ formatToHuman(img.deleted_at!) }} </p>
                        <div class="time-bar">
                            <span class="text-xs">Suppression en cours...</span>
                            <ProgressBar :opts="{ color: 'info' }" :startDate="new Date(img.deleted_at!)"
                                :additionalTime="{ number: 24, unit: 'hours' }" :id="img.id" @expired="handleTotrash" />
                        </div>
                        <div class=" actions-grp">
                            <Button size="xxs" color="info">Restaurer</Button>
                            <Button size="xxs" color="danger">Supprimer</Button>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="preview" class="preview">
                <img :src="preview" alt="preview" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
    width: 100%;
    gap: 1rem;
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
                flex-shrink: 1;
            }

            div.time-bar {
                flex: 1;
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