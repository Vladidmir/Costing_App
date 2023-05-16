import {useState} from 'react';
import {Alert} from 'react-native';

import {useAppDispatch, useAppSelector} from '../store';
import {removeUser, setUser} from '../store/slices/authSlice';
import {createUser, loginUser} from '../services/auth';

export function useAuth() {
  const {token} = useAppSelector(state => state.authReducer);
  const [isLoadingUser, setLoadingUser] = useState(false);

  const dispatch = useAppDispatch();

  const authenticate = (newToken: string) => {
    dispatch(setUser({token: newToken}));
  };

  const logout = () => {
    dispatch(removeUser());
  };

  async function loginHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoadingUser(true);
    try {
      const newToken = await loginUser(email, password);
      authenticate(newToken);
      setLoadingUser(false);
    } catch (error) {
      Alert.alert(
        'Authentication faild!',
        'Could not log you in. Please check your credentials! or try again later!',
      );
      setLoadingUser(false);
    }
  }

  async function sigupHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      setLoadingUser(true);
      const newToken = await createUser(email, password);
      authenticate(newToken);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create, user please check your input and try again later.',
      );
      setLoadingUser(false);
    }
  }

  return {
    isAuth: !!token,
    loginHandler,
    sigupHandler,
    logout,
    isLoadingUser,
  };
}
