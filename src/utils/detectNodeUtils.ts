import {Children, VNode } from "@src/types/vnode";


export  function isVNode(node: Children) {
  return node && typeof node === "object" && "props" in node;
}
export  function isNotTextNode(node: VNode) {
  return isVNode(node) && node.type !== '$TEXT'
}