import {VNode, Children} from "@src/types/vnode";
import { Renderer, CustomHTMLElement } from "@src/types/renderer"


export default class AleliRenderer implements Renderer{

    constructor(){}

    render(vnode: VNode, root: HTMLElement): void {
        const htmlElement : CustomHTMLElement = document.createElement(vnode.type)
        Object.keys(vnode.props).filter(this.isNotChildrenProp).forEach(prop => {
            // Event listener attached with on<event> https://mzl.la/3rbCpxA 
            let propName = prop.startsWith("on") ? prop.toLowerCase() : prop;
            if(propName in htmlElement){
                htmlElement[propName] = vnode.props[prop]
            }
            else{
                htmlElement.setAttribute(prop,vnode.props[prop] as string) 
            }
            
        })
        for(let children of vnode.props.children as Array<Children>) {
            if(typeof(children) === 'object'){
                this.render(children as VNode, htmlElement)
            }
            if(typeof(children) === 'string'){
                htmlElement.appendChild(document.createTextNode(children as string))
            }
        }
        root.appendChild(htmlElement)
    }

    private isNotChildrenProp(prop: string){
        return prop !== 'children'
    }
}