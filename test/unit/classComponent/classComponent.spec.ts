import { Children, VNode } from "@src/types/vnode";
import AleliComponent from "@src/components/AleliComponent" 


describe('Class Component tests', () => {
  it('AleliComponent should have intitial state empty', () => {
    class TestComponent extends AleliComponent{
      destroying(): void {
        throw new Error("Method not implemented.");
      }
      mounting(): void {
        throw new Error("Method not implemented.");
      }
      constructor(){
        super()
      }
      render(props: { [other: string]: any; children: Children; }): VNode<{}> {
        let vnode: VNode = {
          type: 'div',
          props: {
            children: props.children
          }
        }
        return vnode
      }
    }
    const component: AleliComponent = new TestComponent()
    const state : Object = component.getState();
    expect(Object.keys(state).length).toBe(0)
  });

  it('AleliComponent should have state not empty after setState', () => {
    class TestComponent extends AleliComponent{
      destroying(): void {
        throw new Error("Method not implemented.");
      }
      mounting(): void {
        throw new Error("Method not implemented.");
      }
      constructor(){
        super()
        this.setState({id:1})
      }
      render(props: { [other: string]: any; children: Children; }): VNode<{}> {
        let vnode: VNode = {
          type: 'div',
          props: {
            children: props.children || []
          }
        }
        return vnode
      }
    }
    const component: AleliComponent = new TestComponent()
    const state : Object = component.getState();
    expect(Object.keys(state).length).toBe(1)
  });

  it('AleliComponent should read value of key using getValueFromKey', () => {
    class TestComponent extends AleliComponent{
      destroying(): void {
        throw new Error("Method not implemented.");
      }
      mounting(): void {
        throw new Error("Method not implemented.");
      }
      constructor(){
        super()
        this.setState({id:1})
      }
      render(props: { [other: string]: any; children: Children; }): VNode<{}> {
        let vnode: VNode = {
          type: 'div',
          props: {
            children: props.children || []
          }
        }
        return vnode
      }
    }
    const component: AleliComponent = new TestComponent()
    const valueOfKey : any = component.getValueFromState('id');
    expect(valueOfKey).toBe(1)
  });

  it('AleliComponent getValueFromKey method should return undefined if store doesn\'t contain specified key', () => {
    class TestComponent extends AleliComponent{
      destroying(): void {
        throw new Error("Method not implemented.");
      }
      mounting(): void {
        throw new Error("Method not implemented.");
      }
      constructor(){
        super()
        this.setState({id:1})
      }
      render(props: { [other: string]: any; children: Children; }): VNode<{}> {
        let vnode: VNode = {
          type: 'div',
          props: {
            children: props.children || []
          }
        }
        return vnode
      }
    }
    const component: AleliComponent = new TestComponent()
    const valueOfKey : any = component.getValueFromState('Hello');
    expect(valueOfKey).toBe(undefined)
  });


})  
