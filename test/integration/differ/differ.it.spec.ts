import AleliDiffer from "@src/differ/aleliDiffer";
import { Differ } from "@src/types/differ";
import { CustomHTMLElement, Renderer } from "@src/types/renderer";
import AleliRendererUtilities from "@src/rendererUtilities/aleliRendererUtilities";
import { VNode } from "@src/types/vNode";
import {
  mock,
  verify,
  instance,
  spy,
  when,
  deepEqual,
  reset,
} from "ts-mockito"
import TestComponent from "../../__mocks__/testComponent.mock";
import DetectNodeUtils from "@src/utils/detectNodeUtils";
import RendererUtilities from "@src/types/rendererUtilities";
import Component from "@src/types/component";

describe("Integration Test for aleliDiffer, integrate Differ with RendererUtilities and DetectNodeUtils", () => {
  let detectNodeUtils: DetectNodeUtils 
  let aleliDiffer: Differ
  let aleliRendererUtilities: RendererUtilities
  let mockedTestComponent: Component
  let instanceTestComponent : Component

  beforeAll(() => {
    mockedTestComponent = mock(TestComponent)
    instanceTestComponent = instance(mockedTestComponent)
    detectNodeUtils = new DetectNodeUtils()
    aleliRendererUtilities = new AleliRendererUtilities()
    aleliDiffer = new AleliDiffer(aleliRendererUtilities,detectNodeUtils)
  })

  beforeEach(() => {
    reset(mockedTestComponent)
  })

  it('aleliDiffer diffNodes method should update dom tree with base component', () => {
    const root : HTMLDivElement = document.createElement("div")
    const divElement: HTMLDivElement = document.createElement("div")

    const oldVnode: VNode = {
      type: "span",
      props: {
        children:[]
      }
    }

    const vnode: VNode = {
      type: "div",
      props: {
        children:[]
      }
    }

    aleliDiffer.diffNodes(vnode,root,oldVnode)
    const child : HTMLElement | null = root.firstChild as HTMLElement
    expect(child).toStrictEqual(divElement)
  })

  it('aleliDiffer diffNodes method should set new element with props instead old one with base component', () => {
    const root : HTMLDivElement = document.createElement("div")
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.setAttribute('testProp','Alelí')

    const oldVnode: VNode = {
      type: "span",
      props: {
        id:1,
        children:[]
      }
    }

    const vnode: VNode = {
      type: "div",
      props: {
        testProp:'Alelí',
        children:[]
      }
    }

    aleliDiffer.diffNodes(vnode,root,oldVnode)
    const child : HTMLElement | null = root.firstChild as HTMLElement
    expect(child).toStrictEqual(divElement)
  })

  it('aleliDiffer diffNodes method should update old vnode with new props with base component', () => {
    const root : HTMLDivElement = document.createElement("div")
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.setAttribute('testProp','Alelí')

    const oldVnode: VNode = {
      type: "div",
      props: {
        id:1,
        children:[]
      }
    }

    const vnode: VNode = {
      type: "div",
      props: {
        testProp:'Alelí',
        children:[]
      }
    }

    aleliDiffer.diffNodes(vnode,root,oldVnode)
    const child : HTMLElement | null = root.firstChild as HTMLElement
    expect(child).toStrictEqual(divElement)
  })

  it('aleliDiffer diffNodes method should update old vnode with props with base component', () => {
    const root : HTMLDivElement = document.createElement("div")
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.setAttribute('id','-1')

    const oldVnode: VNode = {
      type: "div",
      props: {
        id:1,
        children:[]
      }
    }

    const vnode: VNode = {
      type: "div",
      props: {
        id:-1,
        children:[]
      }
    }

    aleliDiffer.diffNodes(vnode,root,oldVnode)
    const child : HTMLElement | null = root.firstChild as HTMLElement
    expect(child).toStrictEqual(divElement)
  })

  it('aleliDiffer diffNodes method should update old vnode ref to new one with base component', () => {
    const root : HTMLDivElement = document.createElement("div")
    
    const oldVnode: VNode = {
      type: "span",
      props: {
        id:1,
        children:[]
      }
    }

    const vnode: VNode = {
      type: "div",
      props: {
        children:[]
      }
    }

    aleliDiffer.diffNodes(vnode,root,oldVnode)
    expect(oldVnode).toStrictEqual(vnode)
  })

  it('aleliDiffer diffNodes method should update old text node with base component', () => {
    const root : HTMLDivElement = document.createElement("div")
    const oldText: string = "old"
    const newText: string = "updated"

    const oldTextVnode: VNode = {
      type: "$TEXT",
      props: {
        textValue: oldText,
        children:[]
      }
    }

    const newTextVnode: VNode = {
      type: "$TEXT",
      props: {
        textValue: newText,
        children:[]
      }
    }


    const oldVnode: VNode = {
      type: "div",
      props: {
        children:[oldTextVnode]
      }
    }

    const vnode: VNode = {
      type: "div",
      props: {
        children:[newTextVnode]
      }
    }

    
    aleliDiffer.diffNodes(vnode,root,oldVnode)
    const child : HTMLElement | null = root.firstChild as HTMLElement
    expect(child.textContent).toBe(newText)
  })

  it('aleliDiffer diffNodes method should update entire child tree with base component', () => {
    const text : string = 'Alelí'
    const root : HTMLDivElement = document.createElement("div")
    const secondOldChildElement : HTMLHeadingElement = document.createElement('h1')
    const newChildElement : HTMLSpanElement = document.createElement('span')
    const divElement: HTMLDivElement = document.createElement("div")
    secondOldChildElement.appendChild(new Text(text))
    secondOldChildElement.setAttribute('upper','true')
    newChildElement.setAttribute('test','1')
    divElement.insertBefore(newChildElement,null)
    divElement.insertBefore(secondOldChildElement,newChildElement)

    const firstOldChild: VNode = {
      type: "span",
      props: {
        test:1,
        children:[]
      }
    }

    const textOldChild: VNode = {
      type: "$TEXT",
      props: {
        textValue: text,
        children:[]
      }
    }

    const secondOldChild: VNode = {
      type: "h1",
      props: {
        upper: true,
        children:[textOldChild]
      }
    }

    
    const newChild: VNode = {
      type: "span",
      props: {
        test:1,
        children:[]
      }
    }

    const oldVnode: VNode = {
      type: "div",
      props: {
        id:1,
        children:[firstOldChild,secondOldChild]
      }
    }

    const vnode: VNode = {
      type: "div",
      props: {
        children:[secondOldChild,newChild]
      }
    }

    aleliDiffer.diffNodes(vnode,root,oldVnode)
    const child : HTMLElement | null = root.firstChild as HTMLElement
    expect(child).toStrictEqual(divElement)
  })

  it('aleliDiffer diffNodes method should diff base component with class component', () => {
    const root : HTMLDivElement = document.createElement("div")
    const divElement: HTMLDivElement = document.createElement("div")
    divElement.setAttribute("test","Alelí")

    const oldVnode: VNode = {
      type: "span",
      props: {
        test:"Alelí",
        children:[]
      }
    }

    const vnode: VNode = {
      type: TestComponent,
      props: {
        children:[]
      },
      component: instanceTestComponent
    }

    const componentRenderResult : VNode = {
      type: "div",
      props: {
        test:"Alelí",
        children:[]
      }
    } 

    when(mockedTestComponent.render(deepEqual(vnode.props))).thenReturn(componentRenderResult)
    when(mockedTestComponent.destroy()).thenCall(()=>{})
    when(mockedTestComponent.destroying()).thenCall(()=>{})
    when(mockedTestComponent.isMounted()).thenReturn(false)
    aleliDiffer.diffNodes(vnode,root,oldVnode)
    const child : HTMLElement | null = root.firstChild as HTMLElement
    expect(child).toStrictEqual(divElement)
  })


  it('AleliDiffer findOldChildrenIfExists method, should return emptyVnode if valid old vnode is not found', () => {
    const emptyVnode: VNode = {
      type: '',
      props: {
        children: []
      }
    }
    const oldVnode: VNode = {
      type: "div",
      props: {
        children: []
      },
    }
    const child: VNode = {
      type: "span",
      props: {
        children: []
      },
    }

   expect(aleliDiffer.findOldChildrenIfExists(oldVnode,child,0)).toStrictEqual(emptyVnode)
  });

  it('AleliDiffer findOldChildrenIfExists method, should return old valid vnode if type is the same and key is the same', () => {
    const oldChild: VNode = {
      type: "span",
      props: {
        key:1,
        children: []
      },
    }
    
    const oldVnode: VNode = {
      type: "div",
      props: {
        children: [oldChild]
      },
    }
    

    const child: VNode = {
      type: "span",
      props: {
        key:1,
        children: []
      },
    }

   expect(aleliDiffer.findOldChildrenIfExists(oldVnode,child,0)).toStrictEqual(oldChild)
  });

  it('AleliDiffer findOldChildrenIfExists method, should return empty vnode if type is not the same and but keys are', () => {
    const emptyVnode: VNode = {
      type: '',
      props: {
        children: []
      }
    }
    
    const oldChild: VNode = {
      type: "div",
      props: {
        key:1,
        children: []
      },
    }
    
    const oldVnode: VNode = {
      type: "div",
      props: {
        children: [oldChild]
      },
    }
    

    const child: VNode = {
      type: "span",
      props: {
        key:1,
        children: []
      },
    }

   expect(aleliDiffer.findOldChildrenIfExists(oldVnode,child,0)).toStrictEqual(emptyVnode)
  });

  it('AleliDiffer findOldChildrenIfExists method, should return empty vnode if type is the same and but keys are not and position is the same', () => {
    const emptyVnode: VNode = {
      type: '',
      props: {
        children: []
      }
    }
    
    const oldChild: VNode = {
      type: "div",
      props: {
        key:1,
        children: []
      },
    }

    const oldChildSecond: VNode = {
      type: "span",
      props: {
        key:1,
        children: []
      },
    }
    
    const oldVnode: VNode = {
      type: "div",
      props: {
        children: [oldChild,oldChildSecond]
      },
    }
    

    const child: VNode = {
      type: "span",
      props: {
        key:2,
        children: []
      },
    }

   expect(aleliDiffer.findOldChildrenIfExists(oldVnode,child,0)).toStrictEqual(emptyVnode)
  });


  it('AleliDiffer findOldChildrenIfExists method, should return empty vnode if type is the same and but one of them not have key', () => {
    const emptyVnode: VNode = {
      type: '',
      props: {
        children: []
      }
    }
    
    const oldChild: VNode = {
      type: "div",
      props: {
        children: []
      },
    }
    
    const oldVnode: VNode = {
      type: "div",
      props: {
        children: [oldChild]
      },
    }
    

    const child: VNode = {
      type: "span",
      props: {
        key:2,
        children: []
      },
    }

   expect(aleliDiffer.findOldChildrenIfExists(oldVnode,child,0)).toStrictEqual(emptyVnode)
  });

});
