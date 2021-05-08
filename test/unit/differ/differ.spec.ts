import AleliDiffer from "@src/differ/aleliDiffer";
import { Differ } from "@src/differ/differ";
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
import TestComponent from "../__mocks__/testComponent.mock";
import DetectNodeUtils from "@src/utils/detectNodeUtils";
import RendererUtilities from "@src/types/rendererUtilities";

describe("aleliDiffer findOldChildrenIfExists method", () => {
  let aleliDiffer : Differ
  let mockedRendererUtilities: RendererUtilities
  let instanceRendererUtilities : RendererUtilities
  let mockedTestComponent : TestComponent
  let instanceTestComponent: TestComponent
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
    ).toStrictEqual(emtpyVNode);
  });


  it("aleliDiffer method findOldChildrenIfExists, destroy life cycle is called if old vnode is not reusable and is class component", () => {
    
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
    verify(mockedRendererUtilities.removeOldChildren(vnode)).once()
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
    const oldProp: VNode["props"] = {
      children: []
    }
    const newProp: VNode["props"] = {
      children: []
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldProp,newProp, htmlElement)
    verify(mockedRendererUtilities.setProperty(htmlElement,"children",newProp)).never()
  });

  it('differProp should\'nt call setProperty for key prop', () => {
    const oldProp: VNode["props"] = {
      children: []
    }
    const newProp: VNode["props"] = {
      key: 1,
      children: []
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldProp,newProp, htmlElement)
    verify(mockedRendererUtilities.setProperty(htmlElement,"key",newProp)).never()
  });

  it('differProps should call setProperty for valid prop', () => {
    const oldProp: VNode["props"] = {
      children: []
    }
    const newProp: VNode["props"] = {
      id: 1,
      children: []
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldProp,newProp, htmlElement)
    verify(mockedRendererUtilities.setProperty(htmlElement,"id",newProp)).once()
  });

  it('differProps should\'nt call setProperty if specific key-value of prop not change between renders', () => {
    const oldProp: VNode["props"] = {
      id:1,
      children: []
    }
    const newProp: VNode["props"] = {
      id: 1,
      children: []
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldProp,newProp, htmlElement)
    verify(mockedRendererUtilities.setProperty(htmlElement,"id",newProp)).never()
  });

  it('differProp should\'nt call remove for children prop', () => {
    const oldProp: VNode["props"] = {
      children: []
    }
    const newProp: VNode["props"] = {
      children: []
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldProp,newProp, htmlElement)
    verify(mockedRendererUtilities.removeProperty(htmlElement,"children")).never()
  });

  it('differProp should\'nt call removeProperty for key prop', () => {
    const oldProp: VNode["props"] = {
      key: 1,
      children: []
    }
    const newProp: VNode["props"] = {
      children: []
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldProp,newProp, htmlElement)
    verify(mockedRendererUtilities.removeProperty(htmlElement,"key")).never()
  });

  it('differProps should call removeProperty for valid prop', () => {
    const oldProp: VNode["props"] = {
      id: 1,
      children: []
    }
    const newProp: VNode["props"] = {
      children: []
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldProp,newProp, htmlElement)
    verify(mockedRendererUtilities.removeProperty(htmlElement,"id")).once()
  });

  it('differProps should\'nt call removeProperty if specific key-value of prop not change between renders', () => {
    const oldProp: VNode["props"] = {
      id:1,
      children: []
    }
    const newProp: VNode["props"] = {
      id: 1,
      children: []
    }
    const htmlElement : HTMLElement = document.createElement("div")
    aleliDiffer.diffProps(oldProp,newProp, htmlElement)
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
      }
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
      }
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
      }
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
    verify(spiedAleliDiffer.diffProps(deepEqual(oldVnode.props),deepEqual(vnode.props),vnode.dom! as CustomHTMLElement)).once()
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
    verify(spiedAleliDiffer.diffProps(deepEqual(oldVnode.props),deepEqual(vnode.props),vnode.dom! as CustomHTMLElement)).never()
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
    verify(spiedAleliDiffer.diffProps(oldVnode.props,vnode.props,vnode.dom! as CustomHTMLElement)).never()
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
});