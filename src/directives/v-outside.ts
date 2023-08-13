import { type Directive, DirectiveBinding } from "vue";




export const vClickOutside: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const onClick = (e: MouseEvent) => {
            if (!el.contains(e.target as Node)) {
                binding.value(e)
            }
        }
        document.addEventListener('click', onClick)
    },


}