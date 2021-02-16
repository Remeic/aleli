export interface VNode {
  type: string;
  props: Object;
}

type AllowedChildrenType =
	| VNode
	| string
	| number
	| boolean
	| null
	| undefined;

export type Children = AllowedChildrenType[] | AllowedChildrenType


