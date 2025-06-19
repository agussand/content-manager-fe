import { Post } from './post.model';

export interface UserPostCountDTO {
  userId: string;
  displayName: string;
  postCount: number;
}

export interface TopCommentedPostDTO {
  title: string;
  postId: string;
  authorName: string;
  commentsCount: number;
}

export interface DashboardDTO {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  avgCommentsPerPost: number;
  recentPosts: Post[];
}

export interface DashboardData {
  summary: DashboardDTO;
  topPosters: UserPostCountDTO[];
  topCommentedPosts: TopCommentedPostDTO[];
}

export interface ChartData {
  name: string;
  value: number;
}

export interface MonthlyStat {
  period: string;
  postsCount: number;
  uniqueAuthors: number;
  totalViews: number;
}

export interface PostEngagementDTO {
  title: string;
  slug: string;
  likes: number;
  comments: number;
}

export interface BubbleChartData {
  name: string;
  series: {
    name: string; // Título del post
    x: number; // Eje X (Likes)
    y: number; // Eje Y (Comentarios)
    r: number; // Radio de la burbuja (usaremos un valor fijo)
  }[];
}

// Esta es la interfaz para la respuesta completa de la API
export interface AnnualContentReportDTO {
  monthlyStats: MonthlyStat[];
  avgPostsPerMonth: number;
  avgAuthorsPerMonth: number;
}
