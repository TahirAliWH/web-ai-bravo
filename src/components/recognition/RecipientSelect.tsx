import React from 'react';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { RootState } from '../../store';

interface RecipientSelectProps {
  value: number[];
  onChange: (ids: number[]) => void;
}

export default function RecipientSelect({ value, onChange }: RecipientSelectProps) {
  const users = useSelector((state: RootState) => state.users.users);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    onChange(selectedOptions);
  };

  const removeRecipient = (recipientId: number) => {
    onChange(value.filter(id => id !== recipientId));
  };

  const otherUsers = users.filter(user => user.id !== currentUser?.id);

  return (
    <div>
      <label htmlFor="recipients" className="block text-sm font-medium text-gray-700">
        Recipients
      </label>
      <select
        id="recipients"
        multiple
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md min-h-[120px]"
        value={value.map(String)}
        onChange={handleChange}
      >
        {otherUsers.map(user => (
          <option key={user.id} value={user.id}>
            {user.fullName}
          </option>
        ))}
      </select>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map(id => {
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
  );
}