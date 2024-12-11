import { Post, Comment, User, PointsTransaction } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    fullName: 'John Doe',
    email: 'john@example.com',
    companyId: 1,
    role: 'admin',
    giveablePoints: 100,
    redeemablePoints: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    companyId: 1,
    role: 'member',
    giveablePoints: 50,
    redeemablePoints: 75,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    fullName: 'Mike Johnson',
    email: 'mike@example.com',
    companyId: 1,
    role: 'member',
    giveablePoints: 50,
    redeemablePoints: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    authorId: 1,
    recipientIds: [2, 3],
    content: 'Outstanding work on the new feature implementation! Your attention to detail and problem-solving skills are impressive.',
    points: 25,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    authorId: 2,
    recipientIds: [3],
    content: 'Thank you for helping me with the debugging session yesterday. Your expertise saved us hours of work!',
    points: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    authorId: 3,
    recipientIds: [1],
    content: 'Great leadership shown in the team meeting today. You made everyone feel heard and valued.',
    points: 40,
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    postId: 1,
    authorId: 3,
    recipientIds: [],
    content: 'Totally agree! The team always delivers exceptional quality.',
    points: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    postId: 1,
    authorId: 2,
    recipientIds: [],
    content: 'Thank you so much! Really appreciate the recognition.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    postId: 2,
    authorId: 1,
    recipientIds: [],
    content: 'Great teamwork everyone!',
    points: 15,
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_TRANSACTIONS: PointsTransaction[] = [
  {
    id: 1,
    senderId: 1,
    recipientId: 2,
    points: 25,
    type: 'recognition',
    postId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    senderId: 1,
    recipientId: 3,
    points: 25,
    type: 'recognition',
    postId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    senderId: 1,
    recipientId: 2,
    points: 50,
    type: 'admin_adjustment',
    adminNotes: 'Monthly points allocation',
    createdAt: new Date().toISOString(),
  },
];