<script setup lang="ts">

import { toRefs, computed } from 'vue'
import { Colors } from '@/types/Components/General';


interface Props {
    src: string
    type?: string
    dimensions?: string
    title?: string
    border?: string
    clickable?: boolean
    fake?: boolean
}
let props = defineProps<Props>()

const { src, type, title, border, clickable, fake } = toRefs(props)

const style = {
    backgroundImage: `url(${src.value})`
}

const computedBorder = computed(() => {
    if (border?.value) {
        return Colors[border.value.toUpperCase()]
    } else {
        return Colors.Other
    }
})

const classes = computed(() => ({
    'card-container': true,
    'img-clickable': clickable.value
}))

</script>

<template>
    <div :class="classes" v-bind="{ ...$attrs }" :style="style">
        <div class="card-container" v-if="fake">
            <slot />
            <div class="card-legend">
                <span v-if="title" class="card-title">{{ title && title.length > 11 ? title.substring(0, 10) + "..." : title
                }}</span>
                <div v-if="type || dimensions" class="card-spec">
                    <span class="card-spec-type">{{ type }}</span>
                    <span class="card-spec-dim">{{ dimensions && dimensions?.length >= 10 ? dimensions?.substring(0, 10)
                        + '...' : dimensions }}</span>
                </div>
            </div>
        </div>
        <div v-else>
            <img :class="classes" v-bind="{ ...$attrs }" :src="src" class="card-container" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 2px solid v-bind(computedBorder);
}

.card-legend {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    height: 35%;
    padding: 1rem;
    background-color: rgba(0, 0, 0, .25);

    .card-spec {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: white;
        font-size: .8rem;
        width: fit-content;
        padding-inline: .5rem;
        padding-block: .2rem;
        text-transform: uppercase;
        padding: .5ch;
        border: 2px solid white;

        .card-spec-type {
            letter-spacing: .5ch;
            border-right: 1px solid white;
        }

        .card-spec-dim {
            letter-spacing: .2ch;
            margin-left: 1ch;
        }
    }

    .card-title {
        font-family: 'Visage Bold';
        color: white;
        font-size: 2rem;
        line-height: 1.5rem;
        -webkit-text-stroke: 1px black;
    }
}

.img-clickable {
    cursor: pointer;
}
</style>@/types/Components/General