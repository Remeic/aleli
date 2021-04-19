import { Children, VNode } from "@src/types/vnode";
import AleliComponent from "../../../src/components/AleliComponent";
import AleliRenderer from "@src/render";
import { Renderer } from "@src/types/renderer";
import TestComponent from "./TestComponentWithDestroy.mock";
import {
  mock,
  verify,
  instance,
  spy,
  when,
  deepEqual,
  reset,
} from "ts-mockito";

describe("AleliComponent's destroying method is call when a component is unmounted", () => {
  let aleliRenderer: Renderer;
  let mockedComponent: AleliComponent;
  let mockedInstanceComponent: AleliComponent;
  let plainComponent: AleliComponent;
  let spiedComponent: AleliComponent;

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
    mockedComponent = mock(TestComponent);
    mockedInstanceComponent = instance(mockedComponent);
  });

  beforeEach(() => {
    reset(mockedComponent);
    plainComponent = new TestComponent();
    spiedComponent = spy(plainComponent);
  });

  it("destroying method should be called if component is not reusable between re-renders and method is specified", () => {
    const root: HTMLElement = document.createElement("div");
    const props: VNode["props"] = {
      children: [],
    };
    when(mockedComponent.render(deepEqual(props))).thenReturn({
      type: "span",
      props: {
        children: [],
      },
    });
    
    let vnode: VNode = {
      type: "div",
      props: {
        children: [
          {
            type: plainComponent,
            props: {
              children: [],
            },
          },
        ],
      },
    };
    aleliRenderer.render(vnode, root);
    let vnodeUpdated: VNode = {
      type: "div",
      props: {
        children: [
          {
            type: 'span',
            props: {
              children: [],
            },
          },
        ],
      },
    };
    aleliRenderer.render(vnodeUpdated, root);
    verify(spiedComponent.destroying()).once()
    expect(plainComponent.getValueFromState("newVal")).toBe(0);
  });
});