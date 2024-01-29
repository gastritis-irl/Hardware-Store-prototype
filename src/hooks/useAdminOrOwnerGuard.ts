import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const useAdminOrOwnerGuard = (ownerId: number) => {
  const { authState } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (ownerId === 0) return;
    if (authState.role !== 'ADMIN' && authState.id !== ownerId) {
      navigate('/adminorowner');
    }
  }, [authState, ownerId]);
};
