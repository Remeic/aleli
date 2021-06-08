import { VNode, Children } from "../types/vNode";

function createElement<T = {}>(
  type: VNode["type"],
  props: VNode["props"] & T,
  ...jsxChildren: Children[]
): VNode<T> {
  const flattenChildren : Array<Children> = Array.prototype.concat.apply([], jsxChildren)
  const children : Array<Children> = flattenChildren.map((child) => {
    return !!child && typeof child === "object"
      ? child
      : { type: "$TEXT", props: { textValue: child, children: [] } };
  });

  return {
    type: type,
    props: { ...props, children },
  };
}

export default createElement;
