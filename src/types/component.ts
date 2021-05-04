import ClassState from "@src/components/classState";
import { VNode } from "./vNode";


export default interface Component {
  render(props: VNode["props"]) : VNode
  mounting() : void
  isMounted() : boolean
  mount() : void
  destroying() : void
  isDestroyed(): boolean
  destroy() : void
  getState(): ClassState
  getValueFromState(key: string) : any
  setState(newState: ClassState): void
}