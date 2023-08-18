<script setup lang="ts">
import { computed, reactive } from 'vue'
import { NameColorType } from '@/types/Components/General';
let props = defineProps<{
    color?: NameColorType,
    type: 'wave' | 'spinner' | 'skelleton' | 'dot',
    css?: {
        [key: string]: string | number
    }
    desc?: string
    size?: 's' | 'l'
}>()

const classes = computed(() => ({
    wave: true,
    [`wave-${props.color ?? 'info'}`]: true,
    [`wave-${props.size ?? 's'}`]: true
}))

const style = reactive({
    ...props.css,
})




</script>
<template>
    <div class="spinner">
        <i v-if="props.type === 'spinner'" :class="`icon-spinner`"></i>
        <div v-if="props.type === 'wave'" :class="classes"></div>
        <p v-if="props.desc" class="desc-spinner">{{ props.desc }}</p>
        <div class="skull" v-if="props.type === 'skelleton'" :style="style"></div>
        <div class="dot-waiting" v-if="props.type === 'dot'">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.wave {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        border-radius: 50%;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: wave 1.2s infinite;
    }

    @keyframes wave {
        0% {
            transform: scale(0);
            opacity: 1;
        }

        100% {
            transform: scale(1);
            opacity: 0;
        }
    }

    &-s {
        width: 50px;
        height: 50px;
    }

    &-l {
        width: 150px;
        height: 150px;
    }

    &-warning::before {
        background: radial-gradient(circle,
                hsla(32, 95%, 60%, 0.7),
                hsla(42, 95%, 60%, 0.5),
                hsl(330, 80%, 65%));
    }

    &-info::before {
        background: radial-gradient(circle,
                hsla(190, 60%, 55%, 0.7),
                hsla(214, 75%, 60%, 0.5),
                hsl(240, 70%, 65%));
        ;
    }
}

.dot-waiting {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    &>div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #000;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);


        @for $i from 1 through 4 {
            &:nth-child(#{$i}) {
                left: 8px;
                animation: dot-waiting#{$i} 0.6s infinite;

                @if $i ==3 {
                    left: 32px;
                    animation: dot-waiting2 0.6s infinite;
                }

                @if $i ==4 {
                    left: 56px;
                    animation: dot-waiting3 0.6s infinite;
                }
            }
        }
    }

}



@keyframes dot-waiting1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes dot-waiting3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes dot-waiting2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(24px, 0);
    }
}


.spinner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icon-spinner {
    font-size: 4rem;
    animation: spin 2s linear infinite;
}

.desc-spinner {
    font-size: 1.5rem;
    animation: blur 2s linear infinite;
}

.skull {
    border-radius: 25px;
    background: linear-gradient(100deg, #eee, #fff, #eee);
    background-size: 200% 100%;
    animation: loading 1s infinite, blink 1s step-end infinite;
    border: 2px solid #ccc;
}

@keyframes loading {
    0% {
        background-position: -200% 0;
    }

    50% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

@keyframes blink {
    50% {
        opacity: .4;
    }
}

@keyframes blur {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  