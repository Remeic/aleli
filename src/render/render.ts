import { VNode, Children } from "@src/types/vnode";
import { Renderer, CustomHTMLElement } from "@src/types/renderer";
import { isVNode, isNotTextNode } from "@src/utils/detectNodeUtils";
import AleliComponent from "@src/components";

export default class AleliRenderer implements Renderer {
  render(node: VNode, root: CustomHTMLElement): void {
    if (
      Array<number>(Node.TEXT_NODE, Node.COMMENT_NODE).indexOf(root.nodeType) ==
      -1
    ) {
      if (!root._vnode || node.type !== root._vnode.type) {
        root._vnode && root._vnode.dom && root._vnode.dom.remove();
        root._vnode = { type: "", props: { children: [] } };
      }
      this.diff(node, root, root._vnode);
    } else {
      throw new Error(
        "AleliRenderer, can't call render method on Text or Comment root node"
      );
    }
  }

  private diff(newNode: VNode, dom: CustomHTMLElement | Text, oldNode: VNode) {
    if (typeof newNode.type !== "string") {
      console.log("Have to mount",!newNode.type.isMounted())
      if (!newNode.type.isMounted()) {
        newNode.type.mounting();
        newNode.type.mount();
      }
      this.diff(newNode.type.render(newNode.props), dom, oldNode);
    } else {
      newNode.dom = !oldNode.dom ? this.createElement(newNode) : oldNode.dom;
      this.insertElementIntoDom(dom, newNode);

      let children: Array<VNode> = newNode.props.children as Array<VNode>;

      children.map((child, index) => {
        let oldestChild: VNode = this.findOldChildrenIfExists(
          oldNode,
          child,
          index
        );
        this.diff(child, newNode.dom!, oldestChild);
      });

      //this.removeOldChildren(oldNode);

      if (isNotTextNode(newNode)) {
        this.diffProps(oldNode!, newNode, newNode.dom as CustomHTMLElement);
      }

      Object.assign(oldNode, newNode);
    }
  }

  private diffProps(
    oldVNode: VNode,
    newVNode: VNode,
    htmlElement: CustomHTMLElement
  ): void {
    Object.keys(newVNode.props)
      .filter(this.isNotChildrenProp)
      .forEach((prop) => {
        if (newVNode.props[prop] !== oldVNode.props[prop]) {
          this.setProperty(htmlElement, prop, newVNode.props);
        }
      });
    Object.keys(oldVNode.props)
      .filter(this.isNotChildrenProp)
      .filter((prop) => !(prop in newVNode.props))
      .forEach((prop) => {
        this.removeProperty(htmlElement, prop);
      });
  }

  setProperty(
    htmlElement: CustomHTMLElement,
    prop: string,
    props: { [other: string]: any; children: Children }
  ): void {
    if (!(prop in props)) {
      throw new Error(
        `Error setProperty: prop ${prop} is not present in props`
      );
    } else {
      //Event listener attached with on<event> https://mzl.la/3rbCpxA
      const name: string = prop.startsWith("on") ? prop.toLowerCase() : prop;
      if (prop === "key") {
        return;
      }
      if (prop in htmlElement) {
        htmlElement[name] = props[name];
      } else {
        htmlElement.setAttribute(name, props[prop as string]);
      }
    }
  }

  removeProperty(htmlElement: CustomHTMLElement, prop: string) {
    //Event listener attached with on<event> https://mzl.la/3rbCpxA
    if(prop.startsWith("on")){
      htmlElement[prop.toLowerCase()] = null
    }
    else{
      let name = prop === 'className' ? 'class' : prop
      htmlElement.removeAttribute(name);
    }
  }

  private renderVNode(vnode: VNode): HTMLElement {
    const htmlElement: CustomHTMLElement = document.createElement(
      vnode.type as string
    );
    return htmlElement;
  }

  private renderTextNode(node: VNode): Text {
    return document.createTextNode(node.props.textValue);
  }

  private isNotChildrenProp(prop: string): boolean {
    return prop !== "children";
  }

  private insertElementIntoDom(
    dom: CustomHTMLElement | Text,
    newNode: VNode<{}>
  ) {
    newNode.dom && dom.insertBefore(newNode.dom, null);
  }

  createElement(newNode: VNode<{}>): HTMLElement | Text {
    if (newNode.type === "$TEXT") {
      return this.renderTextNode(newNode);
    } else {
      return this.renderVNode(newNode);
    }
  }

  private removeOldChildren(oldNode: VNode<{}>): void {
    this.getOldChildren(oldNode).map((oldChild) => {
      this.removeOldChild(oldChild)
    });
  }

  removeOldChild(oldNode: VNode<{}>): void {
    if(oldNode.dom) oldNode.dom.remove()
  }

  private getOldChildren(oldNode: VNode<{}>): VNode<{}>[] {
    return oldNode.props.children as Array<VNode>;
  }

  findOldChildrenIfExists(
    oldNode: VNode<{}>,
    child: VNode<{}>,
    index: number
  ): VNode {
    return (
      (this.getOldChildren(oldNode).find((oldChild, oldChildindex) => {
        let result = undefined
        let oldChildNotFinded : VNode = oldChild
        
        if (child.props.key && oldChild.props.key) {
          if (
            child.props.key === oldChild.props.key &&
            child.type === oldChild.type
          ) {
            result = oldChild;
          }
        } else {
          if (child.type === oldChild.type && index === oldChildindex)
            result = oldChild;
        }
        if(result === undefined){
          if(typeof oldChildNotFinded.type !== 'string'){
            oldChildNotFinded.type.destroying()
            oldChildNotFinded.type.destroy()
          }
          this.removeOldChildren(oldNode);
        }
        return result;

      }) as VNode) || { type: "", props: { children: [] } }
    );
  }
}
