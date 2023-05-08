import React, {useState, useContext} from 'react';
import {Alert, Text} from 'react-native';

import {AuthContent} from '../components/auth/AuthContent';
import {AuthContext} from '../context/auth-context';

import {loginUser} from '../services/auth';

export const LoginScreen = () => {
  const {authenticate} = useContext(AuthContext);
  const [isLoadingUser, setLoadingUser] = useState(false);

  async function loginHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoadingUser(true);
    try {
      const token = await loginUser(email, password);
      authenticate(token);
      setLoadingUser(false);
    } catch (error) {
      Alert.alert(
        'Authentication faild!',
        'Could not log you in. Please check your credentials! or try again later!',
      );
      setLoadingUser(false);
    }
  }

  if (isLoadingUser) {
    return <Text>"Logging you in..."</Text>;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};
