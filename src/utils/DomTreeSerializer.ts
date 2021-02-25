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

  /**
   * Serialize HTML Text Node
   * @param text - text content of Text Element
   * @return string - content of Text Element
   */
  serializeNodeText(text: string): string {
    return this.encodeSpecialChar(text);
  }

  /**
   * Serialize HTML Comment Element
   * @param text - string of Comment
   * @return string - comment text
   */
  serializeNodeComment(text: string): string {
    return `<!--${this.encodeSpecialChar(text)}-->`;
  }

  /**
   * Serialize HTMLElement discriminating if can or not contains children
   * @param node - HTMLElement
   * @return string - string that rapresent HTMLElement
   */
  serializeNodeElement(node: HTMLElement): string {
    let resultString: string = "";
    if (this.SPECIAL_ELEMENTS_NO_CHILDREN.indexOf(node.localName) > -1) {
      resultString = this.serializeNodeElementWithoutChildren(node);
    } else {
      resultString = this.serializeNodeElementWithChildren(node);
    }
    return resultString;
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

  /**
   * Escape special char
   * @param text - text to escape
   * @return string - escaped text
   */
  private encodeSpecialChar(text: string) {
    return text.replace(/&/g, "&amp;");
  }

  /**
   * Serialize HTMLElement that can't contains children
   * @param node - HTMLElement to stringify (MUST without children)
   * @return string - string that rapresent HTMLElement
   */
  private serializeNodeElementWithoutChildren(node: HTMLElement): string {
    let resultString: string = `<${node.localName} ${this.stringifyAttribute(
      node
    )}/>`;
    return resultString;
  }

  /**
   * Serialize HTMLElement that can contains children
   * @param node - HTMLElement to stringify (with children if specified)
   * @return string - string that rapresent HTMLElement
   */
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

  /**
   * Stringify attribute of HTML element
   * ! operator ensure attribute value exists and can't be null, because for get only available attribute
   * @param node - HTMLElement with attributes
   * @return string - string that rapresent attributes
   */
  private stringifyAttribute(node: HTMLElement): string {
    let attributeString: string = "";
    for (let attribute of Array.from(node.attributes).sort()) {
      attributeString += ` ${attribute.name}="${this.encodeSpecialChar(
        node.getAttribute(attribute.name)!
      )}"`;
    }
    return attributeString;
  }
}

export { DomTreeSerializer, DomTreeStringify };
