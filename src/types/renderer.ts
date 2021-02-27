import { VNode } from "./vnode";

export interface Renderer{
	render(elementToRender: VNode, root: Element): void;
}