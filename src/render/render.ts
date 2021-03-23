import { VNode, Children } from "@src/types/vnode";
import { Renderer, CustomHTMLElement } from "@src/types/renderer";
import { isVNode, isNotTextNode } from "@src/utils/detectNodeUtils";
import AleliComponent from "@src/components";

export default class AleliRenderer implements Renderer {
  render(node: VNode, root: CustomHTMLElement): void {
    if(Array<number>(Node.TEXT_NODE, Node.COMMENT_NODE).indexOf(root.nodeType) == -1){
      if(!root._vnode || node.type !== root._vnode.type){
        root._vnode && root._vnode.dom && root._vnode.dom.remove()
        root._vnode = { type: "", props: { children: [] } };
      }
      this.diff(node, root, root._vnode);
    }
    else{
      throw new Error('AleliRenderer, can\'t call render method on Text or Comment root node');
    }
  }

  private diff(newNode: VNode, dom: CustomHTMLElement | Text, oldNode: VNode) {
    if( newNode.type instanceof AleliComponent){
      this.diff(newNode.type.render(),dom,oldNode)
    }
    else{
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
  
      this.removeOldChildren(oldNode);
  
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
  ) {
      Object.keys(newVNode.props)
        .filter(this.isNotChildrenProp)
        .forEach((prop) => {
          if(newVNode.props[prop] !== oldVNode.props[prop]) {
            this.setProperty(htmlElement, prop, newVNode.props);
          }
        });
        Object.keys(oldVNode.props)
        .filter(this.isNotChildrenProp)
        .filter(prop => !(prop in newVNode.props))
        .forEach((prop) => {
            this.removeProperty(htmlElement,prop)
        });
    
  }

  private setProperty(
    htmlElement: CustomHTMLElement,
    prop: string,
    props: { [other: string]: any; children: Children }
  ) {
    //Event listener attached with on<event> https://mzl.la/3rbCpxA
    const name: string = prop.startsWith("on") ? prop.toLowerCase() : prop;
    if(prop === 'key') { return }
    if (prop in htmlElement) {
      htmlElement[name] = props[name];
    } else {
      htmlElement.setAttribute(name, props[prop as string]);
    }
  }

  private removeProperty(htmlElement: CustomHTMLElement, prop: string) {
    //Event listener attached with on<event> https://mzl.la/3rbCpxA
    let name: string = prop.startsWith("on") ? prop.toLowerCase() : prop;
    name = name === "className" ? "class" : name;
    htmlElement.removeAttribute(name);
  }

  private renderVNode(vnode: VNode): HTMLElement {
    const htmlElement: CustomHTMLElement = document.createElement(vnode.type as string);
    return htmlElement;
  }

  private renderTextNode(node: VNode): Text {
    return document.createTextNode(node.props.textValue);
  }

  private isNotChildrenProp(prop: string) {
    return prop !== "children";
  }

  private insertElementIntoDom(
    dom: CustomHTMLElement | Text,
    newNode: VNode<{}>
  ) {
    newNode.dom && dom.insertBefore(newNode.dom, null);
  }

  private createElement(newNode: VNode<{}>): HTMLElement | Text {
    if (newNode.type === "$TEXT") {
      return this.renderTextNode(newNode);
    } else {
      return this.renderVNode(newNode);
    }
  }

  private removeOldChildren(oldNode: VNode<{}>) {
    this.getOldChildren(oldNode).map((oldChild) => {
      oldChild.dom!.remove();
    });
  }

  private getOldChildren(oldNode: VNode<{}>): VNode<{}>[] {
    return oldNode.props.children as Array<VNode>;
  }

  private findOldChildrenIfExists(
    oldNode: VNode<{}>,
    child: VNode<{}>,
    index: number
  ): VNode {
    return (
      (this.getOldChildren(oldNode).find((oldChild, oldChildindex) => {
        let result = undefined
        if(child.props.key && oldChild.props.key) {  
          if((child.props.key === oldChild.props.key) && (child.type === oldChild.type)){
           result = oldChild
          }
        }else {
          if(child.type === oldChild.type && index === oldChildindex )
            result = oldChild
        }
        return result
      }) as VNode) || { type: "", props: { children: [] } }
    );
  }
}
