import { Children, VNode } from "./vnode";

export default interface Component {
  render(props: VNode["props"]) : VNode
  mounting() : void
  isMounted() : boolean
  mount() : void
}