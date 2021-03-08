import { VNode, Children } from "@src/types/vnode";
import { Renderer, CustomHTMLElement } from "@src/types/renderer";

interface ActualDom {
  dom: HTMLElement | Text | null;
  children: Array<ActualDom> | null;
}
export default class AleliRenderer implements Renderer {
  private oldVNode: VNode | null;

  constructor() {
    this.oldVNode = null;
  }

  render(node: VNode, root: HTMLElement): void {
    console.log("render",node)
    this.diff(node, this.oldVNode, root);
  }

  private diff(
    newNode: VNode,
    oldNode: VNode | null = null,
    dom: HTMLElement | Text 
  ) {
    if (!oldNode) {
      if (newNode && newNode.type === "$TEXT") {
        newNode.dom = this.renderTextNode(newNode);
      } 
      if (newNode && newNode.type !== "$TEXT") { 
        console.log("rendr vnode",newNode.type)
        newNode.dom = this.renderVNode(newNode);
      }
    } else {
      newNode.dom = oldNode.dom 
    }

    if (dom && newNode.dom) dom.insertBefore(newNode.dom, null);

    let children: Children = newNode.props && newNode.props.children ? newNode.props.children : [];
    console.log("children",children)
    children.map((child, index) => {
      let oldestChild: VNode | null = null;
      if (oldNode && oldNode.props.children) {
        oldestChild = oldNode.props.children.find((oldChild, oldChildindex) => {
          return child.type === oldChild.type && index === oldChildindex;
        }) as VNode;
      }
      console.log("child",child.dom)
      this.diff(child,oldestChild,newNode.dom ? newNode.dom : null )
    });

    oldNode = oldNode ? oldNode : {type:'',props:{children: []}}
    if(newNode){
      Object.assign(oldNode,newNode)
    }
  }

  private renderVNode(vnode: VNode): HTMLElement {
    const htmlElement: CustomHTMLElement = document.createElement(vnode.type);
    // Object.keys(vnode.props)
    //   .filter(this.isNotChildrenProp)
    //   .forEach((prop) => {
    //     // Event listener attached with on<event> https://mzl.la/3rbCpxA
    //     let propName: string = prop.startsWith("on")
    //       ? prop.toLowerCase()
    //       : prop;
    //     if (propName in htmlElement) {
    //       htmlElement[propName] = vnode.props[prop];
    //     } else {
    //       htmlElement.setAttribute(prop, vnode.props[prop] as string);
    //     }
    //   });
    // for (let children of vnode.props.children as Array<Children>) {
    //   this.commit(children as any, htmlElement);
    // }
    // parent.appendChild(htmlElement);
    return htmlElement;
  }

  private renderTextNode(node: VNode): Text {
    return document.createTextNode(node.props.textValue);
  }

  private isNotChildrenProp(prop: string) {
    return prop !== "children";
  }
}
