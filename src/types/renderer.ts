import { VNode } from "./vnode";

export interface Renderer{
	render(elementToRender: VNode, root: Element): void;
}

export interface CustomHTMLElement extends HTMLElement{
	[other: string]: any
}