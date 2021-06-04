import { CustomHTMLElement } from "@src/types/renderer";
import { VNode } from "@src/types/vNode";

export interface Differ{
  diffNodes(newNode: VNode, dom: CustomHTMLElement | Text, oldNode: VNode) : void
  
  findOldChildrenIfExists(
    oldNode: VNode<{}>,
    child: VNode<{}>,
    index: number
  ): VNode 
  
  diffProps(
    oldVnode: VNode,
    newVnode: VNode,
    htmlElement: CustomHTMLElement
  ): void 

}