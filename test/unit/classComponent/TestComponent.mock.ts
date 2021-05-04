import AleliComponent from "../../../src/components/aleliComponent";
import { Children, VNode } from "@src/types/vNode";

export default  class TestComponent extends AleliComponent {
  destroying(): void {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super();
    this.setState({});
  }
  render(props: { [other: string]: any; children: Children }): VNode<{}> {
    let vnode: VNode = {
      type: 'div',
      props: {
        children: props.children || []
      }
    }
    return vnode
  }
  mounting() {
    throw new Error("Method not implemented.");
  }
}