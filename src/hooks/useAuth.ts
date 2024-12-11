import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setToken, setError, setLoading } from '../store/slices/authSlice';
import { authApi } from '../services/api/auth';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await authApi.login(email, password);
      dispatch(setToken(response.access_token));
      
      // Get user data after successful login
      const user = await authApi.getCurrentUser();
      dispatch(setUser(user));
      
      navigate('/feed');
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (fullName: string, email: string, password: string, companyName: string) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const user = await authApi.signup({ fullName, email, password, companyName });
      // After signup, automatically log in
      await login(email, password);
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = () => {
    authApi.logout();
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate('/login');
  };

  return { login, signup, logout };
}