import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { User, Mail, Building2, Calendar } from 'lucide-react';
import PointsCard from './PointsCard';
import PointsHistory from './PointsHistory';

export default function UserProfile() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <div className="relative px-6 pb-6">
          <div className="flex items-center -mt-12">
            <div className="h-24 w-24 rounded-xl bg-white p-2 shadow-lg">
              <div className="h-full w-full rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600">
                  {user.fullName.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-6 pt-12">
              <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
              <p className="text-gray-500 capitalize flex items-center mt-1">
                <User className="h-4 w-4 mr-1" />
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      <PointsCard
        giveablePoints={user.giveablePoints}
        redeemablePoints={user.redeemablePoints}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <Mail className="h-5 w-5 mr-3 text-gray-400" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Building2 className="h-5 w-5 mr-3 text-gray-400" />
            <span>Company ID: {user.companyId}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar className="h-5 w-5 mr-3 text-gray-400" />
            <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <PointsHistory userId={user.id} />
    </div>
  );
}