<script setup lang="ts">
import { toRefs } from 'vue';
import BadgePicker from '@/components/Inputs/BadgePicker.vue';

const props = defineProps<{ visible: boolean, view: string }>()
const { visible, view } = toRefs(props)
const emit = defineEmits<{
    toggle: []
    'update:view': [string]
}>()

let toggleSideBar = () => {
    emit('toggle')
    // if (e) {
    //     let target = e.target as HTMLElement
    //     let searchInput = target.parentElement?.nextSibling?.firstChild as HTMLInputElement
    //     if (searchInput) {
    //         setTimeout(() => {
    //             searchInput.focus()
    //         }, 100);
    //     }
    // }
}



const filters = ['Publiées', 'Externe', 'Interne', 'GIF', 'Vidéo', 'Image']

</script>

<template>
    <nav>
        <ul class="tools">
            <li>
                <div v-if="visible" class="shrink">
                    <Button :icon="['arrow-left']" hollow @click="toggleSideBar" label="Shrink" />
                </div>
                <Button v-else @click="toggleSideBar" :opts="{ noBorder: true }">
                    <template #icon>
                        <i class="icon-arrow-right"></i>
                    </template>
                </Button>
            </li>
            <li>
                <h4 v-if="visible">Vue</h4>
                <Button v-else hollow :opts="{ noBorder: true }" @click="toggleSideBar">
                    <template #icon>
                        <i :class="`icon-${view === 'list' ? 'menu' : 'grid'}`"></i>
                    </template>
                </Button>
                <div class="mt-2 flex gap-[0.5]" v-if="visible">
                    <Button class="w-full" icon="menu" :hollow="view === 'list' ? false : true" label="Liste"
                        @click="emit('update:view', 'list')" />
                    <Button class="w-full" icon="grid" :hollow="view === 'grid' ? false : true" label="Grille"
                        @click="emit('update:view', 'grid')" />
                </div>
            </li>
            <li>
                <h4 v-if="visible">Actions</h4>
                <Button v-else hollow :opts="{ noBorder: true }" @click="toggleSideBar">
                    <template #icon>
                        <i class="icon-power"></i>
                    </template>
                </Button>
                <div class="flex flex-wrap gap-[0.5] mt-2" v-if="visible">
                    <Button hollow icon="plus" label="Ajouter" />
                    <Button hollow icon="pencil" label="Modifier" />
                    <Button hollow icon="trash" label="Supprimer" />
                </div>
            </li>
            <li>
                <h4 v-if="visible">Selectionner</h4>
                <Button v-else hollow :opts="{ noBorder: true }" @click="toggleSideBar">
                    <template #icon>
                        <i class="icon-flag"></i>
                    </template>
                </Button>
                <div class="flex flex-col gap-[0.5] mt-2" v-if="visible">
                    <Button hollow icon="check-circle" label="Tout selectionner" />
                    <Button hollow icon="none-circle" label="Tout déselectionner" />
                </div>
            </li>
            <li>
                <h4 v-if="visible">Filtres</h4>
                <Button v-else hollow :opts="{ noBorder: true }" @click="toggleSideBar">
                    <template #icon>
                        <i class="icon-filter"></i>
                    </template>
                </Button>
                <div v-if="visible">
                    <BadgePicker :opts="filters" />
                </div>
            </li>
            <li>
                <h4 v-if="visible">Recherche</h4>
                <Button v-else hollow :opts="{ noBorder: true }" @click="toggleSideBar">
                    <template #icon>
                        <i class="icon-search"></i>
                    </template>
                </Button>
                <div v-show="visible">
                    <input name="search" type="text" placeholder="Rechercher" />
                </div>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
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
</style>