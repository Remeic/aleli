interface DomTreeSerializer {
  serializeNode(node: Element): string;
  serializeNodeElement(node: Element): string;
  serializeNodeComment(text: string): string 
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
   * Serialize Element discriminating if can or not contains children
   * @param node - Element
   * @return string - string that rapresent Element
   */
  serializeNodeElement(node: Element): string {
    if (this.SPECIAL_ELEMENTS_NO_CHILDREN.includes(node.localName)) {
      return this.serializeNodeElementWithoutChildren(node);
    } else {
      return this.serializeNodeElementWithChildren(node);
    }
  }

  /**
   * Serialize node element discriminating the type
   * Instead else if, if is used to ensure 100% code coverage
   * @param node - node to serialize <Element>
   * @return string rapresenting the node
   */
  serializeNode(node: Element): string {
    let resultString: string = "";
    let child: Element = node;
    while (child) {
      if (
        child.nodeType === Node.ELEMENT_NODE 
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
      child = node.nextSibling as Element;
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
   * Serialize Element that can't contains children
   * @param node - Element to stringify (MUST without children)
   * @return string - string that rapresent Element
   */
  private serializeNodeElementWithoutChildren(node: Element): string {
    let resultString: string = `<${node.localName} ${this.stringifyAttribute(
      node
    )}/>`;
    return resultString;
  }

  /**
   * Serialize Element that can contains children
   * @param node - Element to stringify (with children if specified)
   * @return string - string that rapresent Element
   */
  private serializeNodeElementWithChildren(node: Element): string {
    let resultString = `<${node.localName}${this.stringifyAttribute(node)}>`;
    let child: Element = node.firstChild as Element;
    while (child) {
      resultString += this.serializeNode(child as Element);
      child = node.nextSibling as Element;
    }
    resultString += `</${node.localName}>`;
    return resultString;
  }

  /**
   * Stringify attribute of HTML element
   * ! operator ensure attribute value exists and can't be null, because for get only available attribute
   * @param node - Element with attributes
   * @return string - string that rapresent attributes
   */
  private stringifyAttribute(node: Element): string {
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
