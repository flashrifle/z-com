'use client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';

export default function FollowingPosts() {
  const { data } = useSuspenseQuery<IPost[]>({
    queryKey: ['posts', 'following'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
