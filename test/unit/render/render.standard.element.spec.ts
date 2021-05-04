import { VNode } from "@src/types/vNode";
import AleliRenderer from "@src/renderer";
import {
  DomTreeSerializer,
  DomTreeStringify,
} from "@src/utils/domTreeSerializer";
import { RendererBase } from "@src/types/renderer";

describe("Testing render function, it render VNodes", () => {
  let serializer: DomTreeSerializer;
  let aleliRenderer: RendererBase;

  beforeAll(() => {
    serializer = new DomTreeStringify();
    aleliRenderer = new AleliRenderer();
  });

  it("render should render empty div", () => {
    let vnode: VNode = {
      type: "div",
      props: {
        children: [],
      },
    };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual("<div><div></div></div>");
  });

  it("render should render div with attribute like class", () => {
    let vnode: VNode<{ className: "Alelí" }> = {
          type: "div",
          props: {
            className: "Alelí",
            children: [],
          },
        };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div class="Alelí"></div></div>`
    );
  });

  it("render should render div with user defined attribute", () => {
    let vnode: VNode<{ name: "Alelí" }> = {
      type: "div",
      props: { name: "Alelí", children: [] },
    };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div name="Alelí"></div></div>`
    );
  });

  it("render should render div with span child", () => {
    let vnode: VNode = {
      type: "div",
      props: {
        children: [{ type: "span", props: { children: [] } }],
      },
    };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div><span></span></div></div>`
    );
  });

  it("render should render div with text node child", () => {
    let vnode: VNode = {
      type: "div",
      props: {
        children: [
          { type: "$TEXT", props: { textValue: "Alelí", children: [] } },
        ],
      },
    };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div>Alelí</div></div>`
    );
  });

  it("render should render div with event listener", () => {
    const mocked : Function = () => {}
    const customProp = {
      onClick: mocked,
      children: [
        { type: "$TEXT", props: { textValue: "Hello", children: [] } },
      ],
    };
    const vnode: VNode<typeof customProp> = {
      type: "div",
      props: {
        onClick:  mocked,
        children: [
          { type: "$TEXT", props: { textValue: "Hello", children: [] } },
        ],
      },
    };
    const root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    const child: HTMLElement = root.firstChild! as HTMLElement;
    expect(child).toHaveProperty('onclick')
    expect(typeof child.onclick!).toBe('function')
  });


  it("render should render multiple children", () => {
    let vnode: VNode = {
      type: "div",
      props: {
        children: [
          { type: "$TEXT", props: { textValue: "Alelí", children: [] } },
          {
            type: "span",
            props: {
              children: [],
            },
          },
        ],
      },
    };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div>Alelí<span></span></div></div>`
    );
  });

  it("render should replace dom node when node type change", () => {
    let vnode: VNode = {
      type: "div",
      props: {
        children: [
          {
            type: "span",
            props: {
              children: [],
            },
          },
        ],
      },
    };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    let updateVnode: VNode = {
      type: "div",
      props: {
        children: [
          {
            type: "h1",
            props: {
              children: [],
            },
          },
        ],
      },
    };
    aleliRenderer.render(updateVnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div><h1></h1></div></div>`
    );
  });

  it("render should diffing props if them change", () => {
    let vnode: VNode<{ className: "Alelí" }> = {
          type: "div",
          props: {
            className: "Alelí",
            children: [],
          },
        };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    let updateVnode: VNode<{ id:'first' }> = {
      type: "div",
      props: {
        id:"first",
        children: [],
      },
    };
    aleliRenderer.render(updateVnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div id="first"></div></div>`
    );
  });

  it("render should update prop if it is change ", () => {
    let vnode: VNode<{ className: "Alelí" }> = {
          type: "div",
          props: {
            className: "Alelí",
            children: [],
          },
        };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div class="Alelí"></div></div>`
    );
    let updatedVnode: VNode<{ className: "Hello Alelí" }> = {
      type: "div",
      props: {
        className: "Hello Alelí",
        children: [],
      },
    };
    aleliRenderer.render(updatedVnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div class="Hello Alelí"></div></div>`
    );
  });

  it("render should change parent dom node if change ", () => {
    let vnode: VNode<{ className: "Alelí" }> = {
          type: "div",
          props: {
            className: "Alelí",
            children: [],
          },
        };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div class="Alelí"></div></div>`
    );
    let updatedVnode: VNode<{ className: "Alelí" }> = {
      type: "span",
      props: {
        className: "Alelí",
        children: [],
      },
    };
    aleliRenderer.render(updatedVnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><span class="Alelí"></span></div>`
    );
  });

  it("render should change parent dom node if change ", () => {
    let vnode: VNode<{ className: "Alelí" }> = {
          type: "div",
          props: {
            className: "Alelí",
            children: [],
          },
        };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div class="Alelí"></div></div>`
    );
    let updatedVnode: VNode<{ className: "Alelí" }> = {
      type: "span",
      props: {
        className: "Alelí",
        children: [],
      },
    };
    aleliRenderer.render(updatedVnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><span class="Alelí"></span></div>`
    );
  });

  it("render should remove event listener div if needed", () => {
    let child : HTMLElement;
    const mocked : Function = () => {}
    const customProp = {
      onClick: mocked,
      children: [
        { type: "$TEXT", props: { textValue: "Hello", children: [] } },
      ],
    };
    const vnode: VNode<typeof customProp> = {
      type: "div",
      props: {
        onClick:  mocked,
        children: [
          { type: "$TEXT", props: { textValue: "Hello", children: [] } },
        ],
      },
    };
    const root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    child = root.firstChild! as HTMLElement;
    expect(child).toHaveProperty('onclick')
    const updatedCustomProp = {
      children: [
        { type: "$TEXT", props: { textValue: "Hello", children: [] } },
      ],
    };
    const updatedVnode: VNode<typeof updatedCustomProp> = {
      type: "div",
      props: {
        children: [
          { type: "$TEXT", props: { textValue: "Hello", children: [] } },
        ],
      },
    };
    aleliRenderer.render(updatedVnode, root);
    expect(child.onclick).toBe(null)
  });


  it("render should throw error if root element is Comment node", () => {
    const customProp = {
      children: [
        { type: "$TEXT", props: { textValue: "Hello", children: [] } },
      ],
    };
    const vnode: VNode<typeof customProp> = {
      type: "div",
      props: {
        children: [
          { type: "$TEXT", props: { textValue: "Hello", children: [] } },
        ],
      },
    };
    const root: Comment = document.createComment("Alelí Comment")
    expect(() => aleliRenderer.render(vnode, root as unknown as HTMLElement)).toThrowError('AleliRenderer, can\'t call render method on Text or Comment root node')
  });

  it("render should throw error if root element is Text node", () => {
    const customProp = {
      children: [
        { type: "$TEXT", props: { textValue: "Hello", children: [] } },
      ],
    };
    const vnode: VNode<typeof customProp> = {
      type: "div",
      props: {
        children: [
          { type: "$TEXT", props: { textValue: "Hello", children: [] } },
        ],
      },
    };
    const root: Comment = document.createTextNode("Alelí Comment")
    expect(() => aleliRenderer.render(vnode, root as unknown as HTMLElement)).toThrowError('AleliRenderer, can\'t call render method on Text or Comment root node')
  });

  it("render should not set key attribute", () => {
    let vnode: VNode<{ key: 1 }> = {
      type: "div",
      props: { key: 1, children: [] },
    };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div></div></div>`
    );
  });

 
});
