export interface ComponentType {
  id: string;
  name: string;
  status?: string;
  state?: string;
  description?: string;
  keywords?: string[];
}

export type LevelType = 1 | 2 | 3 | 4 | 5 | 6;

export interface ResourceType {
  id?: string;
  name: string;
  type?: 'Code' | 'Design kit' | 'Documentation' | string;
  url?: string;
}