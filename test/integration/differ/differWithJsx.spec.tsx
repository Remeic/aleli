import AleliComponent from "@src/components";
import createElement from "@src/createElement";
import AleliDiffer from "@src/differ/aleliDiffer";
import AleliRendererUtilities from "@src/rendererUtilities/aleliRendererUtilities";
import { Differ } from "@src/types/differ";
import RendererUtilities from "@src/types/rendererUtilities";
import { Children, VNode } from "@src/types/vNode";
import DetectNodeUtils from "@src/utils/detectNodeUtils";
import { mock, instance } from "ts-mockito";
import TestComponent from "../../__mocks__/testComponent.mock"

describe('Integration Test for AleliDiffer and createElement, interact with JSX', () => {
  let aleliDiffer: Differ
  let rendererUtilities : RendererUtilities
  let detectNodeUtils: DetectNodeUtils
  let mockedTestComponent: AleliComponent
  let InstanceTestComponent: TestComponent

  beforeAll(()=>{
    rendererUtilities = new AleliRendererUtilities()
    detectNodeUtils = new DetectNodeUtils()
    aleliDiffer = new AleliDiffer(rendererUtilities,detectNodeUtils)
    mockedTestComponent = mock(TestComponent)
    InstanceTestComponent = instance(mockedTestComponent)
  })

  it('AleliDiffer diffNodes method can update dom element with different type but same props',() => {
    const oldVNode: VNode = <div id={1} ></div>
    const newVNode: VNode = <span id={1} ></span>
    const rootElement : HTMLDivElement = document.createElement("div")
    const spanElement: HTMLSpanElement = document.createElement("span")
    spanElement.setAttribute('id',"1")
    aleliDiffer.diffNodes(newVNode,rootElement,oldVNode)
    expect(rootElement.firstChild).toStrictEqual(spanElement)
  })

  it('AleliDiffer diffNodes method can update dom element with same type but different props',() => {
    const fun = () => 3
    const oldVNode: VNode = <div testProp={fun}></div>
    const newVNode: VNode = <div isVisible={true} ></div>
    const rootElement : HTMLDivElement = document.createElement("div")
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.setAttribute("isVisible","true")
    aleliDiffer.diffNodes(newVNode,rootElement,oldVNode)
    expect(rootElement.firstChild).toStrictEqual(divElement)
  })

  it('AleliDiffer diffNodes method update dom but not set key attribute',() => {
    const oldVNode: VNode = <div></div>
    const newVNode: VNode = <div key={1} ></div>
    const rootElement : HTMLDivElement = document.createElement("div")
    const divElement: HTMLDivElement = document.createElement("div")
    aleliDiffer.diffNodes(newVNode,rootElement,oldVNode)
    expect(rootElement.firstChild).toStrictEqual(divElement)
  })

  it('AleliDiffer diffNodes method update dom and set onClick listener',() => {
    const fun = () => 3
    const oldVNode: VNode = <div></div>
    const newVNode: VNode = <div onClick={fun} ></div>
    const rootElement : HTMLDivElement = document.createElement("div")
    const divElement: HTMLDivElement = document.createElement("div")
    aleliDiffer.diffNodes(newVNode,rootElement,oldVNode)
    const htmlElement: HTMLElement = rootElement.firstChild as HTMLElement
    expect(typeof htmlElement.onclick).toBe("function")
  })

  it('AleliDiffer diffNodes method update dom with children',() => {
    const headingElement: HTMLHeadingElement = document.createElement("h1")
    headingElement.innerHTML = "Alelí"
    const oldVNode: VNode = <div></div>
    const newVNode: VNode = <div>
      <div id="id1">
        <h1>Alelí</h1>
      </div>
      <span id="id2">
        <b id="id3"></b>
      </span>
    </div>
    const rootElement : HTMLDivElement = document.createElement("div")
    aleliDiffer.diffNodes(newVNode,rootElement,oldVNode)
    const htmlElement: HTMLElement = rootElement.firstChild as HTMLElement
    const firstChildExpected : HTMLDivElement | null = htmlElement.querySelector("#id1")
    expect(firstChildExpected).not.toBe(null)
    expect(firstChildExpected!.firstChild).toStrictEqual(headingElement)
    expect(htmlElement.querySelector("#id2")).not.toBe(null)
    expect(htmlElement.querySelector("#id2")!.localName).toBe('span')
    expect(htmlElement.querySelector("#id3")).not.toBe(null)
    expect(htmlElement.querySelector("#id3")!.localName).toBe('b')
  })

  it('AleliDiffer diffNodes method called multiple times always update correctly the dom',() => {
    const headingElement: HTMLHeadingElement = document.createElement("h1")
    headingElement.textContent = "Alelí"
    const rootElement : HTMLDivElement = document.createElement("div")
    const firstVNode: VNode = <h1></h1>
    const secondVNode: VNode = <div>
      <div id="id1">
        <h1>Alelí</h1>
      </div>
    </div>

    const thirdVNode: VNode = <div>
      <span id="id1">
        Prova
      </span>
    </div>
   
    aleliDiffer.diffNodes(secondVNode,rootElement,firstVNode)
    const htmlElement: HTMLElement = rootElement.firstChild as HTMLElement
    const divChildExpected : HTMLDivElement | null = htmlElement.querySelector("#id1")
    expect(divChildExpected).not.toBe(null)
    expect(divChildExpected!.firstChild).toStrictEqual(headingElement)
    aleliDiffer.diffNodes(thirdVNode,rootElement,firstVNode)
    const spanChildExpected : HTMLSpanElement | null = htmlElement.querySelector("#id1")
    expect(spanChildExpected).not.toBe(null)
    expect(spanChildExpected!.localName).toBe('span')
  })

  it('AleliDiffer diffNodes method can update dom element with Class Component',() => {
    class TComponent extends AleliComponent {
      destroying(): void {
      }
      mounting(): void {
      }
      render(props: { [other: string]: any; children: Children; }): VNode<{}> {
        return {
          type:"span",
          props: {
            id:1,
            children: [] 
          }
        }
      }
    }
    const oldVNode: VNode = <div id={1} ></div>
    const newVNode: VNode = (<TComponent id={1} ></TComponent>)
    const rootElement : HTMLDivElement = document.createElement("div")
    const spanElement: HTMLSpanElement = document.createElement("span")
    spanElement.setAttribute('id',"1")
    aleliDiffer.diffNodes(newVNode,rootElement,oldVNode)
    expect(rootElement.firstChild).toStrictEqual(spanElement)
  })

  

});