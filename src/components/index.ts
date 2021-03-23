import Component from "@src/types/component"
import { VNode } from "@src/types/vnode";

export default class AleliComponent implements Component {
  render(): VNode<{}> {
    throw new Error("Method not implemented.");
  }

}