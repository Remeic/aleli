interface DomTreeSerializer {
  serializeNode(node: HTMLElement): string;
  serializeNodeElement(node: HTMLElement): string;
  serializeNodeText(text: string): string;
}

export default class DomTreeStringify implements DomTreeSerializer {
  private SPECIAL_ELEMENTS_NO_CHILDREN: Array<string> = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ];

  private encodeSpecialChar(text: string) {
    return text.replace(/&/g, "&amp;");
  }

  serializeNodeText(text: string): string {
    return this.encodeSpecialChar(text);
  }

  serializeNodeComment(text: string): string {
    return `<!--${this.encodeSpecialChar(text)}-->`;
  }

  serializeNodeElement(node: HTMLElement): string {
    let resultString: string = "";
    if (this.SPECIAL_ELEMENTS_NO_CHILDREN.indexOf(node.localName) > -1) {
      resultString = this.serializeNodeElementWithoutChildren(node);
    } else {
      resultString = this.serializeNodeElementWithChildren(node);
    }
    return resultString;
  }

  private serializeNodeElementWithoutChildren(node: HTMLElement): string {
    let resultString: string = `<${node.localName} ${this.stringifyAttribute(
      node
    )}/>`;
    return resultString;
  }

  private serializeNodeElementWithChildren(node: HTMLElement): string {
    let resultString = `<${node.localName}${this.stringifyAttribute(node)}>`;
    let child: HTMLElement = node.firstChild as HTMLElement;
    while (child) {
      resultString += this.serializeNode(child as HTMLElement);
      child = node.nextSibling as HTMLElement;
    }
    resultString += `</${node.localName}>`;
    return resultString;
  }

  private stringifyAttribute(node: HTMLElement) {
    let attributeString: string = "";
    for (let attribute of Array.from(node.attributes).sort()) {
      // ! operator ensures that it exists
      attributeString += ` ${attribute.name}="${this.encodeSpecialChar(
        node.getAttribute(attribute.name)!
      )}"`;
    }
    return attributeString;
  }

  /**
   * Serialize node element discriminating the type
   * Instead else if, if is used to ensure 100% code coverage 
   * @param node - node to serialize <HTMLElement>
   * @return string rapresenting the node
   */
  serializeNode(node: HTMLElement): string {
    let resultString: string = "";
    let child: HTMLElement = node;
    while (child) {
      if (
        child.nodeType === Node.ELEMENT_NODE ||
        child.nodeType === Node.DOCUMENT_NODE
      ) {
        resultString += this.serializeNodeElement(child);
      }
      if (child.nodeType === Node.COMMENT_NODE) {
        resultString += this.serializeNodeComment(child.textContent!);
      }
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.textContent)
          resultString += this.serializeNodeText(child.textContent);
      }
      child = node.nextSibling as HTMLElement;
    }
    return resultString;
  }
}

export { DomTreeSerializer, DomTreeStringify };
