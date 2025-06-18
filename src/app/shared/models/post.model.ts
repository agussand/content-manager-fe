import { Author } from './user.model';

export interface Media {
  url: string;
  type: 'img' | 'video/mp4' | string;
  alt: string | null;
  duration?: number;
}

export interface PostStats {
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: Author;
  tags: string[];
  category: string;
  media: Media;
  stats: PostStats;
  publishedAt: string;
}
