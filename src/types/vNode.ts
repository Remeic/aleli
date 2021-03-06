import Component from "./component";

export interface VNode<T = {}> {
  type: string | { new(): Component };
  props: T & { children: Children, [other: string]: any }
	dom?: HTMLElement | Text 
  component?: Component
  reusable?: Boolean | null;
}

export type AllowedChildrenType =
| VNode<any>
| string
| number
| boolean
| null
| undefined;
	

export type Children = AllowedChildrenType[] | AllowedChildrenType