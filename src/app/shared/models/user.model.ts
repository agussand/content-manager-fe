export interface Author { // Interfaz simplificada para embeber en posts/comentarios
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  bio: string;
  avatarUrl: string;
  birthDate: number[];
}

export interface UserStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  profile: Profile;
  interests: string[];
  socialLinks: Record<string, string>; // Para objetos con claves dinámicas (Twitter, etc.)
  stats: UserStats;
  createdAt: string;
}
