import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function useUserInfo() {
  const { userData: user } = useContext(UserContext);

  return {email: user.email, name: user.name};
}