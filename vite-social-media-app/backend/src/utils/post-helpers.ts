import { IPost } from '../../../typings';

export const sort = (posts: IPost[]) => 
    posts?.sort((a, b) => (b?.created_at || 0) - (a?.created_at || 0))
