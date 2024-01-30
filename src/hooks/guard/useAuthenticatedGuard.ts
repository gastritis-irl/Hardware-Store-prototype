import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const useAuthenticatedGuard = () => {
  const { authState } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.id === -1) {
      navigate('/authenticatedonly');
    }
  }, [authState]);
};
