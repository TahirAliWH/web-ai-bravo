import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Award, Users, X } from 'lucide-react';
import { addPost } from '../../store/slices/postSlice';
import { RootState } from '../../store';
import type { Post } from '../../types';

export default function CreateRecognitionForm() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipientIds: [] as number[],
    points: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const pointsPerRecipient = Math.floor(parseInt(formData.points) / formData.recipientIds.length);

    const newPost: Post = {
      id: Date.now(),
      authorId: currentUser.id,
      recipientIds: formData.recipientIds,
      points: pointsPerRecipient,
      content: formData.content,
      createdAt: new Date().toISOString(),
    };

    dispatch(addPost(newPost));
    setFormData({ recipientIds: [], points: '', content: '' });
    setIsOpen(false);
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setFormData(prev => ({ ...prev, recipientIds: selectedOptions }));
  };

  const removeRecipient = (recipientId: number) => {
    setFormData(prev => ({
      ...prev,
      recipientIds: prev.recipientIds.filter(id => id !== recipientId)
    }));
  };

  const otherUsers = users.filter(user => user.id !== currentUser?.id);

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white shadow rounded-lg p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className="flex items-center text-gray-500">
            <Award className="h-5 w-5 mr-2" />
            <span>Give recognition to team members...</span>
          </div>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="recipients" className="block text-sm font-medium text-gray-700">
                Recipients
              </label>
              <select
                id="recipients"
                multiple
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md min-h-[120px]"
                value={formData.recipientIds.map(String)}
                onChange={handleRecipientChange}
                required
              >
                {otherUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
              {formData.recipientIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.recipientIds.map(id => {
                    const user = users.find(u => u.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {user?.fullName}
                        <button
                          type="button"
                          onClick={() => removeRecipient(id)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Hold Ctrl/Cmd to select multiple recipients
              </p>
            </div>

            <div>
              <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                Total Points
              </label>
              <input
                type="number"
                id="points"
                min="1"
                max="100"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.points}
                onChange={(e) => setFormData(prev => ({ ...prev, points: e.target.value }))}
                required
              />
              {formData.recipientIds.length > 0 && formData.points && (
                <p className="mt-1 text-sm text-gray-500">
                  Each recipient will receive {Math.floor(parseInt(formData.points) / formData.recipientIds.length)} points
                </p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="content"
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Give Recognition
            </button>
          </div>
        </form>
      )}
    </div>
  );
}