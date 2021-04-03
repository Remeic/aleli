import { Children, VNode } from "@src/types/vnode";
import AleliRenderer from "@src/render";
import {
  DomTreeSerializer,
  DomTreeStringify,
} from "@src/utils/DomTreeSerializer";
import { Renderer } from "@src/types/renderer";
import AleliComponent from "@src/components" 


describe('Class Component tests', () => {
  it('AleliComponent should have intitial state empty', () => {
    class TestComponent extends AleliComponent{
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
    const state = component.getState();
    expect(Object.keys(state).length).toBe(0)
  });

  it('AleliComponent should have state not empty after setState', () => {
    class TestComponent extends AleliComponent{
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
    const state = component.getState();
    expect(Object.keys(state).length).toBe(1)
  });

  it('AleliComponent getValueFromState should return undefined if key is not present in the state', () => {
    class TestComponent extends AleliComponent{
      constructor(){
        super()
        this.setState({})
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
    const valueKey: any = component.getValueFromState('id');
    expect(valueKey).toBe(undefined)
  });
})  
