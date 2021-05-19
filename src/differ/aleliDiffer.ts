import { CustomHTMLElement } from "@src/types/renderer";
import DetectNodeUtils from "@src/utils/detectNodeUtils";
import { Differ } from "@src/types/differ";
import { VNode } from "@src/types/vNode";
import Component from "@src/types/component";
import RendererUtilities from "@src/types/rendererUtilities";
import AleliComponent from "@src/components";

export default class AleliDiffer implements Differ{
  private renderUtilities : RendererUtilities
  private detectNodeUtils : DetectNodeUtils

  constructor(renderUtilities : RendererUtilities, detectNodeUtils: DetectNodeUtils = new DetectNodeUtils()){
    this.renderUtilities = renderUtilities
    this.detectNodeUtils = detectNodeUtils
  }

  diffNodes(newNode: VNode<{}>, dom: CustomHTMLElement | Text, oldNode: VNode<{}>): void {
    if (typeof newNode.type !== "string") {
      this.handleDiffClassComponent(newNode,dom,oldNode)
    } else {
      this.handleDiffBaseComponent(newNode,dom,oldNode)
    }
  }


  findOldChildrenIfExists(
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
            
          ) {
            result = oldChild;
          }
        } 
        else if (child.props.key || oldChild.props.key){
          result = undefined
        }
        else {
          if (child.type === oldChild.type)
            result = oldChild;
        }
        if(result === undefined){
          if(oldChildNotFinded.component){
            oldChildNotFinded.component.destroying()
            oldChildNotFinded.component.destroy()
          }
          this.renderUtilities.removeOldChild(oldChild);
        }
        return result;

      }) as VNode) || emtpyVNode
    );
  }

  diffProps(
    oldVnode: VNode,
    newVnode: VNode,
    htmlElement: CustomHTMLElement
  ): void {
    this.addNewProps(oldVnode,newVnode,htmlElement)
    this.removeOldProps(oldVnode,newVnode,htmlElement)
  }

  private addNewProps(
    oldVnode: VNode,
    newVnode: VNode,
    htmlElement: CustomHTMLElement
  ): void {
    const {children, key, ...props} = newVnode.props
    Object.keys(props)
    .forEach((prop) => {
      if (
        newVnode.props[prop] !== oldVnode.props[prop] ||
        newVnode.type !== oldVnode.type ||
        htmlElement.getAttribute(prop) != newVnode.props[prop]
      ) {
        this.renderUtilities.setProperty(htmlElement, prop, newVnode.props);
      }
    });
  }

  private removeOldProps(
    oldVnode: VNode,
    newVnode: VNode,
    htmlElement: CustomHTMLElement
  ): void {
    const {children, ...props} = oldVnode.props
    Object.keys(props)
    .filter((prop) => !(prop in newVnode.props))
    .forEach((prop) => {
      this.renderUtilities.removeProperty(htmlElement, prop);
    });
  }

  private handleDiffClassComponent(newNode: VNode<{}>, dom: CustomHTMLElement | Text, oldNode: VNode<{}>): void{
    if(!newNode.component){
      // @ts-ignore
      newNode.component = this.instantiateClassComponent(newNode.type)
    }    
    if ( newNode.component && !newNode.component.isMounted()) {
      newNode.component.mounting();
      newNode.component.mount();
    }
    newNode.dom = !oldNode.dom ? this.renderUtilities.createElement(newNode.component.render(newNode.props)) : oldNode.dom;
    Object.assign(oldNode, newNode);
    newNode.component && this.diffNodes(newNode.component.render(newNode.props), dom, oldNode);
  }

  private handleDiffBaseComponent(newNode: VNode<{}>, dom: CustomHTMLElement | Text, oldNode: VNode<{}>) : void {
    
    newNode.dom = !oldNode.dom ? this.renderUtilities.createElement(newNode) : oldNode.dom;
    this.renderUtilities.insertElementIntoDom(dom, newNode);
    
    let children: Array<VNode> = newNode.props.children as Array<VNode>;
    children.map((child, index) =>  this.findOldChildAndDiff(oldNode, child, index, newNode));
   

    if (this.detectNodeUtils.isNotTextNode(newNode)) {
      
      this.diffProps(oldNode, newNode, newNode.dom as CustomHTMLElement);
    }

    Object.assign(oldNode, newNode);
  }

  private findOldChildAndDiff(oldNode: VNode<{}>, child: VNode<{}>, index: number, newNode: VNode<{}>) {
    let oldestChild: VNode = this.findOldChildrenIfExists(
      oldNode,
      child,
      index
    );
    this.diffNodes(child, newNode.dom!, oldestChild);
  }

  private instantiateClassComponent(classComponent: { new(): Component }): Component {
    return new classComponent();
  }
}

