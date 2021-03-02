import { VNode, Children } from "@src/types/vnode";
import { Renderer, CustomHTMLElement } from "@src/types/renderer";

export default class AleliRenderer implements Renderer {
  constructor() {}

  render(node: VNode | string, root: HTMLElement): void {
    if (typeof node === "string") {
      this.renderTextNode(node, root);
    }
    if (typeof node === "object" && "props" in node) {
      this.renderVNode(node, root);
    }
  }

  private renderVNode(vnode: VNode, parent: HTMLElement) {
    const htmlElement: CustomHTMLElement = document.createElement(vnode.type);
    Object.keys(vnode.props)
      .filter(this.isNotChildrenProp)
      .forEach((prop) => {
        // Event listener attached with on<event> https://mzl.la/3rbCpxA
        let propName: string = prop.startsWith("on")
          ? prop.toLowerCase()
          : prop;
        if (propName in htmlElement) {
          htmlElement[propName] = vnode.props[prop];
        } else {
          htmlElement.setAttribute(prop, vnode.props[prop] as string);
        }
      });
    for (let children of vnode.props.children as Array<Children>) {
      this.render(children as any, htmlElement);
    }
    parent.appendChild(htmlElement);
  }

  private renderTextNode(node: string, parent: HTMLElement) {
    parent.appendChild(document.createTextNode(node));
  }

  private isNotChildrenProp(prop: string) {
    return prop !== "children";
  }
}
