import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Award, Users, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSidebar } from '../../contexts/SidebarContext';
import clsx from 'clsx';

const navigation = [
  { name: 'Feed', href: '/feed', icon: Home },
  { name: 'Recognitions', href: '/recognitions', icon: Award },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function Sidebar() {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isExpanded } = useSidebar();

  if (!user) return null;

  return (
    <div
      className={clsx(
        'fixed left-0 h-[calc(100vh-4rem)] top-16 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ease-in-out',
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex-1 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative group block p-3 rounded-xl transition-all duration-300 ease-in-out
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white shadow-lg shadow-indigo-500/20' 
                    : 'hover:bg-white/5 text-gray-300 hover:text-white'
                  }
                `}
              >
                <div className={clsx(
                  'flex items-center',
                  isExpanded ? 'space-x-3' : 'justify-center'
                )}>
                  <div className={`
                    relative p-2 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-white/20' 
                      : 'bg-gray-800/50 group-hover:bg-gray-700/50'
                    }
                  `}>
                    <Icon className={`
                      h-5 w-5 transition-transform duration-300 group-hover:scale-110
                      ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                    `} />
                  </div>
                  {isExpanded && <span className="font-medium">{item.name}</span>}
                </div>
                {isActive && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-white rounded-full transform transition-transform duration-300" />
                )}
                <div className={`
                  absolute inset-0 rounded-xl transition-opacity duration-300
                  ${isActive ? 'opacity-100' : 'opacity-0'}
                  bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur
                `} />
              </Link>
            );
          })}
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className={clsx(
            'bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl backdrop-blur-sm border border-white/5',
            !isExpanded && 'flex justify-center'
          )}>
            <div className={clsx(
              'flex items-center',
              isExpanded ? 'space-x-3' : 'justify-center'
            )}>
              <div className="relative">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                  <span className="text-lg font-medium text-white">
                    {user.fullName.charAt(0)}
                  </span>
                </div>
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur" />
              </div>
              {isExpanded && (
                <div>
                  <p className="text-sm font-medium text-white">{user.fullName}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}