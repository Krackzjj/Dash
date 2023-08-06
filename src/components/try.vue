<script setup lang="ts">
import { computePosition, flip, shift, offset, arrow, useFloating } from '@floating-ui/vue';
import { ref, onMounted } from 'vue';

let button = ref<HTMLElement>();
let tooltip = ref<HTMLElement>();
let arrows = ref<HTMLElement>();



onMounted(() => {

    if (button.value && tooltip.value) {
        computePosition(button.value, tooltip.value, {
            placement: 'right',
            middleware: [offset(10), flip(), shift({ padding: 5 }), arrow({ element: arrows.value })]
        }).then(({ x, y, placement, middlewareData }) => {
            if (tooltip.value) {
                tooltip.value.style.left = `${x}px`;
                tooltip.value.style.top = `${y}px`;
            }

            const staticSide = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left',
            }[placement.split('-')[0]];

            const { x: arrowX, y: arrowY } = middlewareData.arrow || { x: 0, y: 0 };

            if (middlewareData && arrows.value && staticSide) {
                Object.assign(arrows.value.style, {
                    left: `${arrowX}px`,
                    top: `${arrowY}px`,
                    [staticSide]: '-4px',
                })
            }
        });
    }
})

useFloating(button, tooltip)


</script>

<template>
    <div>
        <div ref="button">
            <slot>
            </slot>
        </div>
        <div ref="tooltip" id="tooltip">Download<div ref="arrows" id="arrow"></div>
        </div>

    </div>
</template>

<style>
#tooltip {
    background: #222;
    color: white;
    font-weight: bold;
    padding: 5px;
    border-radius: 4px;
    font-size: 90%;
    position: absolute;
    width: max-content;
    /* position: relative; */
}

#arrow {
    position: absolute;
    background: #222;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
}
</style>
