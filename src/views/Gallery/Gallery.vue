<script setup lang="ts">
import { useStore } from '@/store';
import _ from 'lodash';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import BadgePicker, { type Filter } from '@/components/Inputs/BadgePicker.vue';

import _gallery from '../popup/gallery/index.vue';

import { useDeleteImg } from '@/composables/useImg';
import { onMounted } from 'vue';

const { SET_CURRENT_VIEW, lastGalleryView } = useStore()

const router = useRouter()
const route = useRoute()

SET_CURRENT_VIEW(route.name as string, route.params as any)

const { mutate } = useDeleteImg()

const $component = ref()
const selected = ref<{ id: string, name: string }[]>([])
const filters = ref<Filter[]>()


const handleSelectAll = () => {
    selected.value.length <= 0 ? $component.value.select('global') : $component.value.select('none')
}
const handleSelect = <T extends string>(item: { id: T, name: T }[]) => {
    selected.value = [...item]
}
const handleFilters = (filter: Filter[]) => {
    filters.value = [...filter]
}

const toolBarSize = ref<'minify' | 'maxify'>('minify')
const toolBarState = ref<boolean>(false)
const handleToolbar = () => {
    toolBarState.value = !toolBarState.value
    if (toolBarState.value === true) {
        toolBarSize.value = 'maxify'
    }
    if (toolBarState.value === false) {
        toolBarSize.value = 'minify'
    }
}

const updateView = <T extends string, K>(view: T, params?: K) => {
    let name = `gallery.${view}`
    let params_ = { ...params }

    if (route.name === 'gallery.trash') {
        name = lastGalleryView.name as string
        params_ = { view: lastGalleryView.params.view }
    }

    router.push({ name, params: params_ })
}

const modal_context = ref<'edit' | 'add'>()
const changeModal = (modal: 'edit' | 'add') => {
    modal_context.value = modal
}

const $dialog = ref()

const toggleModal = ref()
const toggle = () => {
    toggleModal.value.toggle()
}

type DialogData = {
    opts: { type: string, description: string, validation: boolean, name: string },
    selected: { id: string, name: string }[]
}

const selectedAction = ref<DialogData>()
const handleDeleteImg = () => {
    if (selected.value.length > 0) {
        selectedAction.value = {
            opts: {
                type: 'danger',
                name: 'Suppression définitive',
                description: 'Le(s) élément suivant seront placer dans la corbeille',
                validation: true,
            },
            selected: selected.value
        }
        $dialog.value.dialog.open()

    } else {
        return
    }
}

const handleDialogReply = (reply: boolean) => {
    if (reply) {
        if (selected.value.length > 0) {
            mutate(selected.value.map(item => item.id))
            updateView('trash')
        }
    } else {
        return
    }
}

onMounted(() => {
    SET_CURRENT_VIEW('gallery.view', 'grid')
})
</script>

<template>
    <div class="container">
        <Dialog ref="$dialog" :opts="selectedAction?.opts" :data="selectedAction?.selected" @reply="handleDialogReply">
            <template #title="{ slotProps }">
                <h3 class="mb-2">Etes-vous sûr ?</h3>
                <p class="mb-2">{{ slotProps?.description }}</p>
            </template>
        </Dialog>
        <nav :class="toolBarSize">
            <ul v-if="!toolBarState" class="tools">
                <li>
                    <Button @click="handleToolbar" :opts="{ noBorder: true }">
                        <template #icon>
                            <i class="icon-arrow-right"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <Button hollow :opts="{ noBorder: true }"
                        @click="updateView('view', { view: $route.params.view === 'list' ? 'grid' : 'list' })">
                        <template #icon>
                            <i :class="`icon-${$route.params.view === 'list' ? 'grid' : 'menu'}`"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <Button hollow :opts="{ noBorder: true }" @click="handleSelectAll">
                        <template #icon>
                            <i :class="`icon-checkbox-${selected.length <= 0 ? 'unchecked' : 'checked'}`"></i>
                        </template>
                    </Button>
                </li>
                <li v-if="selected?.length === 0">
                    <Button hollow :opts="{ noBorder: true }" @click="[toggle(), changeModal('add')]">
                        <template #icon>
                            <i class="icon-plus"></i>
                        </template>
                    </Button>
                </li>
                <li v-else>
                    <Button hollow :opts="{ noBorder: true }" @click="[toggle(), changeModal('edit')]">
                        <template #icon>
                            <i class="icon-pencil"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <Button hollow :opts="{ noBorder: true }"
                        @click="selected.length > 0 ? handleDeleteImg() : updateView('trash')">
                        <template #icon>
                            <i class="icon-trash"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <Button hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-flag"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <Button hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-filter"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <Button hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-sort-asc"></i>
                        </template>
                    </Button>
                </li>
                <li>
                    <Button hollow :opts="{ noBorder: true }" @click="handleToolbar">
                        <template #icon>
                            <i class="icon-search"></i>
                        </template>
                    </Button>
                </li>
            </ul>
            <ul v-else class="tools">
                <li>
                    <div class="shrink">
                        <Button :icon="['arrow-left']" hollow @click="handleToolbar" label="Shrink" />
                    </div>
                </li>
                <li>
                    <h4>Vue</h4>
                    <div class="mt-2 flex gap-[0.5]" v-if="toolBarState">
                        <Button class="w-full" icon="menu" :hollow="$route.params.view !== 'list'" label="Liste"
                            @click="updateView('view', { view: 'list' })" />
                        <Button class="w-full" icon="grid" :hollow="$route.params.view !== 'grid'" label="Grille"
                            @click="updateView('view', { view: 'grid' })" />
                    </div>
                </li>
                <li>
                    <h4>Actions</h4>
                    <div class="flex flex-wrap gap-[0.5] mt-2" v-if="toolBarState">
                        <Button hollow icon="plus" label="Ajouter" @click="[toggle(), changeModal('add')]" />
                        <Button hollow icon="pencil" label="Modifier" :disabled="selected.length === 0"
                            @click="[toggle(), changeModal('edit')]" />
                        <Button hollow icon="trash" label="Supprimer" :disabled="selected.length === 0"
                            @click="handleDeleteImg" />
                    </div>
                </li>
                <li>
                    <h4>Selection</h4>
                    <div class="flex justify-center mt-2" v-if="toolBarState">
                        <Button class="w-full" :hollow="selected.length <= 0"
                            :icon="selected.length > 0 ? 'none-circle' : 'check-circle'"
                            :label="selected.length > 0 ? 'Tout déselectionner' : 'Tout sélectionner'"
                            @click="handleSelectAll" />
                    </div>
                </li>
                <li>
                    <h4>Filtres</h4>
                    <div v-if="toolBarState && (filters && filters.length > 0)">
                        <BadgePicker v-if="filters" :opts="filters" />
                    </div>
                </li>
                <li>
                    <h4>Trier</h4>
                </li>
                <li>
                    <h4>Corbeille</h4>
                    <div>
                        <Button class="mt-2" :hollow="$route.name !== 'gallery.trash'" icon="eye"
                            label="Afficher la corbeille" @click="updateView('trash')" />
                    </div>
                </li>
                <li>
                    <h4>Recherche</h4>
                    <div v-show="toolBarState">
                        <input name="search" type="text" placeholder="Rechercher" />
                    </div>
                </li>
            </ul>
        </nav>
        <RouterView #default="{ Component }" :key="$route.path">
            <component ref="$component" :is="Component" @select="handleSelect" @filters="handleFilters" />
        </RouterView>
        <Modal ref="toggleModal">
            <component :is="_gallery" :context="{
                action: modal_context,
                via: 'gallery',
                subject: selected.length > 0 ? selected[0] : undefined,
                callables: { toggle }
            }" />
        </Modal>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    min-height: 100%;
    width: calc(100vw - 10vw);
}

nav {

    min-height: 100%;
    padding: .5rem;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

    li>div.flex-col {
        gap: 2px
    }

    li:has(> div.test) {
        position: relative;
    }

    .shortcut {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
    }
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