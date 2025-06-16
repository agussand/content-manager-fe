import { Author } from './user.model';

export interface CommentStats {
  likesCount: number;
  repliesCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  stats: CommentStats;
  createdAt: string;
  updatedAt: string;
}
