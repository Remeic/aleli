import {Children } from "@src/types/vnode";


export default function isVNode(node: Children) {
  return node && typeof node === "object" && "props" in node;
}