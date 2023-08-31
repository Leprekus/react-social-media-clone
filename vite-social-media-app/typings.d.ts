export interface IPost {
    like_count: number;
    comment_count: number;
    likes: string[];
    comments: string[];
    image: string[];
    id: string;
    description: string;
    created_at: number;

    author: string;
    author_image: string;
}

export interface IComment {
    id: string;
    author: string;
    body: string;
    created_at: number;
    likes: string[];
    like_count: number;
    replies: IComment[]
}

interface ICommentData {
    postId: string;
    comment: IComment
  }

export interface User {
    email: string;
    name: string;
    id: string;
    username: string;
    bio: string;
    profileImage: string
    followers_count?: number;
    following_count?: number;
    followers?: string[]; //id NOT username
    following?: string[] //id NOT username

   
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
    user: {
        email: string;
        name: string;
        id: string;
        username: string;
        bio: string;
        profileImage: string;
        followers_count?: number;
        following_count?: number;
    }
  }
  
export interface ClientMessage {
    user: User;
    userId
    body: string;
    created_at: number;
    status: 'read' | 'delivered' | 'failed';
    type: 'Text' | 'Post'
    id: string;
}




export interface Conversation {
    id: string; // Unique identifier for the chat or conversation
    users: [ User, User ];
    userIds: string[]; 
    created_at: number; 
    messages: Message[];
    status: {
        [userOne: string] : { status: 'read' | 'delivered' | 'failed'; }
        [userTwo: string] : { status: 'read' | 'delivered' | 'failed'; }
    }
}

export interface Chat extends Omit<Conversation, 'messages'> {
    lastMessage: Message;
}
