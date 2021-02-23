interface DomTreeSerializer {
  serializeNode(node: HTMLElement): string;
  serializeNodeElement(node: HTMLElement): string;
  serializeNodeText(text: string): string;
}

export default class DomTreeStringify implements DomTreeSerializer {

  encodeSpecialChar(text: string){
    return text.replace(/&/g, '&amp;');
  }

  serializeNodeText(text: string): string {
    return this.encodeSpecialChar(text);
  }

  serializeNodeComment(text: string): string {
    return `<!--${this.encodeSpecialChar(text)}-->`;
  }

  serializeNodeElement(node: HTMLElement): string {
    let resultString = '<' + node.localName;
    for (let attribute of Array.from(node.attributes).sort()) {
      resultString += ` ${attribute.name}="${this.encodeSpecialChar(node.getAttribute(
        attribute.name
      ))}"`;
    }
    resultString += '>';
    let child: HTMLElement = node.firstChild as HTMLElement;
    while (child) {
      resultString += this.serializeNode(child as HTMLElement);
      child = node.nextSibling as HTMLElement;
    }
    resultString += `</${node.localName}>`;
    return resultString;
  }

  serializeNode(node: HTMLElement): string {
    let resultString: string = '';
    let child: HTMLElement = node;
    while (child) {
      if (child.nodeType === Node.ELEMENT_NODE || child.nodeType === Node.DOCUMENT_NODE) {
        resultString += this.serializeNodeElement(child);
      }
      else if (child.nodeType === Node.TEXT_NODE) {
        resultString += this.serializeNodeText(child.textContent);
      }
      else if(child.nodeType === Node.COMMENT_NODE){
        resultString += this.serializeNodeComment(child.textContent);
      }
      child = node.nextSibling as HTMLElement;
    }
    return resultString;
  }
}

export { DomTreeSerializer, DomTreeStringify };
