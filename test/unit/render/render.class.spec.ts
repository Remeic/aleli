import { VNode } from "@src/types/vnode";
import AleliRenderer from "@src/render";
import {
  DomTreeSerializer,
  DomTreeStringify,
} from "@src/utils/DomTreeSerializer";
import { Renderer } from "@src/types/renderer";
import AleliComponent from "@src/components" 

class TestComponent extends AleliComponent {
  constructor(){
    super()
  }
  render(): VNode<{}> {
    let vnode: VNode = {
      type: 'div',
      props: {
        children: [
          {
            type: '$TEXT',
            props:{
              textValue: "Hello",
              children: []
            }
          }
        ]
      }
    }
    return vnode
  }
}

describe("Testing render function, it render VNodes", () => {
  let serializer: DomTreeSerializer;
  let aleliRenderer: Renderer;
  let Component: AleliComponent

  beforeAll(() => {
    serializer = new DomTreeStringify();
    aleliRenderer = new AleliRenderer();
    Component = new TestComponent()
  });


  it('render method should render class components ', () => {
    let root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: Component,
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child.localName).toEqual("div");
    expect(child.firstChild!.textContent).toEqual("Hello")
  });

})