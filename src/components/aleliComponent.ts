import Component from "@src/types/component";
import { VNode } from "@src/types/vNode";
import ClassState from "./classState";


export default abstract class AleliComponent implements Component {
  protected readonly state: ClassState;
  private mounted: boolean;
  private destroyed: boolean;

  constructor() {
    this.mounted = false
    this.destroyed = false
    this.state = {};
  }
  
  abstract destroying(): void 

  /* istanbul ignore next */
  destroy(): void {
   this.destroyed = true
  }

  /* istanbul ignore next */
  isDestroyed(): boolean {
    return this.destroyed
  }

  /* istanbul ignore next */
  isMounted(): boolean {
    return this.mounted
  }

  /* istanbul ignore next */
  mount() : void {
    this.mounted = true
  }

  abstract mounting(): void

  abstract render(props: VNode["props"]): VNode<{}>;
  
  /* istanbul ignore next */
  public getState(): ClassState {
    return this.state;
  }

  /* istanbul ignore next */
  public setState(newState: ClassState): void {
    Object.assign(this.state, newState);
  }

  public getValueFromState(key: string) : any {
    return key in this.getState() ? this.getState()[key] : undefined;
  }
}
