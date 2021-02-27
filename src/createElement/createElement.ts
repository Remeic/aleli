import {VNode, Children} from '../types/vnode'

function createElement<T ={}>(
  type: VNode["type"],
  props: VNode["props"] & T,
  ...children: Children[]
): VNode<T> {
  return {
    type: type,
    props: {...props, children},
  };
}


export default createElement;