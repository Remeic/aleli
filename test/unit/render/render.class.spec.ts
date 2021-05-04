import { VNode } from "@src/types/vNode";
import AleliRenderer from "@src/renderer";
import {  RendererBase } from "@src/types/renderer";
import {
  DomTreeSerializer,
  DomTreeStringify,
} from "@src/utils/domTreeSerializer";
import AleliComponent from "@src/components" 
import TestComponent from "../classComponent/TestComponent.mock"
import { mock, verify, instance,spy, when, deepEqual, reset } from "ts-mockito";


describe("Testing render function of Class Components without state, it render VNodes", () => {
  
  let serializer: DomTreeSerializer;
  let aleliRenderer: RendererBase;
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

  beforeEach(() => {
    reset(mockedComponent)
  })

  it('render method should render class components ', () => {
    let root: HTMLElement = document.createElement("div");
    const props: VNode["props"] = {
      children: []
    }
    when(mockedComponent.render(deepEqual(props))).thenReturn({
      type:"div",
      props: {
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
    expect(child.localName).toEqual("div");
  });

  it('render method should render class components with props ', () => {
    let root: HTMLElement = document.createElement("div");
    const props: VNode["props"] = {
      children: []
    }
    when(mockedComponent.render(deepEqual(props))).thenReturn({
      type:"div",
      props: {
        id: 'Alelí',
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
    expect(child.localName).toEqual("div");
    expect(child).toHaveProperty("id",'Alelí')
  });

  it('render method should render class components with passed children ', () => {
    let root: HTMLElement = document.createElement("div");
    const props: VNode["props"] =  {
      children: [{
        type: "$TEXT",
        props: {
          textValue: "Alelí",
          children: []
        }
      }]
    }
    when(mockedComponent.render(deepEqual(props))).thenReturn({
      type:"div",
      props: {
        children: [{
          type: "$TEXT",
          props: {
            textValue: "Alelí",
            children: []
          }
        }]
      }
    })
    let vnode: VNode = {
      type: mockedInstanceComponent,
      props
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child.localName).toEqual("div");
    expect(child.firstChild!.textContent).toEqual("Alelí");
  });
})