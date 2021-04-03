import { VNode } from "@src/types/vnode";
import AleliRenderer from "@src/render";
import {
  DomTreeSerializer,
  DomTreeStringify,
} from "@src/utils/DomTreeSerializer";
import { Renderer } from "@src/types/renderer";
import AleliComponent from "@src/components" 



describe("Testing render function of Class Components without state, it render VNodes", () => {
  class TestComponent extends AleliComponent {
    constructor(){
      super()
    }
    render(props: VNode["props"]): VNode<{}> {
      let vnode: VNode = {
        type: 'div',
        props: {
          id:props.id,
          children: props.children || []
        }
      }
      return vnode
    }
  }
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
  });

  it('render method should render class components with props ', () => {
    let root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: Component,
      props: {
        id:'Alelí',
        children: []
      }
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child.localName).toEqual("div");
    expect(child).toHaveProperty("id",'Alelí')
  });

  it('render method should render class components with passed children ', () => {
    let root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: Component,
      props: {
        children: [{
          type: "$TEXT",
          props: {
            textValue: "Alelí",
            children: []
          }
        }]
      }
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child.localName).toEqual("div");
    expect(child.firstChild!.textContent).toEqual("Alelí");
  });

  it('render method should render class components with passed children ', () => {
    let root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: Component,
      props: {
        children: [{
          type: "$TEXT",
          props: {
            textValue: "Alelí",
            children: []
          }
        }]
      }
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child.localName).toEqual("div");
    expect(child.firstChild!.textContent).toEqual("Alelí");
  });

})


describe('Testing render function of Class Components with state, it render VNodes', () => {
  class TestComponent extends AleliComponent {
    constructor(){
      super()
      this.setState({id:1})
    }
    render(props: VNode["props"]): VNode<{}> {
      let vnode: VNode = {
        type: 'div',
        props: {
          id: this.getValueFromState('id'),
          children: props.children || []
        }
      }
      return vnode
    }
  }
  let serializer: DomTreeSerializer;
  let aleliRenderer: Renderer;
  let Component: AleliComponent

  beforeAll(() => {
    serializer = new DomTreeStringify();
    aleliRenderer = new AleliRenderer();
    Component = new TestComponent()
  });

  it('render method should render class component when a value of state is used ', () => {
    let root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: Component,
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child).toHaveProperty('id','1')
  });

  it('render method should render class component with state used across rerenders ', () => {
    let root: HTMLElement = document.createElement("div");
    let vnode: VNode = {
      type: Component,
      props: {
        children: []
      }
    }
    aleliRenderer.render(vnode, root);
    let child: HTMLElement  = root.firstChild! as HTMLElement
    expect(child).toHaveProperty('id','1')
    Component.setState({test:'Hello World!', id:2})
    aleliRenderer.render(vnode, root);
    expect(child).toHaveProperty('id','1')
    expect(Component.getState()).toHaveProperty('id',2)
    expect(Component.getState()).toHaveProperty('test','Hello World!')
  });
})
