import {DomTreeSerializer,DomTreeStringify} from '@utils/DomTreeSerializer'

describe('Stringify DOM tree', () => {
  let domTreeStringify: DomTreeSerializer = new DomTreeStringify();

  it('serialize plain div', () => {
    const element: HTMLElement = document.createElement('div');
    expect(domTreeStringify.serializeNode(element)).to.equal('<div></div>');
  });

  it('serialize plain div with class attribute and id', () => {
    const element: HTMLElement = document.createElement('div');
    element.className = 'test Alelí'
    element.id="id"
    expect(domTreeStringify.serializeNode(element)).to.equal('<div class="test Alelí" id="id"></div>');
  });
  
  it('serialize text node', () => {
    const element: HTMLElement = document.createElement('div');
    const textElement: Text = new Text('Alelí');
    element.appendChild(textElement);
    expect(domTreeStringify.serializeNode(element)).to.equal(
      '<div>Alelí</div>'
    );
  });
  it('serialize misc div and comment node', () => {
    const element: HTMLElement = document.createElement('div');
    const comment: Comment = document.createComment("Alelí")
    element.appendChild(comment);
    expect(domTreeStringify.serializeNode(element)).to.equal(
      '<div><!--Alelí--></div>'
    );
  });
});
