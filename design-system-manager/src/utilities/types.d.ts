export interface ComponentType {
  id: string;
  name: string;
  status?: string;
  state?: string;
  description?: string;
  keywords?: string[];
}

export type LevelType = 1 | 2 | 3 | 4 | 5 | 6;

type ResourceTypeType = 'Code' | 'Design kit' | 'Documentation' | string;
export interface ResourceType {
  id?: string;
  name: string;
  type?: ResourceTypeType | {
    label: string;
    value: ResourceTypeType;
  };
  url?: string;
}