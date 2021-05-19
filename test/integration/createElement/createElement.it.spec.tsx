import AleliComponent from "@src/components";
import createElement from "@src/createElement";
import Component from "@src/types/component";
import { Children, VNode } from "@src/types/vNode";

/** @jsx createElement */
describe("Integration Test for createElement, interact with JSX", () => {
  class TComponent extends AleliComponent {
    destroying(): void {
    }
    mounting(): void {
    }
    render(props: { [other: string]: any; children: Children; }): VNode<{}> {
      return {
        type:"span",
        props: {
          id:1,
          children: [] 
        }
      }
    }
  }

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
    expect(aleliDivElement.type).toBe(AleliComponent as Function);
    const children : Array<VNode> = aleliDivElement.props.children as Array<VNode>
    expect(children[0].type).toBe(AleliComponent as Function);
    expect(children[0].props).toStrictEqual(vnodeChild.props);
  });

  it("JSX call createElement, return vnode with class component and children", () => {
    

    const vnodeChild : VNode = {
      type: TComponent,
      props: {
        children: [],
      },
    }

    const aleliDivElement: VNode = (
      <TComponent>
        <TComponent></TComponent>
      </TComponent>
    );
    expect(aleliDivElement.type).toBe(TComponent as Function);
    const children : Array<VNode> = aleliDivElement.props.children as Array<VNode>
    expect(children[0].type).toBe(TComponent as Function);
    expect(children[0].props).toStrictEqual(vnodeChild.props);
  });

  it("JSX call createElement, return vnode with key prop", () => {
    const vnodeAleliElement: VNode = {
      type: "div",
      props: {
        key: 1,
        children: [],
      },
    };
    const aleliDivElement: HTMLDivElement = <div key={1}></div>;
    expect(aleliDivElement).toStrictEqual(vnodeAleliElement);
  });

});

