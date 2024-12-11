import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Award } from 'lucide-react';
import { addComment } from '../../store/slices/postSlice';
import { RootState } from '../../store';
import RecipientSelect from './RecipientSelect';
import type { Comment } from '../../types';

interface CommentFormProps {
  postId: number;
  onClose?: () => void;
}

export default function CommentForm({ postId, onClose }: CommentFormProps) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [showRecognition, setShowRecognition] = useState(false);
  
  const [formData, setFormData] = useState({
    content: '',
    recipientIds: [] as number[],
    points: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const pointsPerRecipient = formData.points 
      ? Math.floor(parseInt(formData.points) / formData.recipientIds.length)
      : undefined;

    const newComment: Comment = {
      id: Date.now(),
      postId,
      authorId: currentUser.id,
      recipientIds: formData.recipientIds,
      content: formData.content,
      points: pointsPerRecipient,
      createdAt: new Date().toISOString(),
    };

    dispatch(addComment(newComment));
    setFormData({ content: '', recipientIds: [], points: '' });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="flex items-center space-x-2">
        <MessageSquare className="h-5 w-5 text-gray-400" />
        <textarea
          placeholder="Write a comment..."
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="flex-1 min-h-[80px] p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setShowRecognition(!showRecognition)}
          className="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 hover:text-indigo-600 focus:outline-none"
        >
          <Award className="h-4 w-4 mr-1" />
          {showRecognition ? 'Remove Recognition' : 'Add Recognition'}
        </button>
      </div>

      {showRecognition && (
        <div className="space-y-4 pl-7">
          <RecipientSelect
            value={formData.recipientIds}
            onChange={(ids) => setFormData(prev => ({ ...prev, recipientIds: ids }))}
          />

          <div>
            <label htmlFor="points" className="block text-sm font-medium text-gray-700">
              Total Points
            </label>
            <input
              type="number"
              id="points"
              min="1"
              max="50"
              value={formData.points}
              onChange={(e) => setFormData(prev => ({ ...prev, points: e.target.value }))}
              className="mt-1 block w-full sm:w-32 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required={formData.recipientIds.length > 0}
            />
            {formData.recipientIds.length > 0 && formData.points && (
              <p className="mt-1 text-sm text-gray-500">
                Each recipient will receive {Math.floor(parseInt(formData.points) / formData.recipientIds.length)} points
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}