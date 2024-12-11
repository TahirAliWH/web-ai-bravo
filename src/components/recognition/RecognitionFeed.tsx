import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Award, MessageSquare, ThumbsUp } from 'lucide-react';
import CreateRecognitionForm from './CreateRecognitionForm';
import CommentForm from './CommentForm';

export default function RecognitionFeed() {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const users = useSelector((state: RootState) => state.users.users);
  const comments = useSelector((state: RootState) => state.posts.comments);
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullName : 'Unknown User';
  };

  const getRecipientNames = (recipientIds: number[]) => {
    return recipientIds
      .map(id => getUserName(id))
      .join(', ');
  };

  const getPostComments = (postId: number) => {
    return comments.filter(comment => comment.postId === postId);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <CreateRecognitionForm />
      
      {posts.map(post => (
        <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex items-center flex-1 min-w-0">
                <Award className="h-8 w-8 text-indigo-600 flex-shrink-0" />
                <div className="ml-3 truncate">
                  <p className="text-sm font-medium text-gray-900">
                    {getUserName(post.authorId)}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    recognized {getRecipientNames(post.recipientIds)}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {post.points} points each
                </span>
              </div>
            </div>
            <p className="mt-4 text-gray-600 whitespace-pre-wrap">{post.content}</p>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center text-gray-700 hover:text-indigo-600">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>Like</span>
                </button>
                <button 
                  onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)}
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>Comment</span>
                </button>
              </div>
            </div>

            {activeCommentPost === post.id && (
              <CommentForm 
                postId={post.id} 
                onClose={() => setActiveCommentPost(null)} 
              />
            )}

            {getPostComments(post.id).length > 0 && (
              <div className="mt-4 space-y-4">
                {getPostComments(post.id).map(comment => (
                  <div key={comment.id} className="flex space-x-3 pl-6 border-l-2 border-gray-200">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {getUserName(comment.authorId)}
                      </p>
                      {comment.recipientIds.length > 0 && (
                        <p className="text-sm text-gray-500">
                          recognized {getRecipientNames(comment.recipientIds)}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                      {comment.points && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                          +{comment.points} points each
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}