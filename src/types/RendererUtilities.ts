import { CustomHTMLElement } from "./renderer";
import { Children, VNode } from "./vNode";

export default class RendererUtilities {
 
  public setProperty(
    htmlElement: CustomHTMLElement,
    prop: string,
    props: { [other: string]: any; children: Children }
  ): void {
    if (!(prop in props)) {
      throw new Error(
        `Error setProperty: prop ${prop} is not present in props`
      );
    }
    else {
      //Event listener attached with on<event> https://mzl.la/3rbCpxA
      const name: string = prop.startsWith("on") ? prop.toLowerCase() : prop;
      if (prop in htmlElement) {
        htmlElement[name] = props[name];
      } else {
        htmlElement.setAttribute(name, props[prop as string]);
      }
    }
  }

  public createElement(newNode: VNode<{}>): HTMLElement | Text {
    if (newNode.type === "$TEXT") {
      return this.renderTextNode(newNode);
    } else {
      return this.renderVNode(newNode);
    }
  }

  public insertElementIntoDom(
    dom: CustomHTMLElement | Text,
    newNode: VNode<{}>
  ) {
    newNode.dom && dom.insertBefore(newNode.dom, null);
  }

  public removeProperty(htmlElement: CustomHTMLElement, prop: string) {
    //Event listener attached with on<event> https://mzl.la/3rbCpxA
    if(prop.startsWith("on")){
      htmlElement[prop.toLowerCase()] = null
    }
    else{
      let name = prop === 'className' ? 'class' : prop
      htmlElement.removeAttribute(name);
    }
  }

  public removeOldChild(oldNode: VNode<{}>): void {
    if(oldNode.dom) oldNode.dom.remove()
  }

  public removeOldChildren(oldNode: VNode<{}>): void {
    this.getOldChildren(oldNode).map((oldChild) => {
      this.removeOldChild(oldChild)
    });
  }

  public  getOldChildren(oldNode: VNode<{}>): VNode<{}>[] {
    return oldNode.props.children as Array<VNode>;
  }

  private renderTextNode(node: VNode): Text {
    return document.createTextNode(node.props.textValue);
  }
  
  private renderVNode(vnode: VNode): HTMLElement {
    const htmlElement: CustomHTMLElement = document.createElement(
      vnode.type as string
    );
    return htmlElement;
  }

  

}
