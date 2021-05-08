import { CustomHTMLElement } from "./renderer";
import { Children, VNode } from "./vNode";

export default interface RendererUtilities {
  setProperty(
    htmlElement: CustomHTMLElement,
    prop: string,
    props: { [other: string]: any; children: Children }
  ): void 

  createElement(newNode: VNode<{}>): HTMLElement | Text

  insertElementIntoDom(
    dom: CustomHTMLElement | Text,
    newNode: VNode<{}>
  ) : void

  removeProperty(htmlElement: CustomHTMLElement, prop: string) : void

  removeOldChildren(oldNode: VNode<{}>): void

  getOldChildren(oldNode: VNode<{}>): VNode<{}>[]
}