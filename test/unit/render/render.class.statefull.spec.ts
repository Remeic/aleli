import { VNode } from "@src/types/vnode";
import AleliRenderer from "@src/render";
import { Renderer } from "@src/types/renderer";
import {
  DomTreeSerializer,
  DomTreeStringify,
} from "@src/utils/DomTreeSerializer";
import AleliComponent from "@src/components" 
import TestComponent from "../classComponent/TestComponentWithState.mock"
import { mock, verify, instance,spy, when, deepEqual, reset } from "ts-mockito";



describe('Testing render function of Class Components with state, it render VNodes', () => {
  let serializer: DomTreeSerializer;
  let aleliRenderer: Renderer;
  let Component: AleliComponent
  let mockedComponent: AleliComponent
  let mockedInstanceComponent: AleliComponent 

  beforeAll(() => {
    serializer = new DomTreeStringify();
    aleliRenderer = new AleliRenderer();
    Component = new TestComponent()
    mockedComponent = mock(TestComponent)
    mockedInstanceComponent = instance(mockedComponent);
  });

  it('render method should render class component when a value of state is used ', () => {
    let root: HTMLElement = document.createElement("div");
    const props: VNode["props"] = {
      children: []
    }
    when(mockedComponent.render(deepEqual(props))).thenReturn({
      type:"div",
      props: {
        id:1,
        children:[]
      }
    })
    let vnode: VNode = {
      type: mockedInstanceComponent,
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child).toHaveProperty('id','1')
  });

  it('render method should render class component with state used across rerenders ', () => {
    let root: HTMLElement = document.createElement("div");
    const props: VNode["props"] = {
      children: []
    }
    when(mockedComponent.render(deepEqual(props))).thenReturn({
      type:"div",
      props: {
        id:1,
        children:[]
      }
    })
    let vnode: VNode = {
      type: mockedInstanceComponent,
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child).toHaveProperty('id','1')
    Component.setState({test:'Hello World!', id:2})
    aleliRenderer.render(vnode, root);
    expect(child).toHaveProperty('id','1')
    expect(Component.getState()).toHaveProperty('id',2)
    expect(Component.getState()).toHaveProperty('test','Hello World!')
  });
})