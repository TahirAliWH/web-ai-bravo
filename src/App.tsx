import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from './store';
import { SidebarProvider } from './contexts/SidebarContext';
import { useSidebar } from './contexts/SidebarContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import UserProfile from './components/profile/UserProfile';
import RecognitionFeed from './components/recognition/RecognitionFeed';
import TeamPage from './components/team/TeamPage';
import RecognitionsPage from './components/recognition/RecognitionsPage';
import InviteUserForm from './components/team/InviteUserForm';
import PrivateRoute from './components/auth/PrivateRoute';
import { RootState } from './store';
import clsx from 'clsx';

function AppContent() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="flex min-h-[calc(100vh-4rem)]">
          {user && <Sidebar />}
          <main className={clsx(
            'flex-1 transition-all duration-300',
            user && (isExpanded ? 'ml-64' : 'ml-20')
          )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/feed"
                  element={
                    <PrivateRoute>
                      <RecognitionFeed />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/team"
                  element={
                    <PrivateRoute>
                      <TeamPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/team/invite"
                  element={
                    <PrivateRoute>
                      <InviteUserForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/recognitions"
                  element={
                    <PrivateRoute>
                      <RecognitionsPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </Router>
    </Provider>
  );
}