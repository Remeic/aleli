export interface VNode<T = {}> {
  type: string;
  props: T & { children: Children, [other: string]: any }
	dom?: HTMLElement | Text 
}

export type AllowedChildrenType =
| VNode<any>
| string
| number
| boolean
| null
| undefined;
	

export type Children = AllowedChildrenType[] | AllowedChildrenType