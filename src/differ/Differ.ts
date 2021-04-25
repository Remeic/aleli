import { CustomHTMLElement } from "@src/types/renderer";
import { VNode } from "@src/types/vnode";

export interface Differ{
  diffNodes(newNode: VNode, dom: CustomHTMLElement | Text, oldNode: VNode) : void
  
  findOldChildrenIfExists(
    oldNode: VNode<{}>,
    child: VNode<{}>,
    index: number
  ): VNode 
  
  diffProps(
    oldProps: VNode["props"],
    newProps: VNode["props"],
    htmlElement: CustomHTMLElement
  ): void
}