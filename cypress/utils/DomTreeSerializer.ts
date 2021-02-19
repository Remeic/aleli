
interface DomTreeSerializer {
  serializeNode(node: HTMLElement): string;
  serializeNodeElement(node: HTMLElement): string;
  serializeNodeText(text: string): string;
}

export default class DomTreeStringify implements DomTreeSerializer {


  serializeNodeText(text: string): string {
    return text
  }

  serializeNodeElement(node: HTMLElement): string {
    let resultString = "<" + node.localName;
    for (let attribute of Array.from(node.attributes).sort()) {
      resultString += ` ${attribute.name}="${node.getAttribute(
        attribute.name
      )}"`;
    }
    resultString += ">";
    let child: HTMLElement = node.firstChild as HTMLElement;
    while (child) {
      resultString += this.serializeNode(child as HTMLElement);
      child = node.nextSibling as HTMLElement;
    }
    resultString += `</${node.localName}>`;
    return resultString;
  }

  serializeNode(node: HTMLElement): string {
    let resultString: string = "";    
    let child: HTMLElement = node;
    while (child) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        resultString += this.serializeNodeElement(child);
      }
      if (child.nodeType === Node.TEXT_NODE) {

        resultString += this.serializeNodeText(child.textContent);
      }
      child = node.nextSibling as HTMLElement;
    }
    return resultString;
  }
}

export {DomTreeSerializer, DomTreeStringify}