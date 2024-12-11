import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PointsHistoryProps {
  userId: number;
}

export default function PointsHistory({ userId }: PointsHistoryProps) {
  const transactions = useSelector((state: RootState) => state.points.transactions);
  const users = useSelector((state: RootState) => state.users.users);

  const userTransactions = transactions.filter(
    t => t.senderId === userId || t.recipientId === userId
  );

  const getUserName = (id: number) => {
    const user = users.find(u => u.id === id);
    return user ? user.fullName : 'Unknown User';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Points History</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {userTransactions.map(transaction => (
          <div key={transaction.id} className="p-6">
            <div className="flex items-center">
              {transaction.recipientId === userId ? (
                <div className="p-2 rounded-lg bg-green-100">
                  <ArrowDownRight className="h-5 w-5 text-green-600" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-blue-100">
                  <ArrowUpRight className="h-5 w-5 text-blue-600" />
                </div>
              )}
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.recipientId === userId
                        ? `Received from ${getUserName(transaction.senderId)}`
                        : `Sent to ${getUserName(transaction.recipientId)}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {transaction.type === 'admin_adjustment'
                        ? transaction.adminNotes
                        : `${transaction.type.replace('_', ' ')}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.recipientId === userId ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {transaction.recipientId === userId ? '+' : '-'}{transaction.points} points
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}