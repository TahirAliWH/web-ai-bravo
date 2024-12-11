import React from 'react';
import { Award, Gift } from 'lucide-react';

interface PointsCardProps {
  giveablePoints: number;
  redeemablePoints: number;
}

export default function PointsCard({ giveablePoints, redeemablePoints }: PointsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-indigo-100">
            <Award className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Giveable Points</p>
            <p className="text-2xl font-semibold text-gray-900">{giveablePoints}</p>
            <p className="text-sm text-gray-500 mt-1">Available to recognize others</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-purple-100">
            <Gift className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Redeemable Points</p>
            <p className="text-2xl font-semibold text-gray-900">{redeemablePoints}</p>
            <p className="text-sm text-gray-500 mt-1">Earned from recognitions</p>
          </div>
        </div>
      </div>
    </div>
  );
}