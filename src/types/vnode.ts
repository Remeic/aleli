export interface VNode<T = {}> {
  type: string;
  props: T & { children?: Children }
}

type AllowedChildrenType =
	| VNode<any>
	| string
	| number
	| boolean
	| null
	| undefined;

export type Children = AllowedChildrenType[] 


