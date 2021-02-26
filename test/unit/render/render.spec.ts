
import {VNode} from "@src/types/vnode";
import render from "@src/render"
import {DomTreeSerializer,DomTreeStringify} from '@src/utils/DomTreeSerializer'

describe('Testing render function, it render VNode', () => {  
  let serializer: DomTreeSerializer

  beforeAll(() => {
    serializer = new DomTreeStringify()
  })

  it('render should render empty div', () => {
    let vnode: VNode = { type: "div", props: {} }
    let root : HTMLElement = document.createElement("div")
    render(vnode, root)
    expect(serializer.serializeNode(root)).toEqual("<div><div></div></div>")
  });

  it('render should render div with attribute like class', () => {
    let vnode: VNode = { type: "div", props: { className: "Alelí", children: [""] }
    let root : HTMLElement = document.createElement("div")
    render(vnode, root)
    expect(serializer.serializeNode(root)).toEqual(`<div><div className="Alelí"></div></div>`)
  });
  
})
