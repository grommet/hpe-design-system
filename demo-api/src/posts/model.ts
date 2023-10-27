import { User } from '../users/model';

export interface Post {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  author: User;
  authorId: number;
}