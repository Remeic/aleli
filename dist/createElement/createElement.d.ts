import { VNode, Children } from "../types/vnode";
declare function createElement<T = {}>(type: VNode["type"], props: VNode["props"] & T, ...children: Children[]): VNode<T>;
export default createElement;
