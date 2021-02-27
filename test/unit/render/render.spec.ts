
import {VNode} from "@src/types/vnode";
import AleliRenderer from "@src/render"
import {DomTreeSerializer,DomTreeStringify} from '@src/utils/DomTreeSerializer'
import {Renderer} from "@src/types/renderer"

describe('Testing render function, it render VNode', () => {  
  let serializer: DomTreeSerializer
  let aleliRenderer: Renderer

  beforeAll(() => {
    serializer = new DomTreeStringify()
    aleliRenderer = new AleliRenderer()
  })

  it('render should render empty div', () => {
    let vnode: VNode = { type: "div", props: {} }
    let root : HTMLElement = document.createElement("div")
    aleliRenderer.render(vnode, root)
    expect(serializer.serializeNode(root)).toEqual("<div><div></div></div>")
  });

  it('render should render div with attribute like class', () => {
    let vnode: VNode<{className: "Alelí"}> = { type: "div", props: { className: "Alelí", children: [""] }}
    let root : HTMLElement = document.createElement("div")
    aleliRenderer.render(vnode, root)
    expect(serializer.serializeNode(root)).toEqual(`<div><div class="Alelí"></div></div>`)
  });
  
})
