import { JSONDB } from './DB';

interface User {
    email:string;
    name:string;
    username:string;
    password:string;
    bio:string;
    followers: string[];
    following: string[];
    posts: number;
    avatar: string;
}

const db = new JSONDB<User>('user')

const user = {
    email: 'my mock user',
    name: 'my mock user',
    username: 'my mock user',
    password: 'my mock user',
    bio: 'my mock user',
    followers: ['my mock user'],
    following: ['my mock user'],
    posts: 325,
    avatar: 'my mock user',
    
    
}
db.insert(user)

//methods should be chainable
// await db.getOne()
//   .where("status").equals("completed")
//   .where("user.name").equals("John Doe")
//   .run();