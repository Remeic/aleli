import {DomTreeSerializer,DomTreeStringify} from '@src/utils/domTreeSerializer'

describe('Stringify DOM tree', () => {
  let domTreeStringify: DomTreeSerializer = new DomTreeStringify();

  it('serialize plain div', () => {
    const element: HTMLElement = document.createElement('div');
    expect(domTreeStringify.serializeNode(element)).toEqual('<div></div>');
  });

  it('serialize plain div with class attribute and id', () => {
    const element: HTMLElement = document.createElement('div');
    element.className = 'test Alelí'
    element.id="id"
    expect(domTreeStringify.serializeNode(element)).toEqual('<div class="test Alelí" id="id"></div>');
  });
  
  it('serialize text node', () => {
    const element: HTMLElement = document.createElement('div');
    const textElement: Text = new Text('Alelí');
    element.appendChild(textElement);
    expect(domTreeStringify.serializeNode(element)).toEqual(
      '<div>Alelí</div>'
    );
  });

  it('serialize undefined text node', () => {
    const element: HTMLElement = document.createElement('div');
    const textElement: Text = new Text(undefined);
    element.appendChild(textElement);
    expect(domTreeStringify.serializeNode(element)).toEqual(
      '<div></div>'
    );
  });

  it('serialize misc div and comment node', () => {
    const element: HTMLElement = document.createElement('div');
    const comment: Comment = document.createComment("Alelí")
    element.appendChild(comment);
    expect(domTreeStringify.serializeNode(element)).toEqual(
      '<div><!--Alelí--></div>'
    );
  });


  it('serialize div encoding special char on text node', () => {
    const element: HTMLElement = document.createElement('div');
    const text: Text = document.createTextNode("Alelí&Giulio")
    element.appendChild(text);
    expect(domTreeStringify.serializeNode(element)).toEqual(
      '<div>Alelí&amp;Giulio</div>'
    );
  });

  it('serialize div encoding special char on comment node', () => {
    const element: HTMLElement = document.createElement('div');
    const comment: Comment = document.createComment("Alelí&Giulio")
    element.appendChild(comment);
    expect(domTreeStringify.serializeNode(element)).toEqual(
      '<div><!--Alelí&amp;Giulio--></div>'
    );
  });

  it('serialize div encoding special char on attribute value', () => {
    const element: HTMLElement = document.createElement('div');
    element.setAttribute('name','&Alelí')
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<div name="&amp;Alelí"></div>`
    );
  });
  

  it('serialize special element that haven\'t children like img', () => {
    const element: HTMLElement = document.createElement('img');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<img />`
    );
  });

  it('serialize special element that haven\'t children like area', () => {
    const element: HTMLElement = document.createElement('area');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<area />`
    );
  });

  it('serialize special element that haven\'t children like base', () => {
    const element: HTMLElement = document.createElement('base');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<base />`
    );
  });

  it('serialize special element that haven\'t children like br', () => {
    const element: HTMLElement = document.createElement('br');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<br />`
    );
  });

  it('serialize special element that haven\'t children like col', () => {
    const element: HTMLElement = document.createElement('col');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<col />`
    );
  });

  it('serialize special element that haven\'t children like embed', () => {
    const element: HTMLElement = document.createElement('embed');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<embed />`
    );
  });

  it('serialize special element that haven\'t children like hr', () => {
    const element: HTMLElement = document.createElement('hr');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<hr />`
    );
  });

  it('serialize special element that haven\'t children like input', () => {
    const element: HTMLElement = document.createElement('input');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<input />`
    );
  });

  it('serialize special element that haven\'t children like link', () => {
    const element: HTMLElement = document.createElement('link');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<link />`
    );
  });

  it('serialize special element that haven\'t children like meta', () => {
    const element: HTMLElement = document.createElement('meta');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<meta />`
    );
  });

  it('serialize special element that haven\'t children like param', () => {
    const element: HTMLElement = document.createElement('param');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<param />`
    );
  });

  it('serialize special element that haven\'t children like source', () => {
    const element: HTMLElement = document.createElement('source');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<source />`
    );
  });

  it('serialize special element that haven\'t children like track', () => {
    const element: HTMLElement = document.createElement('track');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<track />`
    );
  });

  it('serialize special element that haven\'t children like wbr', () => {
    const element: HTMLElement = document.createElement('wbr');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<wbr />`
    );
  });

  it('serialize div with misc children', () => {
    const parent: HTMLElement = document.createElement('div');
    const firstChild: HTMLElement = document.createElement('span');
    const secondChild: Text = document.createTextNode("Alelí");
    parent.appendChild(firstChild)
    parent.appendChild(secondChild)
    expect(domTreeStringify.serializeNode(parent)).toEqual(
      `<div><span></span>Alelí</div>`
    );
  });

});
