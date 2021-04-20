import AleliComponent from "../../../src/components/AleliComponent";
import { Children, VNode } from "@src/types/vnode";

export default  class TestComponent extends AleliComponent {
  destroying(): void {
    throw new Error("Method not implemented.");
  }
  constructor(){
    super()
    this.setState({id:1})
  }
  render(props: VNode["props"]): VNode<{}> {
    let vnode: VNode = {
      type: 'div',
      props: {
        id: this.getValueFromState('id'),
        children: props.children || []
      }
    }
    return vnode
  }
  mounting() {
    this.setState({ id: 1 });
  }
}