import {DomTreeSerializer,DomTreeStringify} from "@utils/DomTreeSerializer"

describe("Stringify DOM tree", () => {
  let domTreeStringify: DomTreeSerializer = new DomTreeStringify();

  it("serialize plain div", () => {
    const element: HTMLElement = document.createElement("div");
    expect(domTreeStringify.serializeNode(element)).to.equal("<div></div>");
  });
  
  it("serialize text node", () => {
    const element: HTMLElement = document.createElement("div");
    const textElement: Text = new Text("Alelí");
    element.appendChild(textElement);
    expect(domTreeStringify.serializeNode(element)).to.equal(
      "<div>Alelí</div>"
    );
  });
});
