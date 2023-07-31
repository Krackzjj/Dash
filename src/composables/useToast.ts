// Types
type ToastType = 'success' | 'danger' | 'warning' | 'info'

interface Toast {
    type: ToastType;
    icon: string;
    message: string;
}

// Classes CSS
const CLASS_ICON = 'icon'
const CLASS_CLOSE = 'icon-close'
const CLASS_IN = 'in'
const CLASS_OUT = 'out'
const CLASS_TOAST = 'toast'

// Types et couleurs 
const TYPE_COLORS: { [key in ToastType]: string } = {
    success: 'success-color',
    danger: 'danger-color',
    warning: 'warning-color',
    info: 'info-color'
}

// Crée un élément avec classe optionnelle
function createElement(tag: string, className?: string): HTMLElement {
    const el = document.createElement(tag)
    if (className) el.classList.add(className)
    return el
}

// Crée et configure un toast 
function createToast({ type, icon, message }: Toast): HTMLElement {

    const toastNode = document.createElement('div')

    toastNode.appendChild(createElement('i', CLASS_CLOSE)).classList.add(CLASS_CLOSE)

    toastNode.querySelector('.' + CLASS_CLOSE)?.addEventListener('click', () => {
        toastNode.classList.remove(CLASS_IN)
        toastNode.classList.add(CLASS_OUT)
        setTimeout(() => {
            toastNode.remove()
        }, 100)
    })

    toastNode.appendChild(createElement('i')).classList.add(CLASS_ICON)

    toastNode.appendChild(createElement('span'))

    toastNode.querySelector('.' + CLASS_ICON)?.classList.add(CLASS_ICON + '-' + icon, 'icon-' + TYPE_COLORS[type])

    toastNode.querySelector('span')!.textContent = message

    toastNode.style.borderLeftColor = `var(--${TYPE_COLORS[type]})`

    toastNode.classList.add(CLASS_TOAST)

    return toastNode
}

const toastList: HTMLElement[] = []
// Gère l'ajout et le retrait des toasts
export default function useToast(toast: Toast) {

    const maxToast = 4;

    const newToast = createToast(toast)
    const notifications = document.querySelector('#notifications')

    if (toastList.length === maxToast) {
        const oldestToast = toastList.shift()!
        oldestToast.classList.remove(CLASS_IN)
        oldestToast.classList.add(CLASS_OUT)
        setTimeout(() => {
            oldestToast.remove()
        }
            , 500)

    }

    if (toastList.length < maxToast) {
        toastList.push(newToast)
        notifications?.appendChild(newToast)
    }

    newToast.classList.add(CLASS_IN)

    setTimeout(() => {
        newToast.classList.remove(CLASS_IN)
        newToast.classList.add(CLASS_OUT)
    }, 2000)

    setTimeout(() => {
        toastList.shift()
        newToast.remove()
    }, 3000)

}