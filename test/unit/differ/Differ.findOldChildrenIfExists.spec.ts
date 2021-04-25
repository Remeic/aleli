import AleliDiffer from "@src/differ/AleliDiffer";
import RendererUtilities from "@src/types/RendererUtilities";
import { VNode } from "@src/types/vnode";
import {
  mock,
  verify,
  instance,
  spy,
  when,
  deepEqual,
  reset,
} from "ts-mockito"

describe("aleliDiffer method findOldChildrenIfExists", () => {
  let rendererUtilities : RendererUtilities;
  let aleliDiffer : AleliDiffer
  beforeAll(() => {
    rendererUtilities = new RendererUtilities();
    aleliDiffer = new AleliDiffer(rendererUtilities)
  });

  it("aleliDiffer method findOldChildrenIfExists should return empty vnode if old child is not found", () => {
    const emtpyVNode: VNode = {
      type: "",
      props: {
        children: [],
      },
    };

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
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 1)
    ).toStrictEqual(emtpyVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key exists and is the same but type differ should render empty vnode", () => {
    const emtpyVNode: VNode = {
      type: "",
      props: {
        children: [],
      },
    };
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
        children: [],
      },
    };
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 1)
    ).toStrictEqual(emtpyVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key exists with same value and type is the same, should return old vnode", () => {
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
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, oldVNode, 1)
    ).toStrictEqual(oldVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key exists in new VNode and not in the old one, should return emtpy vnode", () => {
    const emtpyVNode: VNode = {
      type: "",
      props: {
        children: [],
      },
    };

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

    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 1)
    ).toStrictEqual(emtpyVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key exists in old VNode and not in the new one, should return emtpy vnode", () => {
    const emtpyVNode: VNode = {
      type: "",
      props: {
        children: [],
      },
    };

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
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 1)
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
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 0)
    ).toStrictEqual(oldVNode);
  });

  it("aleliDiffer method findOldChildrenIfExists, if key not exists but type is the same and position is different return empty vnode", () => {
    const emtpyVNode: VNode = {
      type: "",
      props: {
        children: [],
      },
    };

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
    expect(
      aleliDiffer.findOldChildrenIfExists(vnode, newChildVNode, 1)
    ).toStrictEqual(emtpyVNode);
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