export interface Post {
    like_count: number;
    comment_count: number;
    likes: string[];
    comments: string[];
    image: string;
    id: string;
    description: string;
}


export interface User {
    email: string;
    name: string;
    id: string;
    username: string;
    bio: string;
    profileImage: string
    // Add other user properties as needed
  }

export interface NewAccount extends User {
    password: string,
}
  
  
export type Session = {
    createdAt: number;
    expiresAt: number;
    refreshToken: string;
    accessToken: string;
    user: User
  };
  