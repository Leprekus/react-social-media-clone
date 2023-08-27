import { Conversation, IPost, NewAccount, Session } from '../../typings';
import { ICommentBucket, IUserProfileImage } from '../typings';
import { JSONDB } from './DB';

export const UserTable = new JSONDB<NewAccount>('users')
export const SessionTable = new JSONDB<Session>('tokens')
export const UserProfileImage = new JSONDB<IUserProfileImage>('users-profile-image')

//each post contains ids of all comments
export const PostsBucket = new JSONDB<IPost>('posts-bucket')
//each comment contains its parents ids
//the replies are comment ids
export const CommentBucket = new JSONDB<ICommentBucket>('comments-bucket')
export const MessageBucket = new JSONDB<Conversation>('message-bucket')