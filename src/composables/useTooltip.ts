function createElement(tag) {
    return document.createElement(tag);
}

function insertTooltip() {
    let tooltip = createElement('div');
    tooltip.setAttribute('id', 'tooltip');
    if (document.body && document.querySelector('#tooltip') === null) {
        document.body.appendChild(tooltip);
    }
}

async function whereIsElement(element: any) {
    console.log(element.getBoundingClientRect());
}

export function createTooltip({ top, left }) {
    insertTooltip();
    let tooltip = document.querySelector('#tooltip')! as HTMLElement;
    if (tooltip as HTMLElement) {
        tooltip.style.top = `${top + 10}px`;
        tooltip.style.left = `${left + 10}px`;
    }

}