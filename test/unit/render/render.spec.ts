
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
  
})
