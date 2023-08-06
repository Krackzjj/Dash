<script setup lang="ts">
import _ from 'lodash';

import { ref } from 'vue';

import Badge from '@/components/Badge.vue';
import Toolbar from './Toolbar.vue';

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

</script>
<template>
    <div class="container">
        <Toolbar :id="toolBarState ? 'translate-to-right' : 'translate-to-left'" :visible="toolBarState"
            @toggle="handleToolbar" :view="view_type" @update:view="updateView" />
        <main>
            <ul class="view-grid" v-if="view_type === 'grid'">
                <Card v-if="view_type === 'grid'" class="card" v-for="img in imgs" :anot="img.dimensions" :key="img.id"
                    @mouseover="hoveredImg(img.id, true)" @mouseleave="hoveredImg(img.id, false)">
                    <div :class="`cercle ${selected.find((el) => el.id === img.id)?.selected === true ? 'selected' : ''}`"
                        v-show="isHovered(img.id)" @click.stop="selectedImg(img.id)">
                    </div>
                    <Img rounded="5px" clickable :src="img.path" @click.stop="selectedImg(img.id)" />
                    <template #body>
                        <div>
                            <p class="name">{{ img.name }}</p>
                            <Badge :backgroundColor="_.find(badgeColors, { name: img.type.toUpperCase() })?.color">{{
                                img.type }}
                            </Badge>
                        </div>
                    </template>
                    <template #footer>
                        <Button v-tooltip="'copy link'" hollow :opts="{ noBorder: true, noHover: true }">
                            <template #icon>
                                <i class="icon-link"></i>
                            </template>
                        </Button>
                        <Button v-tooltip="'download'" hollow :opts="{ noBorder: true, noHover: true }">
                            <template #icon>
                                <i class="icon-download"></i>
                            </template>
                        </Button>
                    </template>
                </Card>
            </ul>
        </main>
    </div>
</template>
<style scoped lang="scss">
.container {
    display: grid;
    grid-template-columns: v-bind(toolBarSize) 1fr;
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
    height: 100vh;
    overflow-y: hidden;
}

.view-grid {
    margin-left: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: .5rem;
    height: 100vh;
    overflow-y: scroll;
}

.view-list {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    height: 100vh;
    overflow-y: scroll;

    li {
        display: flex;
        align-items: center;
        width: 75%;
        height: 150px;
        margin: auto;
        padding: .5rem;
        border: 1px solid #ccc;

        .img-wrap {
            width: 100px;
            height: 100px;
            overflow: hidden;
            margin-right: 1rem;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .img-info {
            p {
                font-size: 0.8rem;
                font-weight: 600;
            }
        }
    }

    .btn-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-left: 1rem;
    }
}

.card {
    height: 300px;

    &-list {

        height: 100px;

        img {
            width: 100px;
        }
    }
}

.name {
    font-size: 0.8rem;
    font-style: italic;
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