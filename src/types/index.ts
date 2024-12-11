export interface User {
  id: number;
  fullName: string;
  email: string;
  companyId: number;
  role: 'admin' | 'member';
  giveablePoints: number;
  redeemablePoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  name: string;
  createdAt: string;
}

export interface Post {
  id: number;
  authorId: number;
  recipientIds: number[];
  content: string;
  points: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  recipientIds: number[];
  content: string;
  points?: number;
  createdAt: string;
}

export interface PointsTransaction {
  id: number;
  senderId: number;
  recipientId: number;
  points: number;
  type: 'recognition' | 'admin_adjustment' | 'initial_allocation' | 'comment_recognition';
  postId?: number;
  commentId?: number;
  adminNotes?: string;
  createdAt: string;
}