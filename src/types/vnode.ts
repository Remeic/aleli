export interface VNode<T = {}> {
  type: string;
  props: T & { children: Children, [other: string]: any }
	dom?: HTMLElement | Text 
}

type AllowedChildrenType = VNode<any>
	

export type Children = AllowedChildrenType[] 