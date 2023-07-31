<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

interface TooltipPos {
    top?: string,
    bottom?: string,
    left?: string,
    right?: string

}

interface Props {
    label?: string,
    icon?: string,
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info',
    sm?: boolean,
    xsm?: boolean,
    rounded?: boolean,
    square?: boolean,
    noBackground?: boolean,
    noBorder?: boolean,
    tooltip?: {
        text: string,
        position?: TooltipPos
    },
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary',
    sm: false,
    disabled: false
})

const color = computed(() => `--${props.color}-color`)
const padding = computed(() => {
    if (props.sm) return '0.5rem 1rem'
    if (props.xsm) return '0.25rem 0.5rem'
    return '0.75rem 1.5rem'
})

const style = reactive({
    backgroundColor: props.noBackground ? `transparent` : `var(${color.value})`,
    border: props.noBorder ? `none` : `1px solid var(${color.value})`,
    borderRadius: props.rounded ? '100%' : props.square ? '0' : '0.25rem',
    color: props.noBackground ? `var(${color.value})` : 'var(--secondary-color)',
    padding: padding.value,
    tooltipPosition: props.tooltip?.position ? props.tooltip.position : { top: '100%', left: '50%' }
})

let showTips = ref(false)

</script>

<template>
    <div class="btn-wrapper">
        <span :class="`tooltip ${showTips ? 'anim' : ''}`">{{ props.tooltip?.text }}</span>
        <button :class="props.disabled ? 'disabled' : ''" @mouseover="showTips = true" @mouseleave="showTips = false">
            <span class="btn-label">
                {{ props.label }}
                <slot v-if="!props.label" />
                <i v-if="props.icon" :class="props.icon" />
            </span>
        </button>
    </div>
</template>


<style scoped lang="scss">
button {
    position: relative;
    width: fit-content;
    display: inline;
    display: inline-block;
    background-color: v-bind('style.backgroundColor');
    border: v-bind('style.border');
    border-radius: v-bind('style.borderRadius');
    color: v-bind('style.color');
    padding: v-bind('style.padding');
    outline: none;
    width: fit-content;
    cursor: pointer;
    transition: filter 0.3s ease-in-out;

    &:hover {
        filter: brightness(0.8);
    }
}

.anim {
    animation: tooltip 0.3s ease-in-out forwards;
}

@keyframes tooltip {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}


.tooltip {
    position: absolute;
    font-size: .8rem;
    opacity: 0;
    bottom: v-bind('style.tooltipPosition.bottom');
    left: v-bind('style.tooltipPosition.left');
    right: v-bind('style.tooltipPosition.right');
    top: v-bind('style.tooltipPosition.top');
    // bottom: 50px;
    // left: 65%;
    background: var(--primary-color);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

}

.tooltip::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 80%;
    margin-left: -3px;
    border-width: 6px 6px 0;
    border-style: solid;
    border-color: #555 transparent;
}


.btn-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;

    i {
        font-size: 1rem;
    }
}

.disabled {
    &:hover {
        filter: none;
    }

    opacity: 0.5;
    cursor: not-allowed;
}
</style>