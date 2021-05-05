import {Children, VNode } from "@src/types/vNode";


export default class DetectNodeUtils{
  isVNode(node: Children) {
    return !!node && typeof node === "object" && "props" in node;
  }
  
  isNotTextNode(node: VNode) {
    return this.isVNode(node) && node.type !== '$TEXT'
  }
}


