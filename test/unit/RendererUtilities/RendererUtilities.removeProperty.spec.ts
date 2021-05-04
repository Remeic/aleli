import RendererUtilities from "@src/types/rendererUtilities";

describe("aleliDiffer method removeProperty", () => {
  let rendererUtilities : RendererUtilities;
  beforeAll(() => {
    rendererUtilities = new RendererUtilities()
  });

  it("aleliDiffer method removeProperty should remove attribute from HTMLElement", () => {
    const htmlElement = document.createElement("div");
    htmlElement.setAttribute("id", "test");
    rendererUtilities.removeProperty(htmlElement, "id");
    expect(htmlElement.attributes).not.toHaveProperty("id");
  });

  it("aleliDiffer method removeProperty should not throw error if prop is not inside HTMLElement", () => {
    const htmlElement = document.createElement("div");
    expect(() =>
    rendererUtilities.removeProperty(htmlElement, "id")
    ).not.toThrowError();
  });

  it("aleliDiffer method removeProperty should remove class instead of className", () => {
    const htmlElement = document.createElement("div");
    htmlElement.classList.add("testClass");
    rendererUtilities.removeProperty(htmlElement, "className");
    expect(htmlElement.attributes).not.toHaveProperty("class");
  });

  it("aleliDiffer method removeProperty should remove event listener", () => {
    const htmlElement = document.createElement("div");
    htmlElement.onclick = () => {};
    expect(htmlElement).toHaveProperty("onclick");
    rendererUtilities.removeProperty(htmlElement, "onClick");
    expect(htmlElement).toHaveProperty("onclick");
    expect(typeof htmlElement.onclick!).toBe("object");
  });
});