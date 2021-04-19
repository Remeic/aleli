import AleliComponent from "../../../src/components/AleliComponent";
import { Children, VNode } from "@src/types/vnode";

export default  class TestComponent extends AleliComponent {
  destroying(): void {
    this.setState({ newVal: 0 });
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
    this.setState({ newVal: 1 });
  }
}