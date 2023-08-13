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

//methods should be chainable
// await db.getOne()
//   .where("status").equals("completed")
//   .where("user.name").equals("John Doe")
//   .run();