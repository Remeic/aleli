import createElement from "@src/createElement";
import {VNode} from "@src/types/vnode";

describe("Testing createElement function, it return a vnode", () => {
  test("createElement return VNode with type and other property empty", () => {
    const expectedVNode: VNode = { type: "div", props: { children: [] } };
    expect(createElement("div", {})).toEqual(expectedVNode);
  });

  it("createElement return VNode with type and props", () => {
    const props: Object = { name: "Alelí", children: [] };
    const expectedVNode: VNode = { type: "div", props };
    expect(createElement("div", props)).toEqual(expectedVNode);
  });

  it("createElement return VNode where props contain specified attribute ", () => {
    const expectedVNode: VNode<{id: "Alelí"}> = {
      type: "div",
      props: { children: ["Hello"], id: "Alelí" },
    };
    expect(createElement("div", {id: "Alelí"}, "Hello")).toHaveProperty('props.id',"Alelí");
  });

  it("createElement return VNode where children is array that contain VNode", () => {
    const expectedVNode: VNode = {
      type: "div",
      props: {
        children: [
          {
            type: "span",
            props: {
              children: ["Hello"],
            },
          },
        ],
      },
    };
    expect(
      createElement("div", {}, createElement("span", {}, "Hello"))
    ).toEqual(expectedVNode);
  });
});
