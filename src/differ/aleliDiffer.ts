import { CustomHTMLElement } from "@src/types/renderer";
import { isNotTextNode } from "@src/utils/detectNodeUtils";
import { Differ } from "./differ";
import RendererUtilities from "@src/types/rendererUtilities"
import { VNode } from "@src/types/vNode";

export default class AleliDiffer implements Differ{
  private renderUtilities : RendererUtilities;

  constructor(renderUtilities : RendererUtilities){
    this.renderUtilities = renderUtilities
  }

  diffNodes(newNode: VNode<{}>, dom: CustomHTMLElement | Text, oldNode: VNode<{}>): void {
    if (typeof newNode.type !== "string") {
      if (!newNode.type.isMounted()) {
        newNode.type.mounting();
        newNode.type.mount();
      }
      this.diffNodes(newNode.type.render(newNode.props), dom, oldNode);
    } else {
      newNode.dom = !oldNode.dom ? this.renderUtilities.createElement(newNode) : oldNode.dom;
      this.renderUtilities.insertElementIntoDom(dom, newNode);

      let children: Array<VNode> = newNode.props.children as Array<VNode>;

      children.map((child, index) => {
        let oldestChild: VNode = this.findOldChildrenIfExists(
          oldNode,
          child,
          index
        );
        this.diffNodes(child, newNode.dom!, oldestChild);
      });


      if (isNotTextNode(newNode)) {
        this.diffProps(oldNode.props, newNode.props, newNode.dom as CustomHTMLElement);
      }

      Object.assign(oldNode, newNode);
    }
  }

  public findOldChildrenIfExists(
    oldNode: VNode<{}>,
    child: VNode<{}>,
    index: number
  ): VNode {
    const emtpyVNode : VNode = { type: "", props: { children: [] } }
    return (
      (this.renderUtilities.getOldChildren(oldNode).find((oldChild, oldChildindex) => {
        let result = undefined
        let oldChildNotFinded : VNode = oldChild
       
        if (child.props.key && oldChild.props.key) {
          if (
            child.props.key === oldChild.props.key &&
            child.type === oldChild.type
            && index === oldChildindex
          ) {
            result = oldChild;
          }
        } 
        else if (child.props.key || oldChild.props.key){
          result = undefined
        }
        else {
          if (child.type === oldChild.type && index === oldChildindex)
            result = oldChild;
        }
        if(result === undefined){
          if(typeof oldChildNotFinded.type !== 'string'){
            oldChildNotFinded.type.destroying()
            oldChildNotFinded.type.destroy()
          }
          this.renderUtilities.removeOldChildren(oldNode);
        }
        return result;

      }) as VNode) || emtpyVNode
    );
  }

  diffProps(
    oldProps: VNode["props"],
    newProps: VNode["props"],
    htmlElement: CustomHTMLElement
  ): void {
    this.addNewProps(oldProps,newProps,htmlElement)
    this.removeOldProps(oldProps,newProps,htmlElement)
  }

  private addNewProps(
    oldProps: VNode["props"],
    newProps: VNode["props"],
    htmlElement: CustomHTMLElement
  ): void {
    const {children, key, ...props} = newProps
    Object.keys(props)
    .forEach((prop) => {
      if (newProps[prop] !== oldProps[prop]) {
        this.renderUtilities.setProperty(htmlElement, prop, newProps);
      }
    });
  }

  private removeOldProps(
    oldProps: VNode["props"],
    newProps: VNode["props"],
    htmlElement: CustomHTMLElement
  ): void {
    const {children, key, ...props} = oldProps
    Object.keys(props)
    .filter((prop) => !(prop in newProps))
    .forEach((prop) => {
      this.renderUtilities.removeProperty(htmlElement, prop);
    });
  }

}
