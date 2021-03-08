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

  // it("render should render div with attribute like class", () => {
  //   let vnode: VNode<{ className: "Alelí" }> = {
  //     type: "div",
  //     props: { className: "Alelí", children: [""] },
  //   };
  //   let root: HTMLElement = document.createElement("div");
  //   aleliRenderer.render(vnode, root);
  //   expect(serializer.serializeNode(root)).toEqual(
  //     `<div><div class="Alelí"></div></div>`
  //   );
  // });

  // it("render should render div with user defined attribute", () => {
  //   let vnode: VNode<{ name: "Alelí" }> = {
  //     type: "div",
  //     props: { name: "Alelí", children: [""] },
  //   };
  //   let root: HTMLElement = document.createElement("div");
  //   aleliRenderer.render(vnode, root);
  //   expect(serializer.serializeNode(root)).toEqual(
  //     `<div><div name="Alelí"></div></div>`
  //   );
  // });

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

  // it("render should render div with text node child", () => {
  //   let vnode: VNode = {
  //     type: "div",
  //     props: {
  //       children: ["Alelí"],
  //     },
  //   };
  //   let root: HTMLElement = document.createElement("div");
  //   aleliRenderer.render(vnode, root);
  //   expect(serializer.serializeNode(root)).toEqual(
  //     `<div><div>Alelí</div></div>`
  //   );
  // });

  // it("render should render div with event listener", () => {
  //   const mocked: Function = (): any => {};
  //   const customProp = {
  //     onClick: mocked,
  //     children: ["Alelí"],
  //   };
  //   const vnode: VNode<typeof customProp> = {
  //     type: "div",
  //     props: {
  //       onClick: mocked,
  //       children: ["Alelí"],
  //     },
  //   };
  //   const root: HTMLElement = document.createElement("div");
  //   aleliRenderer.render(vnode, root);
  //   const child: HTMLElement = root.firstChild as HTMLElement;
  //   expect(child.onclick).not.toBeNull();
  //   expect(child.onclick).toEqual(mocked);
  // });

  // it("render should render multiple children", () => {
  //   let vnode: VNode = {
  //     type: "div",
  //     props: {
  //       children: [
  //         "Alelí",
  //         {
  //           type: "span",
  //           props: {
  //             children: [],
  //           },
  //         },
  //       ],
  //     },
  //   };
  //   let root: HTMLElement = document.createElement("div");
  //   aleliRenderer.render(vnode, root);
  //   expect(serializer.serializeNode(root)).toEqual(
  //     `<div><div>Alelí<span></span></div></div>`
  //   );
  // });

  // it("render should replace dom node when node type change", () => {
  //   let vnode: VNode = {
  //     type: "div",
  //     props: {
  //       children: [
  //         {
  //           type: "span",
  //           props: {
  //             children: [],
  //           },
  //         },
  //       ],
  //     },
  //   };
  //   let root: HTMLElement = document.createElement("div");
  //   aleliRenderer.render(vnode, root);
  //   let updateVnode: VNode = {
  //     type: "div",
  //     props: {
  //       children: [
  //         {
  //           type: "div",
  //           props: {
  //             children: [],
  //           },
  //         },
  //       ],
  //     },
  //   };
  //   aleliRenderer.render(updateVnode, root);
  //   expect(serializer.serializeNode(root)).toEqual(
  //     `<div><div><div></div></div></div>`
  //   );
  // });

  
});
