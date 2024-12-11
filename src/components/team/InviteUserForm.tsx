import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Mail, Send } from 'lucide-react';
import { RootState } from '../../store';
import { z } from 'zod';

const inviteSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'member']),
});

interface InviteUserFormProps {
  onSuccess?: () => void;
}

export default function InviteUserForm({ onSuccess }: InviteUserFormProps) {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState({
    email: '',
    role: 'member',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      inviteSchema.parse(formData);
      // TODO: Implement actual invite logic
      setSuccess(`Invitation sent to ${formData.email}`);
      setFormData({ email: '', role: 'member' });
      if (onSuccess) {
        setTimeout(onSuccess, 1500); // Give user time to see success message
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An error occurred while sending the invitation');
      }
    }
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Only administrators can invite new users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Mail className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Send invitations to new team members to join your organization.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-50">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-md bg-green-50">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'member' })}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Invitation
          </button>
        </div>
      </form>
    </div>
  );
}