import { VNode, Children } from "./vnode";

export interface RendererBase{
	render(elementToRender: VNode, root: Element): void;
}

export interface Renderer extends RendererBase{

	setProperty(
    htmlElement: CustomHTMLElement,
    prop: string,
    props: { [other: string]: any; children: Children }
  ) : void
 
  createElement(newNode: VNode<{}>): HTMLElement | Text 

	removeOldChild(oldNode: VNode<{}>) : void
	
	findOldChildrenIfExists(
    oldNode: VNode<{}>,
    child: VNode<{}>,
    index: number
  ): VNode
}

export interface CustomHTMLElement extends HTMLElement{
	[other: string]: any
	_vnode?: VNode
}