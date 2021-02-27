import { VNode } from "@src/types/vnode";
import AleliRenderer from "@src/render";
import {
  DomTreeSerializer,
  DomTreeStringify,
} from "@src/utils/DomTreeSerializer";
import { Renderer } from "@src/types/renderer";

describe("Testing render function, it render VNode", () => {
  let serializer: DomTreeSerializer;
  let aleliRenderer: Renderer;

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
      props: { className: "Alelí", children: [""] },
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
      props: { name: "Alelí", children: [""] },
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
        children: [{ type: "span", props: { children: [""] } }],
      },
    };
    let root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(serializer.serializeNode(root)).toEqual(
      `<div><div><span></span></div></div>`
    );
  });
});
