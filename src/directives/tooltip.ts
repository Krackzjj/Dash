import { type Directive, DirectiveBinding, ref, watch } from 'vue'
import { computePosition, offset, flip, shift, arrow, type Placement, type AlignedPlacement, type Middleware } from '@floating-ui/vue'


export const tooltipDirective: Directive = {

    mounted(el, binding) {
        createTooltip(el, binding)
    },
    unmounted(el) {
        el.removeEventListener('mouseover', () => { })
        el.removeEventListener('mouseleave', () => { })
    },

}

type Modifier = 'start' | 'end'

function createTooltip(el: HTMLElement, binding: DirectiveBinding) {
    const open = ref(false)

    const text_tooltip = binding.value || ''
    const position = ref<Placement>(binding.arg as Placement || 'top')
    const modifiers = binding.modifiers as Record<Modifier, boolean>

    if (modifiers.start) {
        position.value = `${position.value}-start` as AlignedPlacement
    } else if (modifiers.end) {
        position.value = `${position.value}-end` as AlignedPlacement
    }

    const reference = ref<HTMLElement>(el)

    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip'
    tooltip.innerHTML = text_tooltip
    let fleche: HTMLElement | undefined = undefined

    if (Object.keys(modifiers).length === 0) {
        fleche = document.createElement('div')
        fleche.className = 'tooltip-arrow'
        tooltip.appendChild(fleche)
    }

    watch(() => open.value, async (value) => {
        document.body.appendChild(tooltip)
        if (value) {
            let midleware: Middleware[] = [offset(15), flip(), shift({ padding: 10 })]
            if (fleche !== undefined) {
                midleware = [...midleware, arrow({ element: fleche })]
            }
            const { x, y, placement, middlewareData } = await computePosition(reference.value, tooltip, {
                placement: position.value,
                middleware: [...midleware],
            })

            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;

            if (fleche !== undefined) {
                const staticSide = {
                    top: 'bottom',
                    bottom: 'top',
                    left: 'right',
                    right: 'left',
                }[placement.split('-')[0]] as Placement;
                const { x: arrowX, y: arrowY } = middlewareData.arrow || { x: 0, y: 0 };

                Object.assign(fleche.style, {
                    left: `${arrowX}px`,
                    top: `${arrowY}px`,
                    [staticSide]: '-4px',
                })
            }
        } else {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip)
            }
        }
    })

    el.addEventListener('mouseover', () => {
        open.value = !open.value
    })

    el.addEventListener('mouseleave', () => {
        open.value = !open.value
    })
}


