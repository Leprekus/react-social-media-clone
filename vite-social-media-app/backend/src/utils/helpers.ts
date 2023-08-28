import { IPost, User } from '../../../typings';
import { UserTable } from '../Tables';

export const sort = (posts: IPost[]) => 
    posts?.sort((a, b) => (b?.created_at || 0) - (a?.created_at || 0))

export const getUser = async (id: string):Promise<User> => {
    const user = await UserTable.getOne().where('id').equals(id).run()
    delete user?.password
    return user as User
}