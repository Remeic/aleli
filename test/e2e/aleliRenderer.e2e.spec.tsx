import { AleliRenderer, AleliComponent, createElement } from "@src/index";
import { VNode } from "@src/types/vNode";
import { fireEvent } from "@testing-library/dom";
/** @jsx createElement */

class HelloWorldComponent extends AleliComponent {
  handleClick(person: any) {
    if (person) {
      person.name = "Alessandra";
    }
  }
  constructor() {
    super();
    this.setState({ id: 1 });
    this.handleClick = this.handleClick.bind(this);
  }
  destroying() {}
  mounting() {}
  render(props: VNode["props"]): VNode {
    const children: Array<any> = props.children as Array<any>;
    const { person } = props;
    const firstChild: any = children[0];
    return (
      <div
        onClick={this.handleClick(person)}
        id={this.getValueFromState("id")}
        name={props.name ? props.name : "Alelí"}
      >
        {firstChild ? firstChild : "Hello World Aleli with Class Component!"}
      </div>
    );
  }
}

class ListComponent extends AleliComponent {
  constructor() {
    super();
  }
  destroying() {}
  mounting() {}
  render(props: VNode["props"]): VNode {
    const items: Array<any> = props.items as Array<any>;
    return (
      <div>
        {items.map((el) => {
          return <li className="item">{el}</li>;
        })}
      </div>
    );
  }
}

describe("Aleli application e2e tests", () => {
  let root: HTMLDivElement;
  let aleliRenderer: AleliRenderer;

  beforeEach(() => {
    aleliRenderer = new AleliRenderer();
    root = document.createElement("div");
  });

  it("Aleli can render hello world!", () => {
    const hello : string = "Hello World Alelí!"
    const helloComponent = (<div>{hello}</div>)
    aleliRenderer.render(helloComponent,root)
    const child : HTMLElement = root.firstChild as HTMLElement
    expect(child.textContent).toEqual(hello)
  })

  it("Aleli can render base element with prop", () => {
    const hello : string = "Hello World Alelí!"
    const helloComponent = (<div id="1" className="Hey">{hello}</div>)
    aleliRenderer.render(helloComponent,root)
    const child : HTMLElement = root.firstChild as HTMLElement
    expect(child.id).toEqual("1")
    expect(child.className).toEqual("Hey")
  })

  it("Aleli can render class component with state", () => {
    const component = (<HelloWorldComponent></HelloWorldComponent>)
    aleliRenderer.render(component,root)
    const child : HTMLElement = root.firstChild as HTMLElement
    expect(child.id).toEqual("1")
    expect(child.textContent).toEqual("Hello World Aleli with Class Component!")
  })

  it("Aleli can render class component have name setted by class component fall back", () => {
    const component = (<HelloWorldComponent></HelloWorldComponent>)
    aleliRenderer.render(component,root)
    const child : HTMLElement = root.firstChild as HTMLElement
    expect(child.id).toEqual("1")
    expect(child.textContent).toEqual("Hello World Aleli with Class Component!")
    expect(child.getAttribute('name')).toEqual("Alelí")
  })

  it("Aleli can render class component with passed props", () => {
    const name : string = "CustomName"
    const component = (<HelloWorldComponent name={name}></HelloWorldComponent>)
    aleliRenderer.render(component,root)
    const child : HTMLElement = root.firstChild as HTMLElement
    expect(child.id).toEqual("1")
    expect(child.textContent).toEqual("Hello World Aleli with Class Component!")
    expect(child.getAttribute('name')).toEqual(name)
  })

  it("Aleli can render class component with click listener", async () => {
    let tmpObj = {
      name:"old"
    }

    const component = (<HelloWorldComponent person={tmpObj}><div id="result">Ciao</div></HelloWorldComponent>)
    aleliRenderer.render(component,root)
    const child : HTMLElement = root.firstChild as HTMLElement
    await fireEvent.click(child.firstChild as HTMLElement)
  })

  it("Aleli can re render application entirely", () => {
    const hello : string = "Hello Alelí!"
    const helloComponent = (<div>{hello}</div>)
    aleliRenderer.render(helloComponent,root)
    const child : HTMLElement = root.firstChild as HTMLElement
    expect(child.textContent).toEqual(hello)
    const component = (<span><HelloWorldComponent></HelloWorldComponent></span>)
    aleliRenderer.render(component,root)
    const childUpdated : HTMLElement = root.firstChild as HTMLElement
    expect(childUpdated.textContent).toEqual("Hello World Aleli with Class Component!")
  })

  it("Aleli can render list class component with array props", () => {
    const items: Array<string> = ['Hello',"World","Alelí"];
    const component = <ListComponent items={items}></ListComponent>;
    aleliRenderer.render(component, root);
    const child: HTMLElement = root.firstChild as HTMLElement;
    expect(child.querySelectorAll(".item").length).toBe(items.length)
  });

});
