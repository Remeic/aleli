import AleliDiffer from "@src/differ/aleliDiffer";
import { Differ } from "@src/types/differ";
import { CustomHTMLElement } from "@src/types/renderer";
import RendererUtilities from "@src/rendererUtilities/aleliRendererUtilities";
import { VNode } from "@src/types/vNode";
import { spy, verify } from "ts-mockito";
import AleliRendererUtilities from "@src/rendererUtilities/aleliRendererUtilities";

describe("aleliDiffer method createElement", () => {
  let rendererUtilities : RendererUtilities;

  beforeAll(() => {
    rendererUtilities = new AleliRendererUtilities();
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

describe("aleliDiffer method removeOldChildren", () => {
  let rendererUtilities : RendererUtilities;

  beforeAll(() => {
    rendererUtilities = new AleliRendererUtilities();
  });

  it("aleliDiffer method removeOldChild should remove Dom node", () => {
    const parent: HTMLElement = document.createElement("div");
    const child: HTMLElement = document.createElement("div");
    const childVnode: VNode = {
      type: child.localName,
      props: {
        children: []
      },
      dom: child
    }
    parent.appendChild(child);
    expect(parent.firstChild).toBe(child);
    let vnode: VNode = {
      type: parent.localName,
      props: {
        children: [childVnode],
      },
    };
    rendererUtilities.removeOldChildren(vnode);
    expect(parent.firstChild).toBe(null);
  });

  it("aleliDiffer method removeOldChild should'nt remove Dom node if vnode not have dom prop", () => {
    const parent: HTMLElement = document.createElement("div");
    const child: HTMLElement = document.createElement("div");
    const spiedChild: HTMLElement = spy(child)
    const childVnode: VNode = {
      type: child.localName,
      props: {
        children: []
      },
    }
    parent.appendChild(child);
    expect(parent.firstChild).toBe(child);
    let vnode: VNode = {
      type: parent.localName,
      props: {
        children: [childVnode],
      },
    };
    rendererUtilities.removeOldChild(vnode);
    verify(spiedChild.remove()).never()
  });

});

describe("aleliDiffer method removeProperty", () => {
  let rendererUtilities : RendererUtilities;
  beforeAll(() => {
    rendererUtilities = new AleliRendererUtilities()
  });

  it("aleliDiffer method removeProperty should remove attribute from HTMLElement", () => {
    const htmlElement = document.createElement("div");
    htmlElement.setAttribute("id", "test");
    rendererUtilities.removeProperty(htmlElement, "id");
    expect(htmlElement.attributes).not.toHaveProperty("id");
  });

  it("aleliDiffer method removeProperty should not throw error if prop is not inside HTMLElement", () => {
    const htmlElement = document.createElement("div");
    expect(() =>
    rendererUtilities.removeProperty(htmlElement, "id")
    ).not.toThrowError();
  });

  it("aleliDiffer method removeProperty should remove class instead of className", () => {
    const htmlElement = document.createElement("div");
    htmlElement.classList.add("testClass");
    rendererUtilities.removeProperty(htmlElement, "className");
    expect(htmlElement.attributes).not.toHaveProperty("class");
  });

  it("aleliDiffer method removeProperty should remove event listener", () => {
    const htmlElement = document.createElement("div");
    htmlElement.onclick = () => {};
    expect(htmlElement).toHaveProperty("onclick");
    rendererUtilities.removeProperty(htmlElement, "onClick");
    expect(htmlElement).toHaveProperty("onclick");
    expect(typeof htmlElement.onclick!).toBe("object");
  });
});

describe("RendererUtilities method setProperty", () => {
  let renderUtilities: RendererUtilities;
  beforeAll(() => {
    renderUtilities = new AleliRendererUtilities();
  });

  it("RendererUtilities method setProperty should set id property to HTMLElement", () => {
    const htmlElement : HTMLElement = document.createElement("div");
    const spiedElement : any = jest.spyOn(htmlElement, 'setAttribute')
    const props: VNode["props"] = {
      id: 1,
      children: [],
    };
    renderUtilities.setProperty(htmlElement, "id", props);
    expect(htmlElement).toHaveProperty("id", "1");
    expect(htmlElement['id']).toBe("1")
    expect(spiedElement).not.toBeCalled()
  });

  it("RendererUtilities method setProperty should throw error if prop key is not in props", () => {
    const htmlElement : HTMLElement = document.createElement("div");
    const propName: string = "color";
    const props: VNode["props"] = {
      id: 1,
      children: [],
    };
    expect(() =>
      renderUtilities.setProperty(htmlElement, propName, props)
    ).toThrowError(
      `Error setProperty: prop ${propName} is not present in props`
    );
  });

  it("RendererUtilities method setProperty should set event listener", () => {
    const mocked: Function = () => {};
    const props: VNode["props"] = {
      onClick: mocked,
      children: [],
    };
    const htmlElement : HTMLElement = document.createElement("div");
    renderUtilities.setProperty(htmlElement, "onClick", props);
    expect(htmlElement).toHaveProperty("onclick");
    expect(typeof htmlElement.onclick!).toBe("function");
  });

  it("RendererUtilities method setProperty should set custom attribute", () => {
    const props: VNode["props"] = {
      isValid: true,
      children: [],
    };
    const htmlElement : CustomHTMLElement = document.createElement("div");
    renderUtilities.setProperty(htmlElement, "isValid", props);
    expect(htmlElement.getAttribute('isValid')).toBe("true")
    expect(htmlElement['isValid']).toBe(undefined)
  });


});

describe("RendererUtilities insertElementIntoDom method", () => {
  let renderUtilities: RendererUtilities;
  beforeAll(() => {
    renderUtilities = new AleliRendererUtilities();
  });

  it('RendererUtilities insertElementIntoDom throw error if vnode have not dom prop', () => {
    const root: HTMLElement = document.createElement("div")
    const vnode: VNode = {
      type: "",
      props: {
        children: []
      }
    }
    expect(() => renderUtilities.insertElementIntoDom(root,vnode)).toThrowError("Can't insert element, VNode missing dom prop")
  });

  it('RendererUtilities insertElementIntoDom should add child to root and be the only one when root is empty', () => {
    const root: HTMLElement = document.createElement("div")
    const divChild : HTMLElement = document.createElement("div")
    const vnode: VNode = {
      type: "div",
      props: {
        children: []
      },
      dom: divChild
    }
    renderUtilities.insertElementIntoDom(root,vnode)
    expect(root.firstChild).toBe(divChild)
  });

  it('RendererUtilities insertElementIntoDom should add child to root and not override existing child', () => {
    const root: HTMLElement = document.createElement("div")
    const alreadyExistingChildSpan: HTMLElement = document.createElement("span")
    const alreadyExistingChildHeading: HTMLElement = document.createElement("h1")
    root.insertBefore(alreadyExistingChildSpan,null)
    root.insertBefore(alreadyExistingChildHeading,null)
    const divChild : HTMLElement = document.createElement("div")
    const vnode: VNode = {
      type: "div",
      props: {
        children: []
      },
      dom: divChild
    }
    renderUtilities.insertElementIntoDom(root,vnode)
    expect(root.childNodes).toContain(alreadyExistingChildSpan)
    expect(root.childNodes).toContain(alreadyExistingChildHeading)
    expect(root.childNodes).toContain(divChild)
  });

});


