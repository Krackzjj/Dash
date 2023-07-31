<script setup lang="ts">
import _ from 'lodash';

import { ref } from 'vue';

import BadgePicker from '@/components/Inputs/BadgePicker.vue';
import Badge from '@/components/Badge.vue';

import { useImg } from '@/composables/useImg';

const { data: imgs } = useImg()

let asideState = ref(false)
let button = ref('icon-chevron-right')
let toggleSideBar = () => {
    asideState.value = !asideState.value;
    button.value = asideState.value ? "icon-chevron-left" : "icon-chevron-right";
}


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

let selectedImg = (id?: number, opts?: { global?: boolean }) => {
    if (imgs.value && opts?.global) {
        imgs.value.forEach((img, index) => {
            selected.value[index] = { id: img.id, selected: !allSelected.value };
        });
        allSelected.value = !allSelected.value;
    } else {
        let isRegister = selected.value.find((img) => img.id === id);
        if (!isRegister) {
            selected.value.push({ id: id, selected: true });
        } else {
            console.log('selected')
            isRegister.selected = !isRegister.selected;
        }
    }
}

const badgeColors = [
    {
        color: 'rgb(187, 247, 208)',
        name: 'JPEG'
    },
    {
        color: 'rgb(186, 230, 253)',
        name: 'GIF'
    },
    {
        color: 'rgb(233, 213, 255)',
        name: 'JPG'
    },
    {
        color: 'rgb(254, 215, 170)',
        name: 'PNG'
    },
    {
        color: 'rgb(251, 207, 232)',
        name: 'WEBP'
    }
];

const filters = ['Publiées', 'Externe', 'Interne', 'GIF', 'Vidéo', 'Image']
const tooltip = [{
    text: 'copié le lien',
    position: {
        bottom: '45px',
        left: '58%'
    }
}, {
    text: 'télécharger',
    position: {
        bottom: '45px',
        left: '67%'
    }
}]

</script>
<template>
    <div class="flex">
        <aside :class="`${asideState ? '' : 'active'}`">
            <nav>
                <ul>
                    <li>
                        <BadgePicker label="Filtrer par types" :opts="filters" />
                    </li>
                    <li>
                        <InputText label="Search good image" indicator="Find by URL, name, type and width/height." />
                    </li>
                    <li>
                        <h4>Select</h4>
                        <Button noBackground :label="`${allSelected ? 'Deselect' : 'Select'} All`"
                            :icon="`icon-${allSelected ? 'none' : 'check'}-circle`"
                            @click="selectedImg(undefined, { global: true })" />
                    </li>
                </ul>
            </nav>
        </aside>
        <Button square xsm @click="toggleSideBar"><i :class="button"></i></Button>
        <main>

            <Card class="card" v-for="img in imgs" :anot="img.dimensions" :key="img.id"
                @mouseover="hoveredImg(img.id, true)" @mouseleave="hoveredImg(img.id, false)">
                <div :class="`cercle ${selected.find((el) => el.id === img.id)?.selected === true ? 'selected' : ''}`"
                    v-show="isHovered(img.id)">
                </div>
                <Img rounded="5px" clickable :src="img.path" @click.stop="selectedImg(img.id)" />
                <template #body>
                    <div>
                        <p class="name">{{ img.name }}</p>
                        <Badge :backgroundColor="_.find(badgeColors, { name: img.type.toUpperCase() })?.color">{{
                            img.type }}
                        </Badge>
                    </div>
                    <div class="btn-utils">
                        <Button noBackground noBorder icon="icon-link" xsm :tooltip="tooltip[0]" />
                        <Button noBackground noBorder icon="icon-download" xsm :tooltip="tooltip[1]" />
                    </div>
                </template>
            </Card>
        </main>
    </div>
</template>
<style scoped lang="scss">
aside {
    &.active {
        z-index: 1;
        transform: translateX(-95%);
        width: 0%;
        opacity: 0;

        * {
            display: none;
        }
    }

    transition: transform 0.5s,
    width 0.5s;
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    width: 25%;
    height: 100vh;
}

ul {
    padding-inline: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
        Button {
            width: 100%;
        }
    }
}

#side-bar-btn {
    z-index: 2;
}

main {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: .5rem;
    padding: 1rem;
    height: 100vh;
    overflow-y: scroll;
}

.card {
    height: 300px;
}

.desc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .name {
        font-size: 0.8rem;
        font-style: italic;
    }
}

.btn-utils {
    display: flex;
    align-self: flex-end;
}

.tip {
    position: absolute;
    inset: 70% auto 20% 60%;
    background-color: var(--primary-color);
    color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: .5em;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 80%;
        border-width: 5px;
        border-style: solid;
        border-color: var(--primary-color) transparent transparent transparent;
    }
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