import { IPost, NewAccount } from '../../typings';
import { ICommentBucket, ServerSession } from '../typings';
import { JSONDB } from './DB';

export const UserTable = new JSONDB<NewAccount>('users')
export const SessionTable = new JSONDB<ServerSession>('tokens')
//export const UserPosts = (username:string) => new JSONDB<IPostsBucket>(`${username}-posts`)
export const PostsBucket = new JSONDB<IPost>('posts-bucket')
export const CommentBucket = new JSONDB<ICommentBucket>('comments-bucket')