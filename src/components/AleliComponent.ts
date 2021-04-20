import Component from "@src/types/component";
import { VNode } from "@src/types/vnode";
import ClassState from "./ClassState";


export default abstract class AleliComponent implements Component {
  protected readonly state: ClassState;
  private mounted: boolean = false;
  private destroyed: boolean = false;

  constructor() {
    this.state = {};
  }
  
  abstract destroying(): void 

  destroy(): void {
   this.destroyed = true
  }

  isDestroyed(): boolean {
    return this.destroyed
  }

  isMounted(): boolean {
    return this.mounted
  }

  mount() : void {
    this.mounted = true
  }

  abstract mounting(): void

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
