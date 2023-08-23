
import { type Request, type Response } from 'express';
import { z } from 'zod';
//import { v4 as uid } from 'uuid'
import { config } from 'dotenv';
import verifyToken from '../../utils/verifyToken';
import { UserTable } from '../../Tables';
import { User } from '../../../../typings';

config();

async function handleFollow(
    result: {
        data: {
            follows: boolean,
            userId: string;
        }
    },
    userToFollowId: string,
    verifiedUser: User
    ) {
    const userToFollow = await UserTable.getOne().where('id').equals(userToFollowId).run();
    if (!result.data.follows) {
      //target loses follower
  
      const followersCount = (userToFollow?.followers_count || 1) - 1;
  
      await UserTable.updateOne({
        followers_count: followersCount,
      })
        .where('id')
        .equals(userToFollowId)
        .run();
  
      //takes data in to be filtered
      await UserTable.filterOne({
        followers: [verifiedUser.id],
      })
        .where('id')
        .equals(userToFollowId)
        .run();
       
    } else {
      //target gets follower
      const match = userToFollow?.followers?.find((user) => user === result.data.userId);
      if (!match) {
        const updatedFollowers = userToFollow?.followers;
        userToFollow?.followers?.push(result.data.userId)

        const followersCount = (userToFollow?.followers_count || 0) + 1;
  
        await UserTable.updateOne({
          followers: updatedFollowers,
          followers_count: followersCount,
        })
          .where('id')
          .equals(userToFollowId)
          .run();
      }
    }
  
}

async function handleFollowing(
    result: {
        data: {
            follows: boolean,
            userId: string;
        }
    },
    userToFollowId: string,
    verifiedUser: User
    ) {
    const userFollowing = await UserTable.getOne().where('id').equals(verifiedUser.id).run();
    if (!result.data.follows) {
      //target gets removed from following
  
      const followingCount = (userFollowing?.following_count || 1) - 1;
  
      await UserTable.updateOne({
        following_count: followingCount,
      })
        .where('id')
        .equals(verifiedUser.id)
        .run();
  
      //takes data in to be filtered
      await UserTable.filterOne({
        following: [userToFollowId],
      })
        .where('id')
        .equals(verifiedUser.id)
        .run();

    } else {
      //target gets added to following
      const match = userFollowing?.following?.find((user) => user === userToFollowId);
      if (!match) {
        const updatedFollowing = userFollowing?.following;
        userFollowing?.following?.push(userToFollowId)

        const followingCount = (userFollowing?.following_count || 0) + 1;
  
        await UserTable.updateOne({
          following: updatedFollowing,
          following_count: followingCount,
        })
          .where('id')
          .equals(verifiedUser.id)
          .run();
      }
    }
  
}

export default async function handler(req: Request, res: Response) {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const verifiedUser = await verifyToken(accessToken);

  if (!verifiedUser)
    return res.status(401).json({ message: 'failed to verify user' });

  const userToFollowId = req.query.id;

  const { follows, userId } = req.body;

  const FollowsSchema = z.object({
    follows: z.boolean(),
    userId: z.string(),
  });

  const result = FollowsSchema.safeParse({ follows, userId });
  if (!result.success)
    return res.status(422).json({ error: 'validation failed' });

    await handleFollow(result, userToFollowId as string, verifiedUser)
    await handleFollowing(result, userToFollowId as string, verifiedUser)
    

  

  return res.status(200).json({ message: 'like processed successfully' });
}
