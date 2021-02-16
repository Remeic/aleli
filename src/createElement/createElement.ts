import {VNode, Children} from './vnode'

function createElement(
  type: VNode["type"],
  props: VNode["props"],
  ...children: Children[]
): VNode {
  const actualChildren = children.length ? children : []
  return {
    type: type,
    props: {...props, children: actualChildren},
  };
}


export default createElement;