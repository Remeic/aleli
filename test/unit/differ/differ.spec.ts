import AleliDiffer from "@src/differ/aleliDiffer";
import { Differ } from "@src/types/differ";
import { CustomHTMLElement } from "@src/types/renderer";
import AleliRendererUtilities from "@src/rendererUtilities/aleliRendererUtilities";
import { VNode } from "@src/types/vNode";
import {
  mock,
  verify,
  instance,
  spy,
  when,
  deepEqual,
  reset,
} from "ts-mockito"
import TestComponent from "../../__mocks__/testComponent.mock"
import DetectNodeUtils from "@src/utils/detectNodeUtils";
import RendererUtilities from "@src/types/rendererUtilities";
import Component from "@src/types/component";
import AleliComponent from "@src/components";
jest.mock("../../__mocks__/testComponent.mock");

describe("aleliDiffer findOldChildrenIfExists method", () => {
  let aleliDiffer : Differ
  let mockedRendererUtilities: RendererUtilities
  let instanceRendererUtilities : RendererUtilities
  let mockedTestComponent : Component
  let instanceTestComponent: Component
  let emtpyVNode: VNode

  beforeAll(() => {
    mockedRendererUtilities = mock(AleliRendererUtilities)
    instanceRendererUtilities = instance(mockedRendererUtilities)
    aleliDiffer = new AleliDiffer(instanceRendererUtilities)
    mockedTestComponent = mock(TestComponent)
    instanceTestComponent = instance(mockedTestComponent)
  });

  beforeEach(() => {
    reset(mockedRendererUtilities)
    reset(mockedTestComponent)
    emtpyVNode = {
      type: '',
      props: {
        children: []
      }
    }
  })

  it("aleliDiffer method findOldChildrenIfExists should call RendererUtilities getOldChildren", () => {
    const oldVNode: VNode = {
      type: "h1",
      props: {
        key: 1,
        children: [],
      },
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [
          oldVNode
        ],
      },
    };
    const newChildVNode: VNode = {
      type: "span",
      props: {
        children: [],
      },
    };
    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    verify(mockedRendererUtilities.getOldChildren(vnode)).once()
  })


  it("aleliDiffer method findOldChildrenIfExists should return empty vnode if old child is not found", () => {

    const oldVNode: VNode = {
      type: "h1",
      props: {
        key: 1,
        children: [],
      },
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [
          oldVNode
        ],
      },
    };

    const newChildVNode: VNode = {
      type: "span",
      props: {
        children: [],
      },
    };
    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(emtpyVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key exists and is the same but type differ should render empty vnode", () => {
    const oldVNode: VNode = {
      type: "h1",
      props: {
        key: 1,
        children: [],
      },
    };
    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNode],
      },
    };
    const newChildVNode: VNode = {
      type: "span",
      props: {
        key:1,
        children: [],
      },
    };
    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(emtpyVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if type is the same but keys diff return empty vnode", () => {
    const oldVNode: VNode = {
      type: "span",
      props: {
        key: 1,
        children: [],
      },
    };
    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNode],
      },
    };
    const newChildVNode: VNode = {
      type: "span",
      props: {
        key: 2,
        children: [],
      },
    };
    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(emtpyVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key exists with same value and type is the same, should return old vnode and position is the same", () => {
    
    const oldVNode: VNode = {
      type: "div",
      props: {
        key: 1,
        children: [],
      },
    };

    const oldVNodeSecond: VNode = {
      type: "span",
      props: {
        key: 2,
        children: [],
      },
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNode,oldVNodeSecond],
      },
    };

    const newChildVNode: VNode = {
      type: "div",
      props: {
        key: 1,
        children: [],
      },
    };

    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode, oldVNodeSecond])
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(oldVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key exists in new VNode and not in the old one, should return emtpy vnode", () => {
    const oldVNode: VNode = {
      type: "h1",
      props: {
        children: [],
      },
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNode],
      },
    };

    const newChildVNode: VNode = {
      type: "h1",
      props: {
        key: 1,
        children: [],
      },
    };

    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(emtpyVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key exists in old VNode and not in the new one, should return emtpy vnode", () => {
    const oldVNode: VNode = {
      type: "h1",
      props: {
        key: 1,
        children: [],
      },
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNode],
      },
    };

    const newChildVNode: VNode = {
      type: "h1",
      props: {
        children: [],
      },
    };

    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(emtpyVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key not exists but type and position are the same return old vnode", () => {

    const oldVNode: VNode = {
      type: "h1",
      props: {
        children: [],
      },
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNode],
      },
    };

    const newChildVNode: VNode = {
      type: "h1",
      props: {
        children: [],
      },
    };
    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(oldVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key not exists but type is the same and position is different return empty vnode", () => {
    const oldVNodeFirst: VNode = {
      type: "span",
      props: {
        children: [],
      },
    };

    const oldVNodeSecond: VNode = {
      type: "h1",
      props: {
        children: [],
      },
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNodeFirst,oldVNodeSecond],
      },
    };

    const newChildVNode: VNode = {
      type: "h1",
      props: {
        children: [],
      },
    };
    
    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNodeFirst,oldVNodeSecond])
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(oldVNodeSecond);
  });


  it("aleliDiffer method findOldChildrenIfExists, destroy life cycle is called if old vnode is not reusable and is class component", () => {
    
    const oldVNode: VNode = {
      type: instanceTestComponent,
      props: {
        children: [],
      },
      component: instanceTestComponent
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNode],
      },
    };

    const newChildVNode: VNode = {
      type: "h1",
      props: {
        children: [],
      },
    };
    when(mockedTestComponent.destroy()).thenCall(()=>{})
    when(mockedTestComponent.destroying()).thenCall(()=>{})
    when(mockedTestComponent.render(oldVNode.props)).thenReturn(emtpyVNode)
    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    verify(mockedTestComponent.destroy()).once()
    verify(mockedTestComponent.destroying()).once()
  });

  it("aleliDiffer method findOldChildrenIfExists, removeOldChildren should be called if old vnode is not reusable", () => {
    
    const oldVNode: VNode = {
      type: instanceTestComponent,
      props: {
        children: [],
      },
    };

    const vnode: VNode = {
      type: "div",
      props: {
        children: [oldVNode],
      },
    };

    const newChildVNode: VNode = {
      type: "h1",
      props: {
        children: [],
      },
    };
    
    when(mockedRendererUtilities.getOldChildren(vnode)).thenReturn([oldVNode])
    aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    verify(mockedRendererUtilities.removeOldChild(oldVNode)).once()
  });

});


describe("aleliDiffer diffProps method", () => {
  let rendererUtilities : RendererUtilities;
  let aleliDiffer : Differ
  let mockedRendererUtilities : RendererUtilities

  beforeAll(() => {
    mockedRendererUtilities = mock(AleliRendererUtilities)
    rendererUtilities = instance(mockedRendererUtilities)
    aleliDiffer = new AleliDiffer(rendererUtilities)
  });

  beforeEach(() => {
    reset(mockedRendererUtilities)
  });

  it('differProp should\'nt call setProperty for children prop', () => {
    const oldVnode: VNode = {
      type: "div",
      props:{
        children: []
      }
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        children: []
      }
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldVnode,newVnode, htmlElement)
    verify(mockedRendererUtilities.setProperty(htmlElement,"children",newVnode.props)).never()
  });

  it('differProp should\'nt call setProperty for key prop', () => {
    const oldVnode: VNode = {
      type: "div",
      props:{
        key:2,
        children: []
      }
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        key:1,
        children: []
      }
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldVnode,newVnode, htmlElement)
    verify(mockedRendererUtilities.setProperty(htmlElement,"key",newVnode.props)).never()
  });

  it('differProps should call setProperty for valid prop', () => {
    const oldVnode: VNode = {
      type: "div",
      props:{
        children: []
      }
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        id:1,
        children: []
      }
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldVnode,newVnode, htmlElement)
    verify(mockedRendererUtilities.setProperty(htmlElement,"id",newVnode.props)).once()
  });

  it('differProps should\'nt call setProperty if specific key-value of prop not change between renders and the type is the same with dom element already have prop', () => {
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.id="1"
    const oldVnode: VNode = {
      type: "div",
      props:{
        id:1,
        children: []
      },
      dom: divElement
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        id:1,
        children: []
      },
      dom: divElement
    }
    aleliDiffer.diffProps(oldVnode,newVnode, divElement)
    verify(mockedRendererUtilities.setProperty(divElement,"id",newVnode.props)).never()
  });

  


  it('differProps should call setProperty if specific key-value of prop not change between renders but the type differs', () => {
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.id="1"
    const spanElement: HTMLSpanElement = document.createElement("span")
    const oldVnode: VNode = {
      type: "span",
      props:{
        id:1,
        children: []
      },
      dom: spanElement
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        id:1,
        children: []
      }
    }
    aleliDiffer.diffProps(oldVnode,newVnode, divElement)
    verify(mockedRendererUtilities.setProperty(divElement,"id",newVnode.props)).once()
  });

  it('differProps should call setProperty if specific key-value of prop not change between renders element have the attribute but value is different', () => {
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.id = "3"
    const oldVnode: VNode = {
      type: "div",
      props:{
        id:1,
        children: []
      },
      dom: divElement
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        id:1,
        children: []
      },
      dom: divElement
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldVnode,newVnode, htmlElement)
    verify(mockedRendererUtilities.setProperty(htmlElement,"id",newVnode.props)).once()
  });

  it('differProps should call setProperty if specific key-value of prop change between renders, element have the attribute but value is different', () => {
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.id = "2"
    const oldVnode: VNode = {
      type: "div",
      props:{
        id:1,
        children: []
      },
      dom: divElement
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        id:2,
        children: []
      },
      dom: divElement
    }
    aleliDiffer.diffProps(oldVnode,newVnode, divElement)
    verify(mockedRendererUtilities.setProperty(divElement,"id",newVnode.props)).once()
  });

  it('differProp should\'nt call remove for children prop', () => {
    const oldVnode: VNode = {
      type: "div",
      props:{
        children: []
      }
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        children: []
      }
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldVnode,newVnode, htmlElement)
    verify(mockedRendererUtilities.removeProperty(htmlElement,"children")).never()
  });

  it('differProp should call removeProperty for key prop if new vnode not have one', () => {
    const oldVnode: VNode = {
      type: "div",
      props:{
        key: 1,
        children: []
      }
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        children: []
      }
    }

    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldVnode,newVnode, htmlElement)
    verify(mockedRendererUtilities.removeProperty(htmlElement,"key")).once()
  });

  it('differProps should call removeProperty for valid prop', () => {
    const oldVnode: VNode = {
      type: "div",
      props:{
        id: 1,
        children: []
      }
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        children: []
      }
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldVnode,newVnode, htmlElement)
    verify(mockedRendererUtilities.removeProperty(htmlElement,"id")).once()
  });

  it('differProps should\'nt call removeProperty if specific key-value of prop not change between renders and the vnode type is the same', () => {
    const oldVnode: VNode = {
      type: "div",
      props:{
        id: 1,
        children: []
      }
    }
    const newVnode: VNode = {
      type: "div",
      props:{
        id: 1,
        children: []
      }
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldVnode,newVnode, htmlElement)
    verify(mockedRendererUtilities.removeProperty(htmlElement,"id")).never()
  });

  
});

describe('aleliDiffer diffNodes method ', () => {
  let rendererUtilities : RendererUtilities;
  let aleliDiffer : Differ
  let mockedRendererUtilities : RendererUtilities
  let mockedTestComponent: TestComponent
  let instanceTestComponent: TestComponent
  let emtpyVNode : VNode
  let spiedAleliDiffer: Differ
  let mockedDetectNodeUtils: DetectNodeUtils;
  let instanceDetectNodeUtils: DetectNodeUtils;

  beforeAll(() => {
    mockedRendererUtilities = mock(AleliRendererUtilities)
    rendererUtilities = instance(mockedRendererUtilities)
    aleliDiffer = new AleliDiffer(rendererUtilities)
    mockedTestComponent = mock(TestComponent)
    instanceTestComponent = instance(mockedTestComponent)
    spiedAleliDiffer = spy(aleliDiffer)
    mockedDetectNodeUtils = mock(DetectNodeUtils)
    instanceDetectNodeUtils = instance(mockedDetectNodeUtils)
  });


  beforeEach(() =>{
    reset(mockedRendererUtilities)
    reset(mockedTestComponent)
    emtpyVNode = {
      type: "",
      props: {
        children: []
      }      
    }
  })

  it('diffNodes method should call Class Component mount life cycle if component is not already mounted', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }
    const vnode: VNode = {
      type: instanceTestComponent,
      props: {
        children: []
      },
      component: instanceTestComponent
    }
    when(mockedTestComponent.render(vnode.props)).thenReturn(emtpyVNode)
    when(mockedTestComponent.destroy()).thenCall(()=>{})
    when(mockedTestComponent.destroying()).thenCall(()=>{})
    when(mockedTestComponent.isMounted()).thenReturn(false)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    verify(mockedTestComponent.mounting()).once()
    verify(mockedTestComponent.mount()).once()
  });

  it('diffNodes method should\'nt call Class Component mount life cycle if component is already mounted', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }
    const vnode: VNode = {
      type: instanceTestComponent,
      props: {
        children: []
      },
      component: instanceTestComponent
    }
    when(mockedTestComponent.render(vnode.props)).thenReturn(emtpyVNode)
    when(mockedTestComponent.destroy()).thenCall(()=>{})
    when(mockedTestComponent.destroying()).thenCall(()=>{})
    when(mockedTestComponent.isMounted()).thenReturn(true)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    verify(mockedTestComponent.mounting()).never()
    verify(mockedTestComponent.mount()).never()
  });

  it('diffNodes method with Class Component should call itself with render result as vnode', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }
    const vnode: VNode = {
      type: instanceTestComponent,
      props: {
        children: []
      },
      component: instanceTestComponent
    }
    when(mockedTestComponent.render(vnode.props)).thenReturn(emtpyVNode)
    when(mockedTestComponent.destroy()).thenCall(()=>{})
    when(mockedTestComponent.destroying()).thenCall(()=>{})
    when(mockedTestComponent.isMounted()).thenReturn(true)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    verify(spiedAleliDiffer.diffNodes(vnode,root,oldVnode)).once()
  });

  it('diffNodes method with base Component should call RendererUtilities createElement to create dom element if oldNode not have one', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")

    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }
    const vnode: VNode = {
      type: "div",
      props: {
        children: []
      }
    }
    when(mockedRendererUtilities.createElement(vnode)).thenReturn(domElement)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    verify(mockedRendererUtilities.createElement(vnode)).once()
    expect(vnode).toHaveProperty("dom",domElement)
  });

  it('diffNodes method with base Component should set use old vnode dom prop for the new vnode dom prop', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")

    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      },
      dom: domElement
    }
    const vnode: VNode = {
      type: "h1",
      props: {
        children: []
      }
    }
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    expect(vnode).toHaveProperty("dom",domElement)
  });

  it('diffNodes method with base Component should call RendererUtilities insertElementIntoDom with dom and new vnode when oldVnode have dom prop', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")

    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      },
      dom: domElement
    }
    const vnode: VNode = {
      type: "h1",
      props: {
        children: []
      }
    }
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    expect(vnode).toHaveProperty("dom",domElement)
    verify(mockedRendererUtilities.insertElementIntoDom(root,vnode)).once()
  });

  it('diffNodes method with base Component should call RendererUtilities insertElementIntoDom with dom and new vnode when oldVnode not have dom prop', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")

    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      },
    }
    const vnode: VNode = {
      type: "h1",
      props: {
        children: []
      }
    }
    when(mockedRendererUtilities.createElement(vnode)).thenReturn(domElement)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    expect(vnode).toHaveProperty("dom",domElement)
    verify(mockedRendererUtilities.insertElementIntoDom(root,vnode)).once()
  });

  it('diffNodes method with base Component should call itself with child of new vnode, new vnode dom and old valid vnode', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")
    const oldChild: VNode = {
      type: "span",
      props: {
        children: []
      },
    }
    const secondChild: VNode = {
      type: "h1",
      props: {
        children: []
      },
    }
    const newChild: VNode = {
      type: "span",
      props: {
        children: []
      },
    }
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: [oldChild,secondChild]
      },
    }
    const vnode: VNode = {
      type: "h1",
      props: {
        children: [newChild]
      }
    }
    when(mockedRendererUtilities.createElement(vnode)).thenReturn(domElement)
    when(spiedAleliDiffer.findOldChildrenIfExists(oldVnode,newChild,0)).thenReturn(oldChild)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    verify(spiedAleliDiffer.findOldChildrenIfExists(oldVnode,newChild,0)).once()
    verify(spiedAleliDiffer.findOldChildrenIfExists(oldVnode,newChild,1)).never()
    verify(spiedAleliDiffer.diffNodes(newChild,vnode.dom!,oldChild))
  });

  it('diffNodes method with base Component should call diffProps method if vnode is not a rapresentation of text node', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")
    
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      },
    }
    const vnode: VNode = {
      type: "h1",
      props: {
        children: []
      }
    }
    when(mockedDetectNodeUtils.isNotTextNode(vnode)).thenReturn(true)
    when(mockedRendererUtilities.createElement(vnode)).thenReturn(domElement)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    verify(spiedAleliDiffer.diffProps(deepEqual(oldVnode),deepEqual(vnode),vnode.dom! as CustomHTMLElement)).once()
  });

  it('diffNodes method with base Component should\'t call diffProps method if vnode is a rapresentation of text node', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")
    
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      },
    }
    const vnode: VNode = {
      type: "$TEXT",
      props: {
        children: []
      }
    }
    when(mockedDetectNodeUtils.isNotTextNode(vnode)).thenReturn(true)
    when(mockedRendererUtilities.createElement(vnode)).thenReturn(domElement)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    verify(spiedAleliDiffer.diffProps(deepEqual(oldVnode),deepEqual(vnode),vnode.dom! as CustomHTMLElement)).never()
  });

  it('diffNodes method with base Component should\'t call diffProps method if vnode is a rapresentation of text node', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")
    
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      },
    }
    const vnode: VNode = {
      type: "$TEXT",
      props: {
        children: []
      }
    }
    when(mockedDetectNodeUtils.isNotTextNode(vnode)).thenReturn(true)
    when(mockedRendererUtilities.createElement(vnode)).thenReturn(domElement)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    verify(spiedAleliDiffer.diffProps(oldVnode,vnode,vnode.dom! as CustomHTMLElement)).never()
  });

  it('diffNodes method with base Component should use Object assign to clone new vnode inside old node', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const domElement : HTMLElement = document.createElement("div")
    
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      },
    }
    const vnode: VNode = {
      type: "h1",
      props: {
        children: []
      }
    }

    when(mockedRendererUtilities.createElement(vnode)).thenReturn(domElement)
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    expect(oldVnode).toEqual(vnode)
  });

  it('diffNodes method should diff Class Component with istance', () => {
    
    const instance : Component = new TestComponent()
    const spied : Component = spy(instance)
    const root : CustomHTMLElement = document.createElement("div")
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }
   
    const vnode: VNode = {
      type:  instance,
      props: {
        children: []
      },
    }
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    expect(vnode.component).toBeInstanceOf(AleliComponent)
  });

  it('diffNodes method should diff Class Component and instantiate component', () => {
    const root : CustomHTMLElement = document.createElement("div")
    const instanceComponent : Component = TestComponent as unknown as TestComponent
    const oldVnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }
    const vnode: VNode = {
      type:  instanceComponent,
      props: {
        children: []
      },
    }
    
    aleliDiffer.diffNodes(vnode,root, oldVnode)
    expect(vnode.component).toBeInstanceOf(AleliComponent)
    expect(TestComponent).toHaveBeenCalledTimes(1);
  });

});