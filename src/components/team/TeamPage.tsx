import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Users } from 'lucide-react';
import TeamTable from './TeamTable';
import InviteUserForm from './InviteUserForm';
import EditUserModal from './EditUserModal';
import Modal from '../common/Modal';
import type { User } from '../../types';

export default function TeamPage() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Users className="h-4 w-4 mr-2" />
            Invite Team Member
          </button>
        )}
      </div>

      <TeamTable onEdit={setEditingUser} />

      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite Team Member"
      >
        <InviteUserForm onSuccess={() => setShowInviteModal(false)} />
      </Modal>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}