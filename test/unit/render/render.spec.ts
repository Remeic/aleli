import { VNode } from "@src/types/vnode";
import AleliRenderer from "@src/render";

describe("AleliRenderer method setProperty", () => {
  let aleliRenderer: AleliRenderer;

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
  });

  it("AleliRenderer method setProperty should set id property to HTMLElement", () => {
    const htmlElement = document.createElement("div");
    const props: VNode["props"] = {
      id: 1,
      children: [],
    };
    aleliRenderer.setProperty(htmlElement, "id", props);
    expect(htmlElement).toHaveProperty("id", "1");
  });

  it("AleliRenderer method setProperty should throw error if prop key is not in props", () => {
    const htmlElement = document.createElement("div");
    const propName : string = "color"
    const props: VNode["props"] = {
      id: 1,
      children: [],
    };
    expect(() => aleliRenderer.setProperty(htmlElement, propName, props)).toThrowError(`Error setProperty: prop ${propName} is not present in props`)
  });

  it("AleliRenderer method setProperty should throw error if prop key is not in props", () => {
    const htmlElement = document.createElement("div");
    const propName : string = "color"
    const props: VNode["props"] = {
      id: 1,
      children: [],
    };
    expect( () => aleliRenderer.setProperty(htmlElement, propName, props)).toThrowError(`Error setProperty: prop ${propName} is not present in props`)
  });

  it("AleliRenderer method setProperty should set event listener", () => {
    const mocked : Function = () => {}
    let props: VNode["props"] = {
        onClick:  mocked,
        children: [],
    }
    const htmlElement = document.createElement("div");
    aleliRenderer.setProperty(htmlElement, 'onClick', props);
    expect(htmlElement).toHaveProperty('onclick')
    expect(typeof htmlElement.onclick!).toBe('function')
  });

  it("AleliRenderer method setProperty should not set key prop", () => {
    let props: VNode["props"] = {
        key:  "1",
        children: [],
    }
    const htmlElement = document.createElement("div");
    aleliRenderer.setProperty(htmlElement, 'key', props);
    expect(htmlElement).not.toHaveProperty('key')
  });
});

describe("AleliRenderer method should call setProperty only when needed", () => {
  let aleliRenderer: AleliRenderer;

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
  });

  it("render should call setProperty one time for each prop", () => {
    // @ts-ignore
    const spySetProperty = jest.spyOn(AleliRenderer.prototype, "setProperty");

    const vnode: VNode<{ className: "Alelí" }> = {
      type: "div",
      props: {
        className: "Alelí",
        id: "Hello",
        children: [],
      },
    };
    const root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(spySetProperty).toBeCalledTimes(2);
  });

  it("render shouldn't call update prop if it is change ", () => {
    // @ts-ignore
    const spySetProperty = jest.spyOn(AleliRenderer.prototype, "setProperty");

    const vnode: VNode<{ className: "Alelí" }> = {
      type: "div",
      props: {
        className: "Alelí",
        children: [],
      },
    };
    const root: HTMLElement = document.createElement("div");
    aleliRenderer.render(vnode, root);
    expect(spySetProperty).toBeCalledTimes(1);

    const updatedVnode: VNode<{ className: "Alelí" }> = {
      type: "div",
      props: {
        className: "Alelí",
        children: [],
      },
    };
    aleliRenderer.render(updatedVnode, root);
    expect(spySetProperty).toBeCalledTimes(1);
  });

  it("render shouldn't call create element if not necessary, using key attribute ", () => {
    // @ts-ignore
    const spyCreateElement = jest.spyOn(
      AleliRenderer.prototype,
      "createElement"
    );

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
          },
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
          },
        ],
      },
    };
    aleliRenderer.render(updatedVnode, root);
    expect(spyCreateElement).toBeCalledTimes(4);
  });
});

describe('AleliRenderer method removeProperty', () => {
  let aleliRenderer: AleliRenderer;

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
  });

  it('AleliRenderer method removeProperty should remove attribute from HTMLElement', () => {
    const htmlElement = document.createElement("div");
    htmlElement.setAttribute("id","test")
    aleliRenderer.removeProperty(htmlElement,"id")
    expect(htmlElement.attributes).not.toHaveProperty("id")
  });

  it('AleliRenderer method removeProperty should not throw error if prop is not inside HTMLElement', () => {
    const htmlElement = document.createElement("div");
    expect(() => aleliRenderer.removeProperty(htmlElement,"id")).not.toThrowError()
  });

  it('AleliRenderer method removeProperty should remove class instead of className', () => {
    const htmlElement = document.createElement("div");
    htmlElement.classList.add("testClass")
    aleliRenderer.removeProperty(htmlElement,'className')
    expect(htmlElement.attributes).not.toHaveProperty('class')
  });

  it('AleliRenderer method removeProperty should remove event listener', () => {
    const htmlElement = document.createElement("div");
    htmlElement.onclick = () => {}
    expect(htmlElement).toHaveProperty('onclick')
    aleliRenderer.removeProperty(htmlElement,'onClick')
    expect(htmlElement).toHaveProperty('onclick')
    expect(typeof htmlElement.onclick!).toBe("object")
  });

})

describe('AleliRenderer method createElement', () => {
  let aleliRenderer: AleliRenderer;

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
  })

  it('AleliRenderer method createElement should return DOM HTMLElement if type is not $TEXT', () => {
    let vnode: VNode = {
      type: "div",
      props: {
        children: [],
      },
    };
    const htmlElement : HTMLElement = aleliRenderer.createElement(vnode) as HTMLElement
    expect(htmlElement.localName).toBe("div")
  });

  it('AleliRenderer method createElement should return Text Node if type is $TEXT', () => {
    let vnode: VNode = {
      type: "$TEXT",
      props: {
        textValue: "Alelí",
        children: [],
      },
    };
    const textNode : Text = document.createTextNode("Alelí")
    expect(aleliRenderer.createElement(vnode)).toStrictEqual(textNode)
  });

});

describe("AleliRenderer method removeOldChild", () => {
  let aleliRenderer: AleliRenderer;

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
  });

  it("AleliRenderer method removeOldChild should remove Dom node", () => {
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
    aleliRenderer.removeOldChild(vnode);
    expect(parent.firstChild).toBe(null);
  });

  it("AleliRenderer method removeOldChild should not do anything if oldNode does not have dom prop", () => {
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
    aleliRenderer.removeOldChild(vnode);
    expect(parent.firstChild).toBe(child);
  });
});

describe("AleliRenderer method findOldChildrenIfExists", () => {
  let aleliRenderer: AleliRenderer;

  beforeAll(() => {
    aleliRenderer = new AleliRenderer();
  });

  it("AleliRenderer method removeOldChildren should remove Dom node", () => {
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
    aleliRenderer.removeOldChild(vnode);
    expect(parent.firstChild).toBe(null);
  });

  it("AleliRenderer method removeOldChildren should not do anything if oldNode does not have dom prop", () => {
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
    aleliRenderer.removeOldChild(vnode);
    expect(parent.firstChild).toBe(child);
  });
});
