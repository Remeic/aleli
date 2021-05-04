import { VNode } from "@src/types/vNode";
import AleliDiffer from "@src/differ/aleliDiffer";
import RendererUtilities from "@src/types/rendererUtilities";

describe("RendererUtilities method setProperty", () => {
  let aleliDiffer: AleliDiffer;
  let renderUtilities: RendererUtilities;
  beforeAll(() => {
    renderUtilities = new RendererUtilities();
    aleliDiffer = new AleliDiffer(renderUtilities);
  });

  it("RendererUtilities method setProperty should set id property to HTMLElement", () => {
    const htmlElement = document.createElement("div");
    const props: VNode["props"] = {
      id: 1,
      children: [],
    };
    renderUtilities.setProperty(htmlElement, "id", props);
    expect(htmlElement).toHaveProperty("id", "1");
  });

  it("RendererUtilities method setProperty should throw error if prop key is not in props", () => {
    const htmlElement = document.createElement("div");
    const propName: string = "color";
    const props: VNode["props"] = {
      id: 1,
      children: [],
    };
    expect(() =>
      renderUtilities.setProperty(htmlElement, propName, props)
    ).toThrowError(
      `Error setProperty: prop ${propName} is not present in props`
    );
  });

  it("RendererUtilities method setProperty should set event listener", () => {
    const mocked: Function = () => {};
    const props: VNode["props"] = {
      onClick: mocked,
      children: [],
    };
    const htmlElement = document.createElement("div");
    renderUtilities.setProperty(htmlElement, "onClick", props);
    expect(htmlElement).toHaveProperty("onclick");
    expect(typeof htmlElement.onclick!).toBe("function");
  });

});
