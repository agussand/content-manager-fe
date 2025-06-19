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
