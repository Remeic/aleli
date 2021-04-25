import RendererUtilities from "@src/types/RendererUtilities";
import { VNode } from "@src/types/vnode";

describe("aleliDiffer method createElement", () => {
  let rendererUtilities : RendererUtilities;

  beforeAll(() => {
    rendererUtilities = new RendererUtilities();
  });

  it("aleliDiffer method createElement should return DOM HTMLElement if type is not $TEXT", () => {
    let vnode: VNode = {
      type: "div",
      props: {
        children: [],
      },
    };
    const htmlElement: HTMLElement = rendererUtilities.createElement(
      vnode
    ) as HTMLElement;
    expect(htmlElement.localName).toBe("div");
  });

  it("aleliDiffer method createElement should return Text Node if type is $TEXT", () => {
    let vnode: VNode = {
      type: "$TEXT",
      props: {
        textValue: "Alelí",
        children: [],
      },
    };
    const textNode: Text = document.createTextNode("Alelí");
    expect(rendererUtilities.createElement(vnode)).toStrictEqual(textNode);
  });
});