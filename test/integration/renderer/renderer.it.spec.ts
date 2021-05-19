import AleliComponent from "@src/components";
import createElement from "@src/createElement";
import AleliRenderer from "@src/renderer";
import { Renderer } from "@src/types/renderer";
import { Children, VNode } from "@src/types/vNode";

describe("Integration Test for AleliRenderer, interact with createElement", () => {
  let aleliRenderer: Renderer;

  class TComponent extends AleliComponent {
    destroying(): void {}
    mounting(): void {}
    render(props: { [other: string]: any; children: Children }): VNode<{}> {
      return {
        type: "span",
        props: {
          ...props,
          children: [],
        },
      };
    }
  }

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
  });

  it("AleliRenderer should render vnode created by createElement, base component", () => {
    const divElement: HTMLDivElement = document.createElement("div");
    const rootElement: HTMLDivElement = document.createElement("div");
    const vnode: VNode = createElement("div", { children: [] });
    aleliRenderer.render(vnode, rootElement);
    expect(rootElement.firstChild).toStrictEqual(divElement);
  });

  it("AleliRenderer should render vnode created by createElement, base component with props", () => {
    const divElement: HTMLDivElement = document.createElement("div");
    divElement.id = "1";
    divElement.setAttribute("testProp", "Hello");
    const rootElement: HTMLDivElement = document.createElement("div");
    const vnode: VNode = createElement("div", {
      id: 1,
      testProp: "Hello",
      children: [],
    });
    aleliRenderer.render(vnode, rootElement);
    expect(rootElement.firstChild).toStrictEqual(divElement);
  });

  it("AleliRenderer should render vnode created by createElement, Class Component with props", () => {
    const spanElement: HTMLSpanElement = document.createElement("span");
    spanElement.id = "A1";
    const rootElement: HTMLDivElement = document.createElement("div");
    const vnode: VNode = createElement(
      "div",
      {
        children: [],
      },
      {
        type: TComponent,
        props: {
          id: "A1",
          children: [],
        },
      }
    );
    aleliRenderer.render(vnode, rootElement);
    expect(rootElement.querySelector("#A1")).toStrictEqual(spanElement);
  });

  it("AleliRenderer should render multiple times vnode created by createElement, Class Component", () => {
    const spanElement: HTMLSpanElement = document.createElement("span");
    spanElement.id = "A1";
    const rootElement: HTMLDivElement = document.createElement("div");
    const vnode: VNode = createElement(
      "div",
      {
        children: [],
      },
      {
        type: TComponent,
        props: {
          id: "A1",
          children: [],
        },
      }
    );
    aleliRenderer.render(vnode, rootElement);
    expect(rootElement.querySelector("#A1")).toStrictEqual(spanElement);
    const secondVnode: VNode = createElement(
      "div",
      {
        children: [],
      },
      {
        type: "h1",
        props: {
          children: [
            {
              type: "$TEXT",
              props: {
                textValue: "Alelí",
                children: [],
              },
            }
          ],
        },
      }
    );
    const secondResultElement: HTMLDivElement = document.createElement("div")
    const headingElement: HTMLHeadingElement = document.createElement("h1")
    headingElement.textContent = "Alelí",
    secondResultElement.insertBefore(headingElement,null)
    aleliRenderer.render(secondVnode, rootElement);
    expect(rootElement.firstChild).toStrictEqual(secondResultElement);
  });
});
