import { VNode, Children } from "../types/vNode";
import DetectNodeUtils from '@src/utils/detectNodeUtils'

function createElement<T = {}>(
  type: VNode["type"],
  props: VNode["props"] & T,
  ...children: Children[]
): VNode<T> {
  let actualChildren = children.map((child) => {    
    return !!child && typeof child === "object" && "props" in child && "type" in child
      ? child
      : { type: "$TEXT", props: { textValue: child , children: [] } };
  });
  return {
    type: type,
    props: { ...props, children: actualChildren },
  };
}


export default createElement;
