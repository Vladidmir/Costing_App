import React from 'react';
import {Text} from 'react-native';

import {useAuth} from '../hooks/useAuth';

import {AuthContent} from '../components/auth/AuthContent';

export const LoginScreen = () => {
  const {isLoadingUser, loginHandler} = useAuth();

  if (isLoadingUser) {
    return <Text>"Logging you in..."</Text>;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};
