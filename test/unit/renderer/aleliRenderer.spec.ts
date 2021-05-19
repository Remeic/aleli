import AleliDiffer from "@src/differ/aleliDiffer";
import { Differ } from "@src/types/differ";
import AleliRenderer from "@src/renderer";
import AleliRendererUtilities from "@src/rendererUtilities/aleliRendererUtilities";
import { CustomHTMLElement, Renderer } from "@src/types/renderer";
import RendererUtilities from "@src/types/rendererUtilities";
import { VNode } from "@src/types/vNode";
import { deepEqual, instance, mock, reset, spy, verify } from "ts-mockito";

describe('AleliRenderer render method', () => {
  let aleliRenderer: Renderer
  let mockAleliDiffer : Differ
  let instanceAleliDiffer : Differ
  let mockRendererUtilities : RendererUtilities
  let instanceRendererUtilities: RendererUtilities
  let spiedAleliRenderer: Renderer
  const emptyVNode : VNode = { type: "", props: { children: [] } }

  beforeAll(() => {
    mockAleliDiffer = mock(AleliDiffer)
    instanceAleliDiffer = instance(mockAleliDiffer)
    mockRendererUtilities = mock(AleliRendererUtilities)
    instanceRendererUtilities = instance(mockRendererUtilities)
    aleliRenderer = new AleliRenderer(instanceAleliDiffer, instanceRendererUtilities)
    spiedAleliRenderer = spy(aleliRenderer)
  })

  beforeEach(() => {
    reset(mockAleliDiffer)
    reset(mockRendererUtilities)
  })

  it('AleliRenderer render method should throw exception if root arg is comment dom element', () => {
    const rootElement : any = document.createComment("Comment!")
    const vnode : VNode = {
      type: 'div',
      props: {
        children: []
      }
    }
    expect(() => aleliRenderer.render(vnode,rootElement)).toThrowError('AleliRenderer, can\'t call render method on Text or Comment root node')
  });

  it('AleliRenderer render method should throw exception if root arg is text dom element', () => {
    const rootElement : any = document.createComment("Comment!")
    const vnode : VNode = {
      type: '$TEXT',
      props: {
        textValue: 'Hello!',
        children: []
      }
    }
    expect(() => aleliRenderer.render(vnode,rootElement)).toThrowError('AleliRenderer, can\'t call render method on Text or Comment root node')
  });

  it('AleliRenderer render method should throw exception if root element not have _vdom prop', () => {
    const rootElement : any = document.createElement("div")
    rootElement._vnode = {
      type: 'span',
      props: {
        children: []
      },
    } 

    const vnode : VNode = {
      type: 'div',
      props: {
        children: []
      }
    }
    expect(() => aleliRenderer.render(vnode,rootElement)).toThrowError("Error, can't remove dom when root _vnode prop not have dom prop")
  });

  it('AleliRenderer render method should not override _vnode if already exists', () => {
    const rootElement : any = document.createElement("div")
    const divElement : CustomHTMLElement = document.createElement("div")

    rootElement._vnode = {
      type: 'span',
      props: {
        children: []
      },
      dom: divElement
    } 

    const vnode : VNode = {
      type: 'div',
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode,rootElement)
    expect(rootElement._vnode).not.toBe(emptyVNode)
    verify(mockAleliDiffer.diffNodes(vnode,rootElement,deepEqual(emptyVNode))).never()

  });

  it('AleliRenderer render method remove root dom element if type between re-renders diff', () => {
    const rootElement : CustomHTMLElement = document.createElement("div")
    const spanElement : CustomHTMLElement = document.createElement("span")
    const spiedSpanElement: CustomHTMLElement = spy(spanElement)

    rootElement._vnode = {
      type: 'span',
      props: {
        children: []
      },
      dom: spanElement
    } 

    const vnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }

    aleliRenderer.render(vnode,rootElement)
    verify(spiedSpanElement.remove()).once()
  });

  it('AleliRenderer render method set root _vnode to empty if not have a vnode', () => {
    const rootElement : CustomHTMLElement = document.createElement("div")

    const vnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }

    aleliRenderer.render(vnode,rootElement)
    expect(rootElement).toHaveProperty('_vnode',emptyVNode)

  });

  it('AleliRenderer render method call AleliDiffer diffNodes with vnode, root element and _vnode root empty if root not have _vnode', () => {
    const rootElement : CustomHTMLElement = document.createElement("div")
    const vnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode,rootElement)
    verify(mockAleliDiffer.diffNodes(vnode,rootElement,deepEqual(emptyVNode))).once()
  });

  it('AleliRenderer render method call AleliDiffer diffNodes with vnode, root element and _vnode root', () => {
    const rootElement : CustomHTMLElement = document.createElement("div")
    rootElement._vnode = {
      type: "div",
      props: {
        children: []
        }
    }
    const vnode : VNode = {
      type: "div",
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode,rootElement)
    verify(mockAleliDiffer.diffNodes(vnode,rootElement,rootElement._vnode)).once()
  });

});

describe('AleliRenderer can be used without args', () => {
    let aleliRenderer : AleliRenderer

    it('AleliRender can be initialized without args', () => {
      expect(() => aleliRenderer = new AleliRenderer()).not.toThrowError()
    });
});