<script setup lang="ts">
import _ from 'lodash';

import { ref, watch } from 'vue';

import BadgePicker, { type Filter } from '@/components/Inputs/BadgePicker.vue';
import ImageCard from '@/components/ImageCard.vue';

import _gallery from './popup/_gallery.vue';

import { useImg } from '@/composables/useImg';

const { data: imgs } = useImg()


interface SelectedImg {
    id?: number;
    state?: boolean;
    selected?: boolean;
}

let selected = ref<SelectedImg[]>([])
let allSelected = ref(false);

let hoveredImg = (id: number, state: boolean) => {
    let isRegister = selected.value.find((img) => img.id === id);
    if (!isRegister) {
        selected.value.push({ id: id, state: state });
    } else {
        isRegister.state = state;
    }
}
let isHovered = (id: number) => {
    let isSelected = selected.value.find((img) => img.id === id && img.selected === true);
    if (isSelected) {
        return isSelected.selected;
    } else {
        return selected.value.find((img) => img.id === id)?.state;
    }
}

let selectedImg = (mode?: 'uniq' | 'global', id?: number) => {
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

const toolBarSize = ref<string>('60px')
const toolBarState = ref<boolean>(false)
let handleToolbar = () => {
    toolBarState.value = !toolBarState.value
    setTimeout(() => {
        toolBarSize.value = toolBarSize.value === '300px' ? '60px' : '300px'
    }, 10)
}

let updateView = (view: string) => {
    view_type.value = view
}

const filters = ref<Filter[]>()

watch(() => imgs.value, (newVal) => {
    if (newVal) {
        let types = [...new Set(newVal.map((img) => img.type))]
        let filters_ = types.map((type) => {
            return {
                type: type,
                number: newVal.filter((img) => img.type === type).length
            }
        })
        filters.value = filters_
    }
})

let toggleModal = ref()
let toggle = () => {
    toggleModal.value.toggle()
}



</script>
<template>
    <div class="container">
        <nav :id="toolBarState ? 'translate-to-right' : 'translate-to-left'">
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
                        <Button hollow icon="plus" label="Ajouter" @click="toggle" />
                        <Button hollow icon="pencil" label="Modifier"
                            :disabled="!selected.some(el => el.selected === true)" />
                        <Button hollow icon="trash" label="Supprimer"
                            :disabled="!selected.some(el => el.selected === true)" />
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
                    <div v-if="toolBarState">
                        <BadgePicker :opts="filters" />
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
        <main>
            <ul class="view-grid" v-if="view_type === 'grid'">
                <li v-for="img in imgs" :key="img.id">
                    <ImageCard @mouseover="hoveredImg(img.id, true)" @mouseleave="hoveredImg(img.id, false)"
                        @click="selectedImg('uniq', img.id)" class="card" clickable :border="img.type" :type="img.type"
                        :src="img.path" :dimensions="img.dimensions" :title="img.name">
                        <div v-show="isHovered(img.id)" @click.stop="selectedImg('uniq', img.id)"
                            :class="`cercle ${selected.find(el => el.id === img.id)?.selected === true ? 'selected' : ''}`">
                        </div>
                    </ImageCard>
                </li>
            </ul>
        </main>
        <Modal ref="toggleModal">
            <component :is="_gallery" :context="{ action: 'add' }" />
        </Modal>
    </div>
</template>
<style scoped lang="scss">
.container {
    display: grid;
    grid-template-columns: v-bind(toolBarSize) 1fr;
}

nav {
    height: 100%;
    padding: .5rem;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
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

#translate-to-right {
    animation: slide 0.2s ease-in forwards;
}

#translate-to-left {
    animation: slideleft 0.2s ease-out forwards;
}

@keyframes slide {
    0% {
        transform: translateX(-50px);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes slideleft {
    0% {
        transform: translateX(0px);
    }

    50% {
        transform: translateX(-10px);
    }

    100% {
        transform: translateX(0px);
    }
}

main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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