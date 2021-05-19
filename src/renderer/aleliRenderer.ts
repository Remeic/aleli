import { VNode } from "@src/types/vNode";
import { CustomHTMLElement, Renderer } from "@src/types/renderer";
import { Differ } from "@src/types/differ";
import AleliDiffer from "@src/differ/aleliDiffer";
import RendererUtilities from "@src/types/rendererUtilities";
import AleliRendererUtilities from "@src/rendererUtilities/aleliRendererUtilities";

export default class AleliRenderer implements Renderer {
  private aleliDiffer: Differ;
  private rendererUtilities:  RendererUtilities;
  private emptyVNode : VNode = { type: "", props: { children: [] } }
  constructor(aleliDiffer?: Differ, rendererUtilities?: RendererUtilities){
    if(aleliDiffer && rendererUtilities){
      this.aleliDiffer = aleliDiffer
      this.rendererUtilities = rendererUtilities;
    }
    else{
      this.rendererUtilities = new AleliRendererUtilities()
      this.aleliDiffer = new AleliDiffer(this.rendererUtilities)
    }
  }

  render(node: VNode, root: CustomHTMLElement): void {
    if (
      Array<number>(Node.TEXT_NODE, Node.COMMENT_NODE).indexOf(root.nodeType) ==
      -1
    ) {
      if(root._vnode && node.type !== root._vnode.type){
        this.removeRootDom(root)
      }
      if (!root._vnode) {
        root._vnode = this.emptyVNode;
      }
      this.aleliDiffer.diffNodes(node, root, root._vnode);
    } else {
      throw new Error(
        "AleliRenderer, can't call render method on Text or Comment root node"
      );
    }
  }  


  private removeRootDom(root: CustomHTMLElement) {
    if(!root._vnode!.dom){
      throw new Error("Error, can't remove dom when root _vnode prop not have dom prop");
    }
    root._vnode!.dom.remove();
  }
}
