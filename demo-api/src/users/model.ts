import { Post } from '../posts/model';

export interface User {
  id: number;
  email: string;
  name?: string;
  posts?: Post[];
}