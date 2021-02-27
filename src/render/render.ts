import {VNode} from "@src/types/vnode";
import { Renderer } from "@src/types/renderer"

export default class AleliRenderer implements Renderer{

    constructor(){}

    render(vnode: VNode, root: HTMLElement): void {
        const htmlElement : HTMLElement = document.createElement(vnode.type)
        Object.keys(vnode.props).forEach(prop => {
            if(prop === 'className') htmlElement.className = vnode.props['className'] as string
        })
        root.appendChild(htmlElement)
    }
}