import {DomTreeSerializer,DomTreeStringify} from '@src/utils/DomTreeSerializer'

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

  it('serialize special element that haven\'t children like textarea', () => {
    const element: HTMLElement = document.createElement('img');
    expect(domTreeStringify.serializeNode(element)).toEqual(
      `<img />`
    );
  });
});