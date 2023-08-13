export interface Post {
    like_count: number;
    comment_count: number;
    likes: string[];
    comments: string[];
    image: string;
    id: string;
    description: string;
}


export type User = {
    id: string;
    username: string;
    email: string;
    bio: string;
    // Add other user properties as needed
  };
  
  
export type Session = {
    createdAt: number;
    expiresAt: number;
    refreshToken: string;
    accessToken: string;
    user: User
  };
  