import { Children, VNode } from "@src/types/vNode";
import AleliComponent from "../../../src/components/aleliComponent";
import AleliRenderer from "@src/renderer";
import { RendererBase } from "@src/types/renderer";
import TestComponent from "./TestComponent.mock"
import { mock, verify, instance,spy, when, deepEqual, reset  } from "ts-mockito";

describe("AleliComponent's mounting method is call after DOM has be mounted", () => {
  let aleliRenderer: RendererBase;
  let mockedComponent: AleliComponent
  let mockedInstanceComponent: AleliComponent 
  let plainComponent : AleliComponent
  let spiedComponent : AleliComponent

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
    mockedComponent = mock(TestComponent)
    mockedInstanceComponent = instance(mockedComponent);
  });

  beforeEach(() => {
    reset(mockedComponent)
    plainComponent = new TestComponent()
    spiedComponent = spy(plainComponent)
  })

  it("mounting method should be called once for render phase", () => {
    const root: HTMLElement = document.createElement("div");
    const props: VNode["props"] = {
      children: []
    }
    when(mockedComponent.render(deepEqual(props))).thenReturn({
      type:"span",
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
    verify(mockedComponent.mounting()).once()
  });

  it("mounting method should be called before render method", () => {
    const root: HTMLElement = document.createElement("div");
    const props: VNode["props"] = {
      children: []
    }
    when(mockedComponent.render(deepEqual(props))).thenReturn({
      type:"span",
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
    verify(mockedComponent.mounting()).once()
    verify(mockedComponent.mounting()).calledBefore(mockedComponent.render(deepEqual(props)))
  });

  it("isMounted member os AleliComponent should has value true after mounting method call", () => {
    const root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: plainComponent,
      props: {
        children: []
      }
    }
    when(spiedComponent.mounting()).thenCall(()=>{
      return;
    })
    expect(plainComponent.isMounted()).toBe(false)
    aleliRenderer.render(vnode, root);
    expect(plainComponent.isMounted()).toBe(true)
  });

  it("mounting method should'nt be called if already mounted", () => {
    const root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: plainComponent,
      props: {
        children: []
      }
    }
    when(spiedComponent.mounting()).thenCall(()=>{
      return;
    })
    aleliRenderer.render(vnode, root);
    aleliRenderer.render(vnode, root);
    verify(spiedComponent.mounting()).once()
  });

  it("function insde mounting method should be called", () => {
    const root: HTMLElement = document.createElement("div");
    let stubbedFunction = jest.fn();
    when(spiedComponent.mounting()).thenCall(stubbedFunction)
    let vnode: VNode = {
      type: plainComponent,
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode, root);
    expect(stubbedFunction).toBeCalled()
  });

  it("state after mount have to be changed | on TestComponent", () => {
    const root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: plainComponent,
      props: {
        children: []
      }
    }
    when(spiedComponent.mounting()).thenCall(()=>{
      plainComponent.setState({newVal:1})
    })
    expect(plainComponent.getValueFromState('newVal')).toBe(undefined)
    aleliRenderer.render(vnode, root);
    expect(plainComponent.getValueFromState('newVal')).toBe(1)

  });
});

