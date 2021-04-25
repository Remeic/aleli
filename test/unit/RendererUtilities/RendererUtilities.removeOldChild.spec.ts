import RendererUtilities from "@src/types/RendererUtilities";
import { VNode } from "@src/types/vnode";

describe("aleliDiffer method removeOldChild", () => {
  let rendererUtilities : RendererUtilities;

  beforeAll(() => {
    rendererUtilities = new RendererUtilities();
  });

  it("aleliDiffer method removeOldChild should remove Dom node", () => {
    const parent: HTMLElement = document.createElement("div");
    const child: HTMLElement = document.createElement("div");
    parent.appendChild(child);
    expect(parent.firstChild).toBe(child);
    let vnode: VNode = {
      type: parent.localName,
      props: {
        children: [],
      },
      dom: child,
    };
    rendererUtilities.removeOldChild(vnode);
    expect(parent.firstChild).toBe(null);
  });

  it("aleliDiffer method removeOldChild should not do anything if oldNode does not have dom prop", () => {
    const parent: HTMLElement = document.createElement("div");
    const child: HTMLElement = document.createElement("div");
    parent.appendChild(child);
    expect(parent.firstChild).toBe(child);
    let vnode: VNode = {
      type: parent.localName,
      props: {
        children: [
          {
            type: child.localName,
            props: {
              children: [],
            },
          },
        ],
      },
    };
    rendererUtilities.removeOldChild(vnode);
    expect(parent.firstChild).toBe(child);
  });
});