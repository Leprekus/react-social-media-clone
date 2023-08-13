"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB_1 = require("./DB");
var db = new DB_1.JSONDB('user');
var user = {
    email: 'my mock user',
    name: 'my mock user',
    username: 'my mock user',
    password: 'my mock user',
    bio: 'my mock user',
    followers: ['my mock user'],
    following: ['my mock user'],
    posts: 325,
    avatar: 'my mock user',
};
db.insert(user);
//methods should be chainable
// await db.getOne()
//   .where("status").equals("completed")
//   .where("user.name").equals("John Doe")
//   .run();
