import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const useAdminOnlyGuard = () => {
  const { authState } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.role !== 'admin') {
      navigate('/adminonly');
    }
  }, [authState]);
};
