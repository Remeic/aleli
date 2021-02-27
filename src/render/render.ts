import {VNode, Children} from "@src/types/vnode";
import { Renderer } from "@src/types/renderer"

export default class AleliRenderer implements Renderer{

    constructor(){}

    render(vnode: VNode, root: HTMLElement): void {
        const htmlElement : HTMLElement = document.createElement(vnode.type)
        Object.keys(vnode.props).filter(this.isNotChildrenProp).forEach(prop => {
            if(prop === 'className') htmlElement.className = vnode.props['className'] as string
            else htmlElement.setAttribute(prop,vnode.props[prop] as string)
        })
        for(let children of vnode.props.children as Array<Children>) {
            if(typeof(children) === 'object'){
                this.render(children as VNode, htmlElement)
            }
            else if(typeof(children) === 'string'){
                htmlElement.appendChild(document.createTextNode(children as string))
            }
        }
        root.appendChild(htmlElement)
    }

    private isNotChildrenProp(prop: string){
        return prop !== 'children'
    }
}