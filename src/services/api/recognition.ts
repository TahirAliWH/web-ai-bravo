import { api } from './config';
import type { Post, Comment } from '../../types';

interface CreatePostData {
  points: number;
  recipients: Array<{ userId: number; points: number }>;
  content: string;
}

interface CreateCommentData {
  postId: number;
  content: string;
  points?: number;
  recipients?: Array<{ userId: number; points: number }>;
}

export const recognitionApi = {
  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post<Post>('/api/v1/posts', {
      points: data.points,
      recipients: data.recipients.map(r => ({
        user_id: r.userId,
        points: r.points,
      })),
      content: data.content,
    });
    return response.data;
  },

  async getCompanyPosts(companyId: number, skip = 0, limit = 100): Promise<Post[]> {
    const response = await api.get<Post[]>(`/api/v1/posts/company/${companyId}`, {
      params: { skip, limit },
    });
    return response.data;
  },

  async likePost(postId: number): Promise<Post> {
    const response = await api.post<Post>(`/api/v1/posts/${postId}/like`);
    return response.data;
  },

  async unlikePost(postId: number): Promise<Post> {
    const response = await api.delete<Post>(`/api/v1/posts/${postId}/like`);
    return response.data;
  },

  async createComment(data: CreateCommentData): Promise<Comment> {
    const response = await api.post<Comment>('/api/v1/comments', {
      post_id: data.postId,
      content: data.content,
      points: data.points,
      recipients: data.recipients?.map(r => ({
        user_id: r.userId,
        points: r.points,
      })),
    });
    return response.data;
  },

  async getPostComments(postId: number, skip = 0, limit = 100): Promise<Comment[]> {
    const response = await api.get<Comment[]>(`/api/v1/comments/post/${postId}`, {
      params: { skip, limit },
    });
    return response.data;
  },

  async likeComment(commentId: number): Promise<Comment> {
    const response = await api.post<Comment>(`/api/v1/comments/${commentId}/like`);
    return response.data;
  },

  async unlikeComment(commentId: number): Promise<Comment> {
    const response = await api.delete<Comment>(`/api/v1/comments/${commentId}/like`);
    return response.data;
  },
};