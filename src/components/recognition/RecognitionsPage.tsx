import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Award, Search, Filter } from 'lucide-react';

export default function RecognitionsPage() {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const users = useSelector((state: RootState) => state.users.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'given', 'received'

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const filteredPosts = posts.filter(post => {
    const author = users.find(u => u.id === post.authorId);
    const recipient = users.find(u => u.id === post.recipientId);
    const searchMatch = 
      author?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    if (filter === 'given') return post.authorId === currentUser?.id;
    if (filter === 'received') return post.recipientId === currentUser?.id;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recognitions</h2>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Award className="h-4 w-4 mr-2" />
          Give Recognition
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search recognitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Recognitions</option>
              <option value="given">Given by me</option>
              <option value="received">Received by me</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.map(post => {
          const author = users.find(u => u.id === post.authorId);
          const recipient = users.find(u => u.id === post.recipientId);
          return (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-lg font-medium text-indigo-600">
                        {author?.fullName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {author?.fullName} → {recipient?.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {post.points} points
                </span>
              </div>
              <p className="mt-4 text-gray-600">{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}