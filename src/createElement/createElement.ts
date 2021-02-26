import {VNode, Children} from '../types/vnode'

function createElement<T ={}>(
  type: VNode["type"],
  props: VNode["props"] & T,
  ...children: Children
): VNode<T> {
  const actualChildren = children.length ? children : []
  return {
    type: type,
    props: {...props, children: actualChildren},
  };
}


export default createElement;