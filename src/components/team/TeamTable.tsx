import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { RootState } from '../../store';
import { removeUser } from '../../store/slices/userSlice';
import type { User } from '../../types';

interface TeamTableProps {
  onEdit: (user: User) => void;
}

export default function TeamTable({ onEdit }: TeamTableProps) {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      dispatch(removeUser(userId));
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-lg font-medium text-indigo-600">
                        {user.fullName.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.role === 'admin' ? (
                      <Shield className="h-4 w-4 text-indigo-600 mr-1" />
                    ) : (
                      <UserIcon className="h-4 w-4 text-gray-500 mr-1" />
                    )}
                    <span className={`text-sm ${user.role === 'admin' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {currentUser?.role === 'admin' && currentUser.id !== user.id && (
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}