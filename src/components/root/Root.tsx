import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../store';

import {Redirect} from './Redirect';
import {setUser} from '../../store/slices/authSlice';

export const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        dispatch(setUser({token: storedToken}));
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, [dispatch]);

  if (isTryingLogin) {
    return <Text>Loading...</Text>;
  }

  return <Redirect />;
};
