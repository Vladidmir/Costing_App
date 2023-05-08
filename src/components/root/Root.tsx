import React, {useState, useContext, useEffect} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/auth-context';

import {Redirect} from './Redirect';

export const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState<boolean>(true);
  const {authenticate} = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, [authenticate]);

  if (isTryingLogin) {
    return <Text>Loading...</Text>;
  }

  return <Redirect />;
};
