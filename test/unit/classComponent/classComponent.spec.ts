import { Children, VNode } from "@src/types/vNode";
import AleliComponent from "@src/components/aleliComponent" 
import Component from "@src/types/component";
import TestComponent from "../__mocks__/testComponent.mock";
import { instance, mock, reset, when } from "ts-mockito";


describe('Class Component tests', () => {
  let testComponent: Component

  beforeAll(() => {
    testComponent = new TestComponent()
  })
  

  it('AleliComponent should have intitial state empty', () => {
    const state : Object = testComponent.getState();
    expect(Object.keys(state).length).toBe(0)
  });

  it('AleliComponent should have state not empty after setState', () => {
    testComponent.setState({id:1})
    const state : Object = testComponent.getState();
    expect(Object.keys(state).length).toBe(1)
  });

  it('AleliComponent should read value of key using getValueFromKey', () => {
    testComponent.setState({id:1})
    const valueOfKey : any = testComponent.getValueFromState('id');
    expect(valueOfKey).toBe(1)
  });

  it('AleliComponent getValueFromKey method should return undefined if store doesn\'t contain specified key', () => {
    const valueOfKey : any = testComponent.getValueFromState('Hello');
    expect(valueOfKey).toBe(undefined)
  });

  it('AleliComponent getValueFromKey method should return key value if store contain specified key', () => {
    testComponent.setState({'Hello':1})
    const valueOfKey : any = testComponent.getValueFromState('Hello');
    expect(valueOfKey).toBe(1)
  });


})  
