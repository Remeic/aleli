import AleliDiffer from "@src/differ/aleliDiffer";
import { Differ } from "@src/differ/differ";
import AleliRenderer from "@src/renderer";
import { RendererBase } from "@src/types/renderer";
import RendererUtilities from "@src/types/rendererUtilities";
import { VNode } from "@src/types/vNode";
import { instance, mock, reset, spy } from "ts-mockito";

describe('AleliRenderer render method', () => {
  let aleliRenderer: RendererBase
  let mockAleliDiffer : Differ
  let instanceAleliDiffer : Differ
  let mockRendererUtilities : RendererUtilities
  let instanceRendererUtilities: RendererUtilities
  let spiedAleliRenderer: RendererBase

  beforeAll(() => {
    mockAleliDiffer = mock(AleliDiffer)
    instanceAleliDiffer = instance(mockAleliDiffer)
    mockRendererUtilities = mock(RendererUtilities)
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
});