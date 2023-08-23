import { IComment } from '../typings';

export type ObjectLiteral = {
    [key: string]: any;
  };
  
  interface Matcher<T> {
    key: keyof T | string;
    comparator: Comparator;
    value: unknown | string | RegExp | [number, number] | unknown[] | number;
  }
  
  
  // export const Comparator = {
  //   Equals: 0,
  //   NotEqual: 1,
  //   In: 2,
  //   Between: 3,
  //   GreaterThan: 4,
  //   LessThan: 5,
  //   GreaterOrEqual: 6,
  //   LessOrEqual: 7,
  //   Matches: 8,
  // };
interface Collector<T> {
  collector: (
  key: keyof T | string, 
  comparator: Comparator, 
  value: unknown
  ) => void
}

export interface Token {
  createdAt: number;
  refreshToken: string;
  accessToken: string;
}

export interface ICommentBucket {
  postId: string;
  comment: IComment
 
}

export interface IUserProfileImage {
  id: string; //userid
  image: string;
}
