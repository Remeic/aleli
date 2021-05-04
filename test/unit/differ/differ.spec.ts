import AleliDiffer from "@src/differ/aleliDiffer";
import RendererUtilities from "@src/types/rendererUtilities";
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

describe("aleliDiffer method findOldChildrenIfExists", () => {
  let aleliDiffer : AleliDiffer
  let mockedRendererUtilities: RendererUtilities
  let instanceRendererUtilities : RendererUtilities
  let mockedTestComponent : TestComponent
  let instanceTestComponent: TestComponent
  let emtpyVNode: VNode

  beforeAll(() => {
    mockedRendererUtilities = mock(RendererUtilities)
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


describe("aleliDiffer method diffProps", () => {
  let rendererUtilities : RendererUtilities;
  let aleliDiffer : AleliDiffer
  let mockedRendererUtilities : RendererUtilities
  beforeAll(() => {
    mockedRendererUtilities = mock(RendererUtilities)
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

  // it('differProp should add new prop to html element', () => {
  //   const oldProp: VNode["props"] = {
  //     children: []
  //   }
  //   const newProp: VNode["props"] = {
  //     id:1,
  //     children: []
  //   }
  //   const element : HTMLElement = document.createElement("div")
  //   aleliDiffer.diffProps(oldProp,newProp, element)

  // });

  
});