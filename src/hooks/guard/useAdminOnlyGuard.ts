import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const useAdminOnlyGuard = (mode: boolean): boolean | undefined => {
  const { authState } = useAuthContext();
  const navigate = useNavigate();

  if (mode) {
    return authState.role === 'admin';
  }
  useEffect(() => {
    if (authState.role !== 'admin') {
      navigate('/adminonly');
    }
  }, [authState]);
  return undefined;
};
