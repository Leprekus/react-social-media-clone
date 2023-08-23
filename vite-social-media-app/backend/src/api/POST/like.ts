import { type Request, type Response } from 'express';
import { z } from 'zod';
//import { v4 as uid } from 'uuid'
import { config } from 'dotenv';
import verifyToken from '../../utils/verifyToken';
import { CommentBucket, PostsBucket } from '../../Tables';
import { IComment, User } from '../../../../typings';

config();

async function handlePostLike(
  result: {
    data: {
      like: boolean;
      userId: string;
    };
  },
  id: string,
  verifiedUser: User
) {
  const post = await PostsBucket.getOne().where('id').equals(id).run();
  if (!result.data.like) {
    //remove like

    const likeCount = (post?.like_count || 1) - 1;

    await PostsBucket.updateOne({
      like_count: likeCount,
    })
      .where('id')
      .equals(id)
      .run();

    //takes data in to be filtered
    await PostsBucket.filterOne({
      likes: [verifiedUser.id],
    })
      .where('id')
      .equals(id)
      .run();
  } else {
    //like post
    const match = post?.likes?.find((user) => user === result.data.userId);
    if (!match) {
      const updatedLikes = post?.likes;
      post?.likes?.push(result.data.userId);
      const likeCount = (post?.like_count || 0) + 1;

      await PostsBucket.updateOne({
        likes: updatedLikes,
        like_count: likeCount,
      })
        .where('id')
        .equals(id)
        .run();
    }
  }
}

async function handleCommentLike(
    result: {
      data: {
        like: boolean;
        userId: string;
      };
    },
    id: string,
    commentId: string,
    verifiedUser: User
  ) {

    const comment = 
        await CommentBucket
            .getOne().where('comment.id')
            .equals(commentId).run()
            
    if (!result.data.like) { //remove like

      const likeCount = (comment?.comment?.like_count || 1) - 1;
  
      await CommentBucket.updateOne({
        comment: {
            like_count: likeCount,
        }  as IComment       
      })
        .where('comment.id')
        .equals(commentId)
        .run();
  
      //takes data in to be filtered
      //remove user from likes
      CommentBucket.filterOne({
        comment: {
            likes: [ verifiedUser.username ],
        } as IComment
      })
        .where('comment.id')
        .equals(commentId)
        .run();


    } else { //like post

      const match = comment?.comment?.likes?.find((user) => user === result.data.userId);
      if (!match) {
        const updatedLikes = comment?.comment?.likes as string[];
        comment?.comment?.likes?.push(result.data.userId);

        const likeCount = (comment?.comment?.like_count || 0) + 1;
  
        //add user id to likes
        await CommentBucket.updateOne({
            comment: {
                likes: updatedLikes,
                like_count: likeCount,
            } as IComment
        })
          .where('comment.id')
          .equals(commentId)
          .run();
        
      }
    }
  }

export default async function handler(req: Request, res: Response) {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const verifiedUser = await verifyToken(accessToken);

  if (!verifiedUser)
    return res.status(401).json({ message: 'failed to verify user' });

  const id = req.query.id;
  const commentId = req.query.commentId;
  const { like, userId } = req.body;

  const Like = z.object({
    like: z.boolean(),
    userId: z.string(),
  });

  const result = Like.safeParse({ like, userId });
  if (!result.success)
    return res.status(422).json({ error: 'validation failed' });

  if(id && commentId)
    await handleCommentLike(result, id as string, commentId as string, verifiedUser);
  else 
    await handlePostLike(result, id as string, verifiedUser);

  return res.status(200).json({ message: 'like processed successfully' });
}
