import { VNode } from "@src/types/vnode";
import AleliRenderer from "@src/render";
import {
  DomTreeSerializer,
  DomTreeStringify,
} from "@src/utils/DomTreeSerializer";

describe("render method should call setProperty only when needed", () => {

  let aleliRenderer: AleliRenderer;

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
  });

  it("render should call setProperty one time for each prop", () => {
    // @ts-ignore
    const spySetProperty = jest.spyOn(AleliRenderer.prototype, "setProperty")
   
    const vnode: VNode<{className: 'Alelí'}> = {
      type: "div",
      props: {
        className: 'Alelí',
        id: 'Hello',
        children: [],
      },
    };
    const root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode,root)
    expect(spySetProperty).toBeCalledTimes(2)
  });

  it("render shouldn't call update prop if it is change ", () => {
    // @ts-ignore
    const spySetProperty = jest.spyOn(AleliRenderer.prototype, "setProperty")

    const vnode: VNode<{ className: "Alelí" }> = {
          type: "div",
          props: {
            className: "Alelí",
            children: [],
          },
        };
    const root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(spySetProperty).toBeCalledTimes(1)

    const updatedVnode: VNode<{ className: "Alelí" }> = {
      type: "div",
      props: {
        className: "Alelí",
        children: [],
      },
    };
    aleliRenderer.render(updatedVnode, root);
    expect(spySetProperty).toBeCalledTimes(1)
  });

  it("render shouldn't call create element if not necessary, using key attribute ", () => {
    // @ts-ignore
    const spyCreateElement = jest.spyOn(AleliRenderer.prototype, "createElement")

    const vnode: VNode<{ className: "Alelí" }> = {
          type: "div",
          props: {
            className: "Alelí",
            children: [
              {
                type: "div",
                props: {
                  className: "First",
                  key: 1,
                  children: [],
                },
              },
              {
                type: "span",
                props: {
                  className: "Second",
                  key: 2,
                  children: [],
                },
              },
              {
                type: "button",
                props: {
                  className: "third",
                  key: 3,
                  children: [],
                },
              }
            ],
          },
        };
    const root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    const updatedVnode: VNode<{ className: "Alelí" }> = {
      type: "div",
      props: {
        className: "Alelí",
        children: [
          {
            type: "span",
            props: {
              className: "Second",
              key: 2,
              children: [],
            },
          },
          {
            type: "div",
            props: {
              className: "First",
              key: 1,
              children: [],
            },
          },
          {
            type: "button",
            props: {
              className: "third",
              key: 3,
              children: [],
            },
          }
        ],
      },
    };
    aleliRenderer.render(updatedVnode, root);
    expect(spyCreateElement).toBeCalledTimes(4)
  });

})