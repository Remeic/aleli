import AleliComponent from "@src/components";
import createElement from "@src/createElement";
import Component from "@src/types/component";
import { Children, VNode } from "@src/types/vNode";
jest.mock("@src/components/aleliComponent");

/** @jsx createElement */
describe("Integration Test for createElement, interact with JSX", () => {
  it("JSX call createElement, return vnode without props and children", () => {
    const vnodeAleliElement: VNode = {
      type: "div",
      props: {
        children: [],
      },
    };
    const aleliDivElement: HTMLDivElement = <div></div>;
    expect(aleliDivElement).toStrictEqual(vnodeAleliElement);
  });

  it("JSX call createElement, return vnode with custom prop", () => {
    const vnodeAleliElement: VNode = {
      type: "div",
      props: {
        test: 1,
        children: [],
      },
    };
    const aleliDivElement: HTMLDivElement = <div test={1}></div>;
    expect(aleliDivElement).toStrictEqual(vnodeAleliElement);
  });

  it("JSX call createElement, return vnode with prop", () => {
    const vnodeAleliElement: VNode = {
      type: "div",
      props: {
        id: 1,
        className: "box",
        children: [],
      },
    };
    const aleliDivElement: HTMLDivElement = <div id={1} className="box"></div>;
    expect(aleliDivElement).toStrictEqual(vnodeAleliElement);
  });

  it("JSX call createElement, return vnode with text children", () => {
    const vnodeAleliElement: VNode = {
      type: "div",
      props: {
        className: "box",
        children: [
          {
            type: "$TEXT",
            props: {
              textValue: "Alelí",
              children: [],
            },
          },
        ],
      },
    };
    const aleliDivElement: HTMLDivElement = <div className="box">Alelí</div>;
    expect(aleliDivElement).toStrictEqual(vnodeAleliElement);
  });

  it("JSX call createElement, return vnode with multiple children", () => {
    const vnodeAleliElement: VNode = {
      type: "div",
      props: {
        className: "box",
        children: [
          {
            type: "span",
            props: {
              children: [
                {
                  type: "$TEXT",
                  props: {
                    textValue: "Hello",
                    children: [],
                  },
                },
              ],
            },
          },
          {
            type: "$TEXT",
            props: {
              textValue: "Alelí",
              children: [],
            },
          },
        ],
      },
    };
    const aleliDivElement: HTMLDivElement = (
      <div className="box">
        <span>Hello</span>Alelí
      </div>
    );
    expect(aleliDivElement).toStrictEqual(vnodeAleliElement);
  });

  it("JSX call createElement, return vnode with class component", () => {
    const vnodeAleliElementProps: VNode["props"] = {
      id: "1",
      testProp: false,
      children: [],
    };
    const aleliDivElement: VNode = (
      <AleliComponent id="1" testProp={false}></AleliComponent>
    );
    console.log(aleliDivElement);
    expect(aleliDivElement.type).toBe(AleliComponent as Function);
    expect(aleliDivElement.props).toStrictEqual(vnodeAleliElementProps);
  });

  it("JSX call createElement, return vnode with class component and children", () => {
    const vnodeChild : VNode = {
      type: typeof AleliComponent,
      props: {
        children: [],
      },
    }

    const aleliDivElement: VNode = (
      <AleliComponent>
        <AleliComponent></AleliComponent>
      </AleliComponent>
    );
    console.log(aleliDivElement);
    expect(aleliDivElement.type).toBe(AleliComponent as Function);
    const children : Array<VNode> = aleliDivElement.props.children as Array<VNode>
    expect(children[0].type).toBe(AleliComponent as Function);
    expect(children[0].props).toStrictEqual(vnodeChild.props);
  });

});

