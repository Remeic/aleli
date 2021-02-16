import { create } from 'cypress/types/lodash';
import {createElement, VNode} from '@src/createElement';

describe('Testing createElement function, it return a vnode', () => {
    it("createElement return object with type and other property empty", () => {
        const expectedVNode: VNode = {type: 'div', props: {}}
        expect(createElement("div",{},[])).to.deep.equal(expectedVNode)
    })
})