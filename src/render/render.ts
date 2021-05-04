import { VNode } from "@src/types/vNode";
import { CustomHTMLElement, RendererBase } from "@src/types/renderer";
import { Differ } from "@src/differ/differ";
import AleliDiffer from "@src/differ/aleliDiffer";
import RendererUtilities from "@src/types/rendererUtilities";

export default class AleliRenderer implements RendererBase {
  private aleliDiffer: Differ;

  constructor(aleliDiffer?: Differ){
    if(aleliDiffer){
      this.aleliDiffer = aleliDiffer
    }
    else{
      this.aleliDiffer = new AleliDiffer(new RendererUtilities())
    }
  }

  render(node: VNode, root: CustomHTMLElement): void {
    if (
      Array<number>(Node.TEXT_NODE, Node.COMMENT_NODE).indexOf(root.nodeType) ==
      -1
    ) {
      if (!root._vnode || node.type !== root._vnode.type) {
        root._vnode && root._vnode.dom && root._vnode.dom.remove();
        root._vnode = { type: "", props: { children: [] } };
      }
      this.aleliDiffer.diffNodes(node, root, root._vnode);
    } else {
      throw new Error(
        "AleliRenderer, can't call render method on Text or Comment root node"
      );
    }
  }  
}
