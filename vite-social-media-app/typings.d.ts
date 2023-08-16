export interface IPost {
    like_count: number;
    comment_count: number;
    likes: string[];
    comments: string[];
    image: string[];
    id: string;
    description: string;

    author: string;
    author_image: string;
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
    password?: string,
}
  
  
export interface Token {
    createdAt: number;
    expiresAt?: number;
    refreshToken: string;
    accessToken: string;
}

export interface Session extends Token {
    user: User
  }
  