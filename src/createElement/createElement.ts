import { VNode, Children } from "../types/vNode";
import {isVNode} from "../utils/detectNodeUtils"

function createElement<T = {}>(
  type: VNode["type"],
  props: VNode["props"] & T,
  ...children: Children[]
): VNode<T> {
  let actualChildren = children.map((child) => {    
    return isVNode(child)
      ? child
      : { type: "$TEXT", props: { textValue: child , children: [] } };
  });
  return {
    type: type,
    props: { ...props, children: actualChildren },
  };
}


export default createElement;
