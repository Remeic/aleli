import VNode from './vnode'

function createElement(
  type: VNode["type"],
  props: VNode["props"],
  children: Array<VNode["type"]>
): VNode {
  return {
    type: "div",
    props: {},
  };
}


export default createElement;