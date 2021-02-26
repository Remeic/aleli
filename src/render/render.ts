import {VNode} from "@src/types/vnode";

export default function render(elementToRender: VNode, root: HTMLElement){
    const dom : HTMLElement = document.createElement(elementToRender.type)
    root.appendChild(dom)
}
