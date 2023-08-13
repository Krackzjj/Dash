<script setup lang="ts">
import _ from 'lodash';

import { ref, watch } from 'vue';

import BadgePicker, { type Filter } from '@/components/Inputs/BadgePicker.vue';

import { type imgType } from '@/schema/ImgSchema';

import _gallery from '../popup/gallery/index.vue';
import _trash from './_trash.vue';
import ZoomBOX from '@/components/ZoomBOX.vue';
import Dialog from '@/components/Dialog.vue';

import { useGetImg } from '@/composables/useImg';
import HeaderCounter from '@/components/HeaderCounter.vue';

const { data: imgs, isSuccess } = useGetImg()


interface SelectedImg {
    id?: string;
    state?: boolean;
    selected?: boolean;
}

let selected = ref<SelectedImg[]>([])
let allSelected = ref(false);

let hoveredImg = (id: string, state: boolean) => {
    let isRegister = selected.value.find((img) => img.id === id);
    if (!isRegister) {
        selected.value.push({ id: id, state: state });
    } else {
        isRegister.state = state;
    }
}
let isHovered = (id: string) => {
    let isSelected = selected.value.find((img) => img.id === id && img.selected === true);
    if (isSelected) {
        return isSelected.selected;
    } else {
        return selected.value.find((img) => img.id === id)?.state;
    }
}

let selectedImg = (mode?: 'uniq' | 'global', id?: string) => {
    if (imgs.value && mode === 'global') {
        imgs.value.forEach((img, index) => {
            selected.value[index] = { id: img.id, selected: !allSelected.value };
        });
        allSelected.value = !allSelected.value;
    } else {
        let isRegister = selected.value.find((img) => img.id === id);
        if (!isRegister) {
            selected.value.push({ id: id, selected: true });
        } else {
            isRegister.selected = !isRegister.selected;
        }
    }
}


const view_type = ref<string>('grid')

const toolBarSize = ref<'minify' | 'maxify'>('minify')
const toolBarState = ref<boolean>(false)
let handleToolbar = () => {
    toolBarState.value = !toolBarState.value
    if (toolBarState.value === true) {
        toolBarSize.value = 'maxify'
    }
    if (toolBarState.value === false) {
        toolBarSize.value = 'minify'
    }
}

let updateView = (view: string) => {
    view_type.value = view
}

const filters = ref<Filter[]>()

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
        filters.value = checkType(value)
    }
})

let $dialog = ref()
let $imgElement = ref()

let zoom = (path: string) => {
    $imgElement.value.$src = path
    $imgElement.value.zoom()
}

let toggleModal = ref()
let toggle = () => {
    toggleModal.value.toggle()
}


const selectedAction = ref<{ action: { type: string, name: string }, selected: imgType[] }>({
    action: { type: '', name: '' },
    selected: []
})
let deleteImg = () => {
    $dialog.value.dialog.open()
    if (selected.value.some(el => el.selected === true)) {
        let selecteds = selected.value.filter((el) => el.selected === true)
        if (imgs.value) {
            let selectedImgs = imgs.value.filter((img) => selecteds.some((el) => el.id === img.id))
            selectedAction.value = { action: { type: 'danger', name: "delete" }, selected: selectedImgs }
        }


    } else {
        return
    }
}


</script>
<template>
    <div class="container">
        <Dialog ref="$dialog" :name="selectedAction?.action.name" :type="selectedAction?.action.type"
            :data="selectedAction?.selected" />
        <nav :class="toolBarSize">
            <ul class="tools">
                <li>
                    <div v-if="toolBarState" class="shrink">
                        <Button :icon="['arrow-left']" hollow @click="handleToolbar" label="Shrink" />
                    </div>
                    <Button v-else @click="handleToolbar" :opts="{ noBorder: true }">
                        <template #icon>
                            <i class="icon-arrow-right"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <h4 v-if="toolBarState">Vue</h4>
                    <Button v-else hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i :class="`icon-${view_type === 'list' ? 'menu' : 'grid'}`"></i>
                        </template>
                    </Button>
                    <div class="mt-2 flex gap-[0.5]" v-if="toolBarState">
                        <Button class="w-full" icon="menu" :hollow="view_type === 'list' ? false : true" label="Liste"
                            disabled />
                        <Button class="w-full" icon="grid" :hollow="view_type === 'grid' ? false : true" label="Grille"
                            @click="updateView('grid')" />
                    </div>
                </li>
                <li>
                    <h4 v-if="toolBarState">Actions</h4>
                    <Button v-else hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-power"></i>
                        </template>
                    </Button>
                    <div class="flex flex-wrap gap-[0.5] mt-2" v-if="toolBarState">
                        <Button hollow icon="plus" label="Ajouter" @click="[toggle(), view_type = 'grid']" />
                        <Button hollow icon="pencil" label="Modifier"
                            :disabled="!selected.some(el => el.selected === true)" />
                        <Button hollow icon="trash" label="Supprimer" :disabled="!selected.some(el => el.selected === true)"
                            @click="deleteImg" />
                    </div>
                </li>
                <li>
                    <h4 v-if="toolBarState">Selection</h4>
                    <Button v-else hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-flag"></i>
                        </template>
                    </Button>
                    <div class="flex flex-col gap-[0.5] mt-2" v-if="toolBarState">
                        <Button :hollow="!allSelected" :icon="allSelected ? 'none-circle' : 'check-circle'"
                            :label="allSelected ? 'Tout déselectionner' : 'Tout sélectionner'"
                            @click="selectedImg('global')" />
                    </div>
                </li>
                <li>
                    <h4 v-if="toolBarState">Filtres</h4>
                    <Button v-else hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-filter"></i>
                        </template>
                    </Button>
                    <div v-if="toolBarState && (filters && filters.length > 0)">
                        <BadgePicker v-if="filters" :opts="filters" />
                    </div>
                </li>
                <li>
                    <h4 v-if="toolBarState">Trier</h4>
                    <Button v-else hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-sort-asc"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <h4 v-if="toolBarState">Corbeille</h4>
                    <Button v-else hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-trash"></i>
                        </template>
                    </Button>
                    <div v-if="toolBarState">
                        <Button class="mt-2" :hollow="view_type !== 'trash'" icon="eye" label="Afficher la corbeille"
                            @click="view_type = 'trash'" />
                    </div>
                </li>
                <li>
                    <h4 v-if="toolBarState">Recherche</h4>
                    <Button v-else hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-search"></i>
                        </template>
                    </Button>
                    <div v-show="toolBarState">
                        <input name="search" type="text" placeholder="Rechercher" />
                    </div>
                </li>
            </ul>
        </nav>
        <main v-if="view_type !== 'trash'">
            <HeaderCounter :count="imgs?.length ?? 0" label="total" />
            <ul class="view-grid">
                <li v-if="(imgs && imgs.length > 0) && isSuccess" v-for="img in imgs" :key="img.id">
                    <Image @click.stop="zoom(img.path)" fake @mouseover="hoveredImg(img.id, true)"
                        @mouseleave="hoveredImg(img.id, false)" class="card" clickable :border="img.type" :type="img.type"
                        :src="img.path" :dimensions="img.dimensions" :title="img.name">
                        <div v-show="isHovered(img.id)" @click.stop="selectedImg('uniq', img.id)"
                            :class="`cercle ${selected.find(el => el.id === img.id)?.selected === true ? 'selected' : ''}`">
                        </div>
                    </Image>
                </li>
                <li v-else>Nothing Here...</li>

            </ul>
        </main>
        <main v-if="view_type === 'trash'">
            <component :is="_trash" />
        </main>
        <Modal ref="toggleModal">
            <component :is="_gallery" :context="{ action: 'add', callables: { toggle } }" />
        </Modal>
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