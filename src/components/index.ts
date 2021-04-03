import Component from "@src/types/component";
import { VNode } from "@src/types/vnode";

interface ClassState {
  [key: string]: any;
}

export default abstract class AleliComponent implements Component {
  protected readonly state: ClassState;
  constructor() {
    this.state = {};
  }
  abstract render(props: VNode["props"]): VNode<{}>;
  public getState(): ClassState {
    return this.state;
  }
  public setState(newState: ClassState): void {
    Object.assign(this.state, newState);
  }

  public getValueFromState(key: string) {
    return key in this.getState() ? this.getState()[key] : undefined;
  }
}
