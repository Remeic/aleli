import AleliComponent from "@src/components";
import createElement from "@src/createElement";
import Component from "@src/types/component";
import {VNode} from "@src/types/vNode";

describe("Testing createElement function, it return a vnode", () => {
  test("createElement return VNode with type and other property empty", () => {
    const expectedVNode: VNode = { type: "div", props: { children: [] } };
    expect(createElement("div", {children: []})).toEqual(expectedVNode);
  });

  it("createElement return VNode with type and props", () => {
    const props: VNode["props"] = { name: "Alelí", children: [] };
    const expectedVNode: VNode = { type: "div", props };
    expect(createElement("div", props)).toEqual(expectedVNode);
  });

  it("createElement return VNode where props contain specified attribute ", () => {
    const expectedVNode: VNode<{id: "Alelí"}> = {
      type: "div",
      props: { children: ["Hello"], id: "Alelí" },
    };
    expect(createElement("div", {id: "Alelí", children: []}, "Hello")).toHaveProperty('props.id',"Alelí");
  });

  it("createElement return VNode where children is array that contain VNode", () => {
    const expectedVNode: VNode = {
      type: "div",
      props: {
        children: [
          {
            type: "span",
            props: {
              children: [{ type: "$TEXT", props: { textValue: "Hello", children: [] } }],
            },
          },
        ],
      },
    };
    expect(
      createElement("div", {children: []}, createElement("span", {children: []}, "Hello"))
    ).toEqual(expectedVNode);
  });
});


describe('Testing createElement function when class components are used', () => {
  class AComponent extends AleliComponent{
    destroying(): void {
      throw new Error("Method not implemented.");
    }
    mounting(): void {
      throw new Error("Method not implemented.");
    }
    constructor(){super()}
    render(): VNode<{}> {
      return {
        type: 'div',
        props: {
          children: []
        }
      }
    }
  }

  it('createElement take function as type', () => {
    let TestComponent: Component = new AComponent()
    const expectedVNode: VNode = {
      type: TestComponent,
      props: {
        children: [
        ],
      },
    };
    expect(
      createElement(TestComponent, {children: []})
    ).toEqual(expectedVNode);
  });

  it('createElement returned VNode type is type of function', () => {
    let TestComponent: Component = new AComponent()
    expect(
      createElement(TestComponent, {children: []}).type
    ).toBeInstanceOf(AComponent)
    expect(
      createElement(TestComponent, {children: []}).type
    ).toBeInstanceOf(AleliComponent)
  });
  
})
