import { create } from "cypress/types/lodash";
import { createElement, VNode } from "@src/createElement";

describe("Testing createElement function, it return a vnode", () => {
  it("createElement return VNode with type and other property empty", () => {
    const expectedVNode: VNode = { type: "div", props: { children: [] } };
    expect(createElement("div", {})).to.deep.equal(expectedVNode);
  });

  it("createElement return VNode with type and props", () => {
    const props: Object = { name: "Alelí", children: [] };
    const expectedVNode: VNode = { type: "div", props };
    expect(createElement("div", props)).to.deep.equal(expectedVNode);
  });

  it("createElement return VNode where children is array that contain a primitive", () => {
    const expectedVNode: VNode = {
      type: "div",
      props: { children: ["Hello"] },
    };
    expect(createElement("div", {}, "Hello")).to.deep.equal(expectedVNode);
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
    ).to.deep.equal(expectedVNode);
  });


  
});
