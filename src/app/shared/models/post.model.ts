import { Author } from './user.model';

export interface Media {
  url: string;
  type: 'img' | 'video/mp4' | string; // Permitimos otros tipos de video
  alt: string | null;
  duration?: number;
}

export interface PostStats {
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
}

export interface Post {
  id: string; // Cambiado de _id a id
  title: string;
  slug: string;
  content: string;
  author: Author; // Usamos la interfaz Author
  tags: string[];
  category: string;
  media: Media;
  stats: PostStats;
  publishedAt: string; // o Date
  // No necesitamos todos los campos, solo los que visualizaremos
}
