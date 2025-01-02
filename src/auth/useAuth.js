import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

// Custom hook untuk mengambil data autentikasi dari AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

