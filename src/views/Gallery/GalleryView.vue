<script setup lang="ts">
import _ from 'lodash';
import { onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { type imgType } from '@/schema/ImgSchema';
import { type Filter } from '@/components/Inputs/BadgePicker.vue'
import ZoomBOX from '@/components/ZoomBOX.vue';

import { useGetImg } from '@/composables/useImg';
import HeaderCounter from '@/components/HeaderCounter.vue';

const route = useRoute()

const emit = defineEmits<{
    select: [value: { id: string, name: string }[]],
    filters: [value: Filter[]]
}>()

const { data: imgs, isSuccess } = useGetImg()

interface SelectedImg {
    id?: string;
    state?: boolean;
    selected?: boolean;
}

const selected = ref<SelectedImg[]>([])

let hoveredImg = (id: string, state: boolean) => {
    let isRegister = selected.value.find((img) => img.id === id);
    if (!isRegister) {
        selected.value = [...selected.value, { id: id, state: state }];
    } else {
        isRegister.state = state;
    }
}
let isRegister = (id: string) => {
    let isSelected = selected.value.find((img) => img.id === id);
    if (isSelected && isSelected.selected) {
        return true
    }
    return isSelected?.state
}

let selectedImg = (mode?: 'uniq' | 'global' | 'none', id?: string) => {
    if (imgs.value && mode === 'global') {
        imgs.value.forEach((img, index) => {
            selected.value[index] = { id: img.id, selected: true };
        });
    } else if (imgs.value && mode === 'none') {
        imgs.value.forEach((img, index) => {
            selected.value[index] = { id: img.id, selected: false };
        });
    }
    else {
        let isRegister = selected.value.find((img) => img.id === id);
        if (!isRegister) {
            selected.value.push({ id: id, selected: true });

        } else {
            isRegister.selected = !isRegister.selected;
        }
    }
    let select = selected.value.filter((el) => el.selected === true).map((el) => {
        let img = imgs.value?.find((img) => img.id === el.id)
        return { id: el.id!, name: img?.name ?? '' }
    }) ?? []

    emit('select', select)
}

const view_type = ref(route.params.view ? route.params.view : 'grid')

function checkType(array: imgType[]) {
    let types: string[] = []
    array.forEach((img) => {
        if (img.type) {
            types.push(img.type)
        }
    })
    let count = _.countBy(types)
    let result = Object.keys(count).map((key) => {
        return { type: key, count: count[key] }
    })
    return result
}

watch(imgs, (value) => {
    if (value) {
        emit('filters', checkType(value))
    }
}, { immediate: true })

let $imgElement = ref()

let zoom = (path: string) => {
    $imgElement.value.$src = path
    $imgElement.value.zoom()
}

defineExpose({
    select: (opt: 'uniq' | 'global' | 'none') => selectedImg(opt),
})

onBeforeUnmount(() => {
    emit('select', [])
})

</script>
<template>
    <div class="container">
        <main v-if="view_type === 'grid'">
            <HeaderCounter :count="imgs?.length ?? 0" label="total" />
            <ul class="view-grid">
                <li v-if="(imgs && imgs.length > 0) && isSuccess" v-for="img in imgs" :key="img.id">
                    <Image @click.stop="zoom(img.path)" fake @mouseover="hoveredImg(img.id, true)"
                        @mouseleave="hoveredImg(img.id, false)" class="card" clickable :border="img.type" :type="img.type"
                        :src="img.path" :dimensions="img.dimensions" :title="img.name">
                        <div v-show="isRegister(img.id)" @click.stop="selectedImg('uniq', img.id)"
                            :class="`cercle ${selected.find(el => el.id === img.id)?.selected === true ? 'selected' : ''}`">
                        </div>
                    </Image>
                </li>
                <li v-else>Nothing Here...</li>
            </ul>
        </main>
        <main v-else>LIST</main>
        <ZoomBOX ref="$imgElement" />
    </div>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    width: calc(100vw - 10vw);
}

nav {
    min-height: 100%;
    padding: .5rem;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}

.maxify {
    min-width: 20vw;
    max-width: 20vw;
}

.shrink {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.tools {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

main {

    display: flex;
    width: 100%;
    flex-direction: column;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: hidden;
}

.view-grid {
    margin: .7rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2vmin;
    max-height: 100%;
    overflow-y: auto;

    li {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;
        height: 250px;
        width: 250px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.view-list {
    margin: .7rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2vmin;
    max-height: 100vh;
    max-width: 100vw;
    overflow: auto;


    li {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;
        height: 250px;
        width: 25%;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.card {
    position: relative;
}

.cercle {
    &.selected {
        background-color: var(--success-color);
        border: 2px solid white;

        &::before {
            content: '\f00c';
            font-family: 'icomoon';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            color: white;
        }
    }

    &:hover {
        transform: scale(1.05);
    }

    cursor: pointer;
    transition: opacity 0.2s transform 0.2s;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px var(--primary-color);
    border-style: dashed;
    background-color: whitesmoke;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 2;
}
</style>