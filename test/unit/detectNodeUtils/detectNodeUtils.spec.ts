import { VNode } from "@src/types/vNode";
import DetectNodeUtils from "@src/utils/detectNodeUtils";

describe('DetectNode utils isVNode and isNotTextNode', () => {
  let detectNodeUtils: DetectNodeUtils
  beforeAll(() => {
    detectNodeUtils = new DetectNodeUtils()
  })

  it('isVNode should return false if child is boolean', () => {
    expect(detectNodeUtils.isVNode(true)).toBe(false)
    expect(detectNodeUtils.isVNode(false)).toBe(false)
  });

  it('isVNode should return false if child is number', () => {
    expect(detectNodeUtils.isVNode(1)).toBe(false)
    expect(detectNodeUtils.isVNode(-1)).toBe(false)
  });

  it('isVNode should return false if child is string', () => {
    expect(detectNodeUtils.isVNode("Alelí")).toBe(false)
  });

  it('isVNode should return false if child is null', () => {
    expect(detectNodeUtils.isVNode(null)).toBe(false)
  });

  it('isVNode should return false if child is undefined', () => {
    expect(detectNodeUtils.isVNode(null)).toBe(false)
  });

  it('isVNode should return true if child is an empty vnode', () => {
    const emptyVNode : VNode = {
      type: "",
      props: {
        children: []
      }
    }
    expect(detectNodeUtils.isVNode(emptyVNode)).toBe(true)
  });

  it('isVNode should return true if child is a not empty vnode', () => {
    const emptyVNode : VNode = {
      type: "div",
      props: {
        children: [
          {
            type: "h1",
            props: {
              children: []
            }
          }
        ]
      }
    }
    expect(detectNodeUtils.isVNode(emptyVNode)).toBe(true)
  });

  

  it('isNotTextNode should return true if arg is an empty vnode', () => {
    const emptyVNode : VNode = {
      type: "",
      props: {
        children: []
      }
    }
    expect(detectNodeUtils.isNotTextNode(emptyVNode)).toBe(true)
  });

  it('isNotTextNode should return true if arg is a not empty vnode', () => {
    const emptyVNode : VNode = {
      type: "div",
      props: {
        children: [
          {
            type: "h1",
            props: {
              children: []
            }
          }
        ]
      }
    }
    expect(detectNodeUtils.isNotTextNode(emptyVNode)).toBe(true)
  });

  it('isNotTextNode should return false if arg is a text vnode', () => {
    const emptyVNode : VNode = {
      type: "$TEXT",
      props: {
        textValue: 'Test',
        children: [
        ]
      }
    }
    expect(detectNodeUtils.isNotTextNode(emptyVNode)).toBe(false)
  });
});