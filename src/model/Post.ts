import { User } from '@/model/User';
import { PostImage } from '@/model/PostImage';

export interface Post {
  postId: number;
  user: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
}
